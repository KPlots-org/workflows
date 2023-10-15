/*
 * This file was generated by the Gradle 'init' task.
 *
 * This is a general purpose Gradle build.
 * To learn more about Gradle by exploring our Samples at https://docs.gradle.org/8.4/samples
 */

plugins {
    kotlin("jvm") version "1.9.10"
}

repositories {
    mavenCentral()
}

version = "1.0.5"

tasks {
    jar {
        manifest {
            attributes["Main-Class"] = "org.example.test.MainKt"
        }

        duplicatesStrategy = DuplicatesStrategy.EXCLUDE
        from(sourceSets.main.get().output)
        dependsOn(configurations.runtimeClasspath)
        from({
            configurations.runtimeClasspath.get().filter { it.name.endsWith("jar") }.map { zipTree(it) }
        })
    }
}


