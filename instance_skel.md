# Extending `instance_skel`

All modules include and extend the `/instance_skel.js` class. This provides a base level of functionality and communication with the core application. This is typically done in the module's `index.js` file.

## Constructor

If you're not familiar with class extension, the below examples show how to bring in `instance_skel` and setup an `instance` class to extend this. This is required, as `instance_skel` is effectively an `abstract` class with a lot of internal processing to make your module work seamlessly.

### ES6

```javascript
const instance_skel = require('../../instance_skel');

class instance extends instance_skel {

	constructor(system,id,config) {
		super(system,id,config);
		...
	}
}

exports = module.exports = instance;
```

### Prototype

```javascript
var instance_skel = require('../../instance_skel');

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);
	...
	return self;
}

instance_skel.extendedBy(instance);
exports = module.exports = instance;
```

## Required Functions

Because `instance_skel` is effectively an `abstract` class, there are functions your module MUST implement in order to function correctly.

#### `config_fields() returns object[]`

See [[Module Configuration]]

Provide a simple return of the necessary fields for the instance configuration screen.

#### `destroy() returns void`

Clean up the instance before it is destroyed. This is called both on shutdown and when an instance is disabled or deleted. Destroy any timers and socket connections here.

#### `init() returns void`

Main initialization function called once the module is OK to start doing things. Principally, this is when the module should establish a connection to the device.

#### `updateConfig(config: object) returns void`

When the instance configuration is saved by the user, this update will fire with the new configuration passed. The configuration should be saved to the module, as shown below. This is also a good time to check for any important changes, such as the device IP, which require runtime changes or updates based on the new configuration. An example of resetting a TCP connection is shown in the full sample below.

ES6

```javscript
updateConfig(config) {
	this.config = config;
}
```

Prototype

```javscript
instance.prototype.updateConfig = function(config) {
	self.config = config;
}
```

## Optional Functions

#### `action(action: object) returns void`

See [[Actions]]

This function will be called for each action and release action a user executes when the action doesn't have a callback defined. The action parameter will be this data structure:

```javascript
{
	id:       "FE6A5IuPC",               // Random ID for action
	instance: "ZPc65TB4z",               // Instance ID
	action:   "action_name",             // Action name/key
	options:  {                          // Array of options in 'id: value' pairs
		opt1_text: "Test",
		opt2_num:  1
	}
}
```

Typical processing in `action(action)` involves a `switch` to select between the action types, which builds a command string to send to the device. Once out of the `switch` the command would be packaged and sent to the device. This is shown in the full examples at the bottom of the page.

#### `feedback(feedback: object, bank: object) returns object`

See [[Feedback]]

This function will be called when a feedback needs to be proceessed and the feedback doesn't have a callback defined. The feedback parameter will be this data structure:

```javascript
{
	id:       "FE6A5IuPC",               // Random ID for action
	instance: "ZPc65TB4z",               // Instance ID
	type:     "feedback_type",           // Feedback name/key
	options:  {                          // Array of options in 'id: value' pairs
		opt1_text: "Test",
		opt2_num:  1
	}
}
```

Typical processing in `feedback(feedback, bank)` involves a `switch` to select between the feedback types, which processes the type and returns any changes that need to be applied to the bank.

## Available Calls

#### `addUpgradeScript(cb: function) returns void`

See [[Upgrade Scripts]]

Used to setup an upgrade script for execution. This must be done in the `constructor`. This is used when a structural change between releases requires a modification to the user's data.

#### `checkFeedbacks(type: string?) returns void`

See [[Feedback]]

Used to scan the user's feedbacks to allow them to check if they are active or not. This can be done for all feedbacks or those of a specific type by using the `type` parameter.

#### `defineConst(name: string, value: object) returns void`

A shortcut to define a class constant:

ES6

```javascript
this.defineConst('STATIC_VALUE', 1)
this.STATIC_VALUE == 1 // true
```

Prototype

```javascript
self.defineConst('STATIC_VALUE', 1)
self.STATIC_VALUE == 1 // true
```

#### `getAllActions() returns object[]`

See [[Actions]]

Returns as array of all active user actions and release actions for the instance.

#### `getAllFeedbacks() returns object[]`

See [[Feedback]]

Returns as array of all active user feedbacks for the instance.

#### `getVariable(variable: name, cb: function) returns void`

See [[Variables]]

Get the current value of a dynamic variable.

#### `parseVariables(string: string, cb: function) returns void`

See [[Variables]]

Parses a string with dynamic variables to the live values.

#### `saveConfig() returns void`

Issues a save for the current `config` array without issuing an `updateConfig(config)`. This is useful when needing save background configuration data (i.e. variables the user doesn't control but are important) or when saving data that a user can provide but may also auto-detect from the device.

ES6

```javascript
this.config.someValue = 'test'
this.saveConfig()
```

Prototype

```javascript
self.config.someValue = 'test'
self.saveConfig()
```

#### `setActions(actions: object[]) returns void`

See [[Actions]]

Pushes an array of action definitions to the core.

#### `setFeedbackDefinitions(feedbacks: object[]) returns void`

See [[Feedback]]

Pushes an array of feedback definitions to the core.

#### `setPresetDefinitions(presets: object[]) returns void`

See [[Presets]]

Pushes an array of presets to the core.

#### `setVariable(variable: string, text: string) returns void`

See [[Variables]]

Set a dyanic variable's value.

#### `setVariableDefinitions(variables: object[]) returns void`

See [[Variables]]

Pushes an array of dynamic variable definitions to the core.

#### `status(level: string, message: string) returns void`

Sets the instance's status, which is displayed in the 'Instances' tab. Available status definitions as:

- `STATUS_UNKNOWN`
- `STATUS_OK`
- `STATUS_WARNING`
- `STATUS_ERROR`

When using the internal `tcp` module, the status can be driven automatically by the `tcp` object.

ES6

```javascript
this.socket.on('status_change', (status, message) => {
	this.status(status, message)
})
```

Prototype

```javascript
self.socket.on('status_change', (status, message) => {
	self.status(status, message)
})
```

Otherwise, `STATUS_UNKNOWN` is used to indicate that status cannot be detected. This is often used for `udp` devices with one-way communications. `STATUS_OK` should be used to indicated the device is connected and ready to receive commands. `STATUS_WARNING` and `STATUS_ERROR` should be used to indicate there is a problem with the connection or that performance is degraded. `STATUS_WARNING` could be used to indicate a connection is established but the device is not ready to receive commands. One such condition would be if a login or negotiation procedure is in progress. `STATUS_ERROR` should be used when a connection fails to establish or the device is otherwise in an unrecoverable trouble status.

#### `subscribeAction(action: object) returns void`

See [[Actions]]

Issues the subscribe command, if defined, for the `action` object passed.

#### `subscribeActions(type: string?) returns void`

See [[Actions]]

Will issue any subscribe commands that exist for the user's active actions and release actions in the modules. This can be done for all actions or those of a specific type by using the `type` parameter.

#### `subscribeFeedback(feedback: object) returns void`

See [[Feedback]]

Issues the subscribe command, if defined, for the `feedback` object passed.

#### `subscribeFeedbacks(type: string?) returns void`

See [[Feedback]]

Will issue any subscribe commands that exist for the user's active feedbacks in the modules. This can be done for all feedbacks or those of a specific type by using the `type` parameter.

#### `unsubscribeAction(action: object) returns void`

See [[Actions]]

Issues the unsubscribe command, if defined, for the `action` object passed.

#### `unsubscribeActions(type: string?) returns void`

See [[Actions]]

Will issue any unsubscribe commands that exist for the user's active actions and release actions in the modules. This can be done for all actions or those of a specific type by using the `type` parameter.

#### `unsubscribeFeedback(feedback: object) returns void`

See [[Feedback]]

Issues the unsubscribe command, if defined, for the `feedback` object passed.

#### `unsubscribeFeedbacks(type: string?) returns void`

See [[Feedback]]

Will issue any unsubscribe commands that exist for the user's active feedbacks in the modules. This can be done for all feedbacks or those of a specific type by using the `type` parameter.

## Predefined REGEX

Available as `this.REGEX_*` for ES6 or `self.REGEX_*` for prototype

- `REGEX_BOOLEAN` - true|false|0|1
- `REGEX_FLOAT` - xxx.yyy _(lengths not defined)_
- `REGEX_FLOAT_OR_INT` - xxx[.yyy] _(lengths not defined)_
- `REGEX_IP` - IP Address
- `REGEX_NUMBER` - any number
- `REGEX_PERCENT` - 0-100
- `REGEX_PORT` - 1-65534
- `REGEX_SIGNED_FLOAT` - [+|-]xxx.yyy _(lengths not defined)_
- `REGEX_SIGNED_NUMBER` - [+|-]xxx _(length not defined)_
- `REGEX_SOMETHING` - cannot be blank
- `REGEX_TIMECODE` - [0-24]:[0-60]:[0-60]:[0-30]

## Sample Module

When you put all of this together, a simplified module requiring a TCP socket would look like the ES6 and Prototype examples below.

### ES6

```javascript
const tcp = require('../../tcp')
const instance_skel = require('../../instance_skel')

class instance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config)
		this.initActions()
	}

	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This will establish a TCP connection to the device',
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 6,
				regex: this.REGEX_IP,
			},
		]
	}

	destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy()
		}

		this.debug('destroy', this.id)
	}

	init() {
		this.initTCP()
	}

	initActions() {
		let actions = {}

		actions['sample_action'] = {
			label: 'Sample Action',
			options: [
				{
					type: 'textinput',
					label: 'Some Text',
					id: 'text',
					regex: this.REGEX_SOMETHING,
				},
			],
			callback: (action, bank) => {
				let opt = action.options
				this.sendCommand(`SET sample_action: ${opt.text}`)
			},
		}

		this.setActions(actions)
	}

	initTCP() {
		if (this.socket !== undefined) {
			this.socket.destroy()
			delete this.socket
		}

		if (this.config.port === undefined) {
			this.config.port = 1024
		}

		if (this.config.host) {
			this.socket = new tcp(this.config.host, this.config.port)

			this.socket.on('status_change', (status, message) => {
				this.status(status, message)
			})

			this.socket.on('error', (err) => {
				this.debug('Network error', err)
				this.log('error', 'Network error: ' + err.message)
			})

			this.socket.on('connect', () => {
				this.debug('Connected')
			})
		}
	}

	sendCommand(cmd) {
		if (cmd !== undefined && cmd != '') {
			if (this.socket !== undefined && this.socket.connected) {
				this.socket.send(cmd)
			}
		}
	}

	updateConfig(config) {
		let resetConnection = false

		if (this.config.host != config.host) {
			resetConnection = true
		}

		this.config = config

		if (resetConnection === true || this.socket === undefined) {
			this.initTCP()
		}
	}
}

exports = module.exports = instance
```

### Prototype

```javascript
var tcp = require('../../tcp');
var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	self.initActions(); // export actions

	return self;
}

instance.prototype.config_fields = function() {
	var self = this;
	return [
		{
			type:  'text',
			id:    'info',
			width: 12,
			label: 'Information',
			value: 'This will establish a TCP connection to the device'
		},
		{
			type:  'textinput',
			id:    'host',
			label: 'Target IP',
			width: 6,
			regex: self.REGEX_IP
		}
	]
}

instance.prototype.destroy = function() {
	var self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
	}

	self.debug("destroy", self.id);;
}

instance.prototype.init = function() {
	var self = this;

	debug = self.debug;
	log = self.log;

	self.initTCP();
}

intsance.prototype.initActions = function() {
	var self = this;
	var actions = {};

	actions['sample_action'] = {
		label: 'Sample Action',
		options: [
			{
				type: 'textinput',
				label: 'Some Text',
				id: 'text',
				regex: self.REGEX_SOMETHING
			}
		],
		callback = function(action, bank) {
			var opt = action.options;
			self.sendCommand(`SET sample_action: ${opt.text}`);
		}
	};

	self.setActions(actions);
}

instance.prototype.initTCP = function() {
	var self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
		delete self.socket;
	}

	if (self.config.port === undefined) {
		self.config.port = 1024;
	}

	if (self.config.host) {
		self.socket = new tcp(self.config.host, self.config.port);

		self.socket.on('status_change', function(status, message) {
			self.status(status, message);
		});

		self.socket.on('error', function(err) {
			self.debug("Network error", err);
			self.log('error',"Network error: " + err.message);
		});

		self.socket.on('connect', function() {
			self.debug("Connected");
		});
	}
}

intance.prototype.sendCommand = function(cmd) {
	var self = this;

	if (cmd !== undefined && cmd != '') {
		if (self.socket !== undefined && self.socket.connected) {
			self.socket.send(cmd);
		}
	}
}

instance.prototype.updateConfig = function(config) {
	var self = this;
	var resetConnection = false;

	if (self.config.host != config.host) {
		resetConnection = true;
	}

	self.config = config;

	if (resetConnection === true || self.socket === undefined) {
		self.initTCP();
	}
}

instance_skel.extendedBy(instance);
exports = module.exports = instance;
```
