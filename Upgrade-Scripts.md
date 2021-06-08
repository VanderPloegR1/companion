Over time you will add new functionality to your module. Sometimes, this can involve changing how existing actions or feedbacks are implemented.  
A common example is changing a on/off option to be an on/off/toggle option.

When this happens, all existing usages of the action or feedback will become broken. The job of the upgrade script is to fix up the actions and feedbacks to handle the changes.

Each upgrade script will only get run once for each action and feedback, but it is good practise to write the scripts so that they can be executed multiple times. This will help you when testing your script, or if jumping between versions of companion.

### Adding a script

The actual implementation of the script is the same for ES6 and prototype modules. It is recommended to put them in an `upgrades.js` file, and to import them into `index.js` with the following:
```
const upgradeScripts = require('./upgrades')
```

Then they can be registered with:

#### ES6
```js
class instance extends instance_skel {

	static GetUpgradeScripts() {
		return [
			upgradeScripts.example_conversion,
			// more will go here over time
		]
	}

}
```

#### Prototype
```js
instance.GetUpgradeScripts() {
	return [
		upgradeScripts.example_conversion,
		// more will go here over time
	]
}
```

### Writing the script

```js
module.exports = {
	example_conversion: function(context, config, actions, feedbacks) {
		// write your script in here

		return true // if something changed
	},

	// more will be added here later
}

```

The script gets fed the bits of data you may need to do the upgrades.

#### context

This is a collection of methods that may be useful for your script.
* `context.convert15to32(key: number) returns number` - This converts a key number from the old 15 key grid to the 32 key grid

#### config
This is the config object of the instance. If you add new config fields you may want to fill in some default values here.

*Warning*: This can sometimes be null, so make sure you check it is an object first!

#### actions
This is an array of the actions that may need upgrading to the new version. 

Note: This may not be all of the actions that exist. Sometimes it will be called with actions that have been imported from a page from an older version of companion

#### feedbacks
This is an array of the feedbacks that may need upgrading to the new version. 

Note: This may not be all of the actions that exist. Sometimes it will be called with actions that have been imported from a page from an older version of companion

#### return true
If you changed anything, you should `return true` to inform companion that it needs to save the changes.

### The old way

Upgrade scripts used to be added by calling `self.addUpgradeScript(some_script)` in the constructor. This has been removed as it had limitations, and replaced with the flow above.