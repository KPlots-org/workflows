const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

async function run() {
    try {
        const token = core.getInput('github-token');
        const octokit = github.getOctokit(token);

        const commitSHA = github.context.sha;
        const commit = await octokit.rest.repos.getCommit({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            ref: commitSHA,
        });

        const commitMessage = commit.data.commit.message;
        const regex = /Signed-off-by:\s*(.+)/i; // Updated regex to capture the email

        const match = regex.exec(commitMessage);
        if (match) {
            const signedOffEmail = match[1];
            const committerEmail = commit.data.committer.email;
            const committerUsername = commit.data.committer.name;

            if (signedOffEmail === committerEmail) {
                const githubUsername = await getGitHubUsername(committerEmail);
                if (committerUsername === githubUsername) {
                    core.setOutput('signed-off', 'true');
                } else {
                    core.setOutput('signed-off', 'false');
                    core.setFailed('Commit does not match committer\'s GitHub account email.');
                }
            } else {
                core.setOutput('signed-off', 'false');
                core.setFailed('Commit does not match committer\'s GitHub account email.');
            }
        } else {
            core.setOutput('signed-off', 'false');
            core.setFailed('Commit does not contain a Signed-off-by line.');
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

async function getGitHubUsername(email) {
    try {
        const response = await fetch(`https://api.github.com/search/users?q=${email}+in:email`);
        const data = await response.json();

        if (data.total_count > 0) {
            return data.items[0].login;
        }

        return null;
    } catch (error) {
        return null;
    }
}

run();