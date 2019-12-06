---
calendar: java
post_year: 2019
post_day: 16
title: Managing multiple installations of Java on a Mac
ingress: >-
  With the new release cadence of Java and vendor landscape, managing multiple
  versions of Java can become a tedious task. However, tooling exists to make
  your life simpler.
description: >-
  With the new release cadence of Java and vendor landscape, managing multiple
  versions of Java can become a tedious task. However, tooling exists to make
  your life simpler.
---
# Managing multiple installations of Java on a Mac
The last few years we’ve seen an increase in various Java distributions. Now there is OpenJDK in multiple flavors (Oracle, AdoptOpenJDK, Amazon Corretto), Eclipse OpenJ9 and Azul Zing. With this increased interest in the Java ecosystem there is suddenly multiple Java distributions and versions to test your applications against. Running applications in [containers](https://java.christmas/2019/3) is one approach, but for local development one should consider jEnv.
## Installing different Java versions
First off you need to know what kind of Java distribution (vendor, JRE/JDK) you want. I personally like [AdoptOpenJDK](https://adoptopenjdk.net/) due to its community backing of known companies and ease of installation. Let’s install some JDKs!

Assuming [Homebrew](https://brew.sh/) is installed:

```bash
# Will require you to input your account password for privileged installation
brew cask install AdoptOpenJDK/openjdk/adoptopenjdk{8,11,13}
```
## Introducing [jEnv](https://github.com/jenv/jenv)

jEnv is probably the most well-known version manager for Java. It is similar to [nvm](https://github.com/nvm-sh/nvm), [rbenv](https://github.com/rbenv/rbenv) and similar project for other technologies. There is however one downside with jEnv that’s worth a mention: missing [Windows support](https://github.com/jenv/jenv/issues/35) (but have Linux support).
### Installing jEnv

```bash
brew install jenv
```

Then add the following to your shells configuration file. For bash that would typically be `~/.bash_profile`/`~/.bashrc` or `~/.zshrc` for zsh.

```bash
export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"
```

Restart your terminal application or resource your configuration. You should now be able to run `jenv doctor` to verify your installation and see the message `Jenv is correctly loaded` (ignore other warnings).

An optional but recommended step is to enable a couple of plugins:

```bash
# ensure that JAVA_HOME is correct
jenv enable-plugin export
# make Maven aware of the Java version in use (and switch when your project does)
jenv enable-plugin maven
```
### Adding Java installations
Now that jEnv is correctly installed, it’s time to make it aware of the JDK’s which we installed earlier.

```bash
for version in 8 11 13
do
   jenv add /Library/Java/JavaVirtualMachines/adoptopenjdk-$version.jdk/Contents/Home
done

# You should now see output like this (exact versions can vary)
#
# openjdk64-1.8.0.232 added
# 1.8.0.232 added
# 1.8 added
# openjdk64-11.0.5 added
# 11.0.5 added
# 11.0 added
# openjdk64-13.0.1 added
# 13.0.1 added
# 13.0 added
```

jEnv is now ready for use in daily development workflows. To assign a default system-wide version use `jenv global 11.0`. If a specific project needs a different version of Java just use `jenv local 13.0` when standing in the directory of that project. jEnv will then create a `.java-version` file that describes which JDK to use. This file can safely be checked in so that your whole team runs the same version of Java (if using jEnv of course).

## Conclusion
Using Homebrew on a Mac, it is easy to install multiple versions of Java and manage it with jEnv. This enables experimentation with different flavors of Java and can lead to teams avoiding Java version conflicts. 
