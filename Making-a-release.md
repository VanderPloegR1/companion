## Preparing the modules repository

First, start off in `https://github.com/bitfocus/companion-bundled-modules`.

If doing a new major/minor release, make sure that all the required module updates are in main, and create a `stable-x.x` branch off of main, named after the new release.

If doing a patch, then there should already be a `stable-x.x` branch, make sure any required module updates are committed to this branch. Any module updates should also be included in main, but take care as the version in main could already have new features.

Make a tag off of the `stable-x.x` branch, matching the release version you are producing.

## Companion core

### Major/minor release

* Run the module sync workflow to update the modules included.
* Starting on the main branch, ensure your local copy is up to date
* create and push a `stable-x.x` branch, we will work from this from now on
* Ensure the changelog is updated for the release
  * There is a script which can check which modules changed `yarn zx tools/list_changed_modules.mjs v3.1.2 v3.2.0`
* Ensure the version in the root `package.json` is correct.
* Commit and push any changes you have made
* Tag and push the new release from your `stable-x.x` branch.
* Merge the result to main, ideally as a fast-forward merge
* Push the updated main
* Create the new github release https://github.com/bitfocus/companion/releases using the previous one as a template, replacing the changes with the contents of the changelog
* Make sure the builds complete successfully, retry the runs if they fail
* Once the builds have completed, run the [CompanionPi](https://github.com/bitfocus/companion-pi/actions/workflows/companionpi.yml) workflow to produce the new image, providing the name of the git tag you just created.
* Ask bitfocus to make a facebook post
* Back on the `beta` branch, update the version number to be for the next minor version (eg 3.1.0 should become 3.2.0) and add the new version as an entry in `launcher/Paths.cjs`
* Run the release, and make sure the top bar doesnt report the build as experimental or out of date


### Patch release

#### Backport module patches
You can run the script `yarn zx tools/backport_module_changes.mjs a stable-3.2` (use the correct branch name at the end).  
Note: This script expects to find a github api token in a dotfile or the environment variable `GITHUB_TOKEN`.

This will scrape github and find every module that is different in main and the branch you specify.  
For each it will, open a comparison view on github. And will prompt you whether to merge it. If you say yes (press y then enter), it will dispatch the update workflow to merge it into the stable branch you specified.  

Once complete, make sure the workflows have all finished without error, you will need to manually update the `bundled-modules` submodule and commit the change
* `cd bundled-modules`
* `git pull`
* `git checkout stable-x.x`
* `git pull`
* `git commit -m "chore: update bundled-modules"`

#### Releasing Companion
* Read through the commit history of the `main` branch, to see if there are any fixes that should be applied to the stable branch.
  * If you are unsure, reach out to the author of the fix!
* Ensure the changelog is updated for the release
  * There is a script which can check which modules changed `yarn zx tools/list_changed_modules.mjs v3.1.2 stable-3.2` (make sure to push the bundled-modules changes to github first!)
* Ensure the version in the root `package.json` is correct.
* Commit and push any changes you have made
* Tag and push the new release from your `stable-x.x` branch.
* Create the new github release https://github.com/bitfocus/companion/releases using the previous one as a template, replacing the changes with the contents of the changelog
* Make sure the builds complete successfully, retry the runs if they fail
* Once the builds have completed, run the [CompanionPi](https://github.com/bitfocus/companion-pi/actions/workflows/companionpi.yml) workflow to produce the new image, providing the name of the git tag you just created.
* (Optional) Ask bitfocus to make a facebook post
* Run the release, and make sure the top bar doesnt report the build as experimental or out of date
