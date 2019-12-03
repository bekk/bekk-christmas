---
calendar: opensource
post_year: 2019
post_day: 4
title: Patching your node_modules
image: >-
  https://images.unsplash.com/photo-1507525586584-6a9c816efbed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80
ingress: >-
  When using open source code you might encounter bugs in this code. Since it's
  open source, you can find the faulty code and the fix it yourself. The right
  thing to do next is of course to submit an issue and/or a pull request on the
  project. But what if the project maintainers don't answer you, the project is
  deprecated or if the fix is planned, but not due for quite a while? In this
  article I’ll teach you the strategy of patching dependencies in node\_modules
  by using _patch files_.
authors:
  - Mats Byrkjeland
---
A patch file represents a change to a file and looks like a git diff. Patch files can be kept in source control, and the application of them can be automated in a postinstall script such as `npm postinstall`. The advantages of this is that you can persist some small changes to your dependencies without all the work of forking the repo, or waiting for the maintainers to release a new version. But use this strategy sparingly, though! If the dependency gets an update, the patch might not work anymore and you might have to update it. Consider it a temporary workaround.

## Creating a patch file
So, you’ve encountered a bug in your app. After some investigation you’ve found that the bug is located in code of the npm package `buggybug`, which your app is strongly dependent on. By editing the relevant file in the `node_modules/buggybug` directory, you fix the evil line of code. Great! But since `node_modules` is included in your `.gitignore` file, how do you let your teammates enjoy your fix as well? You decide to create a patch file.

Create a patches directory in the root of your repo:

```
mkdir patches
```

Copy the fixed file into your patches directory
```
cp node_modules/buggybug/index.js patches/my-fixed-buggybug.js
```

Now we want our node_modules to be "clean" again, so why not run a good old

```
rm -rf node_modules && npm install
```

After that’s done, let’s create the patch file:

```
diff -Naur node_modules/buggybug/index.js patches/my-fixed-buggybug.js > patches/buggybug-index.patch
```

This will create a file called `buggybug-index.patch` that contains the diff of our change. To apply it to the actual buggybug in node_modules, we use 

```
patch --forward node_modules/buggybug/index.js < patches/buggybug-index.patch
```

If you inspect your node_modules after running this, you should see that buggybug/index.js is updated with your fixed version.

Now it's safe to delete your fixed copy. We only needed it to generate the patch file.
```
rm patches/my-fixed-buggybug.js
```

## Applying it on postinstall

In order to automate the application of the patch, we'll add it to the `postinstall` script in package.json:
```
// package.json
{
  "scripts": {
    "postinstall": "patch --forward node_modules/buggybug/index.js < patches/buggybug-index.patch",
    ...
  },
  ...
}
```

Since the postinstall script is run automatically after `npm install`, all your teammates need to do after a git pull is to run npm install, and your fix is applied!
