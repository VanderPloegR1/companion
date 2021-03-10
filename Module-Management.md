# For core maintainers

This section is only for Companion core maintainers. If you want your module added to Companion for general release you need to request a new repository for your module from one of the maintainers. Usually this is done on [our slack](https://join.slack.com/t/bitfocusio/shared_invite/enQtODk4NTYzNTkzMjU1LTMzZDY1Njc2MmE3MzVlNmJhMTBkMzFjNTQ2NzZlYzQyZWIzZTJkZWIyNmJlY2U0NzM1NGEzNzNlZWY3OWJlNGE) in the #module-development channel.

## Adding a module

First create a new module repo: `companion-module-[brand]-[product]` (all small letters)

Then when the module is ready, tested, and an initial version tag has been added, edit `package.json` to the following line under dependencies, preferably maintaining alphabetical order:

` "companion-module-[brand]-[product]": "github:bitfocus/companion-module-[brand]-[product]#vX.Y.Z",`

vX.Y.Z needs to be replaced with the initial release version: typically v1.0.0. See below for instructions to commit the changes.

## Updating a module

Once the changes have been tested, checked, and a new version tag applied in the module repo; edit `package.json`, finding the dependency for the module and updating the version at the end to the latest tag:

` "companion-module-[brand]-[product]": "github:bitfocus/companion-module-[brand]-[product]#vX.Y.Z",`

Once saved, see below for instructions to commit the changes.

## Removing a module

If there is a need to remove a module, edit `package.json`, finding the dependency line for the module:

` "companion-module-[brand]-[product]": "github:bitfocus/companion-module-[brand]-[product]#vX.Y.Z",`

Delete this line, save, and see below for instructions to commit the changes.

## Committing the changes

Typically, for commit notation purposes, only one module should be added or updated at a time. Multiple can be done in cases of mass changes that effect multiple modules. The steps are:

1. Update the yarn.lock file
2. Stage the changes
3. Check the differences for changes outside of scope for your update (see instructions below)
4. Commit the changes
5. Push the changes

The commands to execute this are:

1. `yarn`
2. `git add package.json yarn.lock`
3. `git diff --cached` (see instructions below)
4. Choose below as appropriate:
   - `git commit -m "module: Added [brand]-[product]"`
   - `git commit -m "module: Upgraded [brand]-[product] - vX.Y.Z: [changes in the release]"`
   - `git commit -m "module: Removed [brand]-[product] [ - (optional message, if needed)]"`
5. `git push`

### Checking yarn.lock changes

Because of how modules are tagged, a tag could be updated to a different commit than previously approved and this will automatically try to update when running `yarn`. In the difference report you could see a lot of changes depending if the module has new or update dependencies. But what you're looking for is the following:

```
--- a/yarn.lock
+++ b/yarn.lock
@@ -xx,y +xx,y @@

  "companion-module-[other_brand]-[product]@github:bitfocus/companion-module-[other_brand]-[product]#vX.Y.Z":
    version "X.Y.Z"
-   resolved "https://codeload.github.com/bitfocus/companion-module-[other_brand]-[product]/tar.gz/[old_commit hash]"
+   resolved "https://codeload.github.com/bitfocus/companion-module-[other_brand]-[product]/tar.gz/[new_commit_hash]"

```

This shows that a module is trying to switch to a different commit in the build without a change to the version. You need to manually edit the yarn.lock to remove this change and later investigate or let the rest of the core team know to review. After editing you'll need to re-stage just the yarn.lock and should re-run the diff to verify the change applied. By comparison, the module you're updating would show as follows:

```
--- a/yarn.lock
+++ b/yarn.lock
@@ -xx,y +xx,y @@

- "companion-module-[brand]-[product]@github:bitfocus/companion-module-[brand]-[product]#vOLD":
-   version "OLD"
-   resolved "https://codeload.github.com/bitfocus/companion-module-[brand]-[product]/tar.gz/[old_commit hash]"
+ "companion-module-[brand]-[product]@github:bitfocus/companion-module-[brand]-[product]#vNEW":
+   version "NEW"
+   resolved "https://codeload.github.com/bitfocus/companion-module-[brand]-[product]/tar.gz/[new_commit_hash]"

```
