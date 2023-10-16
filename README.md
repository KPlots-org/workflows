# Workflows 

Development repository for GitHub workflows/actions/hooks used in [KPlots Repositories](https://github.com/orgs/KPlots-org/repositories)

---

##  Workflows
### `gradle-build-and-release-on-master-push`

1. Builds the gradle project in the repository root
2. Extracts the Version number from the build.gradle.kts
3. Creates a tag with the version as name
4. Releases the artifacts built

