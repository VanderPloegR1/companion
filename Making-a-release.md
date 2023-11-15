## Preparing the modules repository

First, start off in `https://github.com/bitfocus/companion-bundled-modules`.

If doing a new major/minor release, make sure that all the required module updates are in main, and create a `stable-x.x` branch off of main, named after the new release.

If doing a patch, then there should already be a `stable-x.x` branch, make sure any required module updates are committed to this branch. Any module updates should also be included in main, but take care as the version in main could already have new features.

Make a tag off of the `stable-x.x` branch, matching the release version you are producing.

## Companion core

### Major/minor release

* Run the module sync workflow to update the modules included.
* Starting on the beta branch, ensure your local copy is up to date
* Merge in the master branch, to ensure there are no conflicts.
* create and push a `stable-x.x` branch, we will work from this from now on
* Ensure the changelog is updated for the release
* Ensure the version in the root `package.json` is correct.
* Commit and push any changes you have made
* Merge the result to master, ideally as a fast-forward merge
* Push the updated master (you will need to disable the branch protection rules to be allowed to push this)
* Tag and push the new release from master.
* Create the new github release https://github.com/bitfocus/companion/releases using the previous one as a template, replacing the changes with the contents of the changelog
* Make sure the builds complete successfully, retry the runs if they fail
* Once the builds have completed, run the [CompanionPi](https://github.com/bitfocus/companion-pi/actions/workflows/companionpi.yml) workflow to produce the new image, providing the name of the git tag you just created.
* Ask bitfocus to make a facebook post
* Back on the `beta` branch, merge in your `stable-x.x` branch
* update the version number to be for the next minor version (eg 3.1.0 should become 3.2.0) and add the new version as an entry in `launcher/Paths.cjs`
* Run the release, and make sure the top bar doesnt report the build as experimental or out of date


### Patch release

You will need to manually update the `bundled-modules` submodule and commit the change
* `cd bundled-modules`
* `git pull`
* `git checkout stable-x.x`
* `git pull`
* `git commit -m "chore: update bundled-modules"`

TODO...