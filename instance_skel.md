# Guide to extending `instance_skel`
All modules include and extend the `lib/instance_skel.js` class.  This provides a base level of functionality and communication with the core application.

## Required Functions
#### `action(action: object) returns void`
#### `config_fields() returns object[]`
#### `destroy() returns void`
#### `init() returns void`
#### `updateConfig(config: object) returns void`

## Available Calls
#### `addUpgradeScript(cb: function) returns void`
#### `checkFeedbacks(type: string?) returns void`
#### `defineConst(name: string, value: object) returns void`
#### `getAllFeedbacks() returns object[]`
#### `getVariable(variable: name, cb: function) returns void`
#### `saveConfig() returns void`
#### `setActions(actions: object[]) returns void`
#### `setFeedbackDefinitions(feedbacks: object[]) returns void`
#### `setVariable(variable: string, text: string) returns void`
#### `setPresetDefinitions(presets: object[]) returns void`
#### `setVariableDefinitions(variables: object[]) returns void`
#### `status(level: string, message: string) returns void`
#### `subscribeFeedback(feedback: object) returns void`
#### `subscribeFeedbacks(type: string?) returns void`
#### `unsubscribeFeedback(feedback: object) returns void`
#### `unsubscribeFeedbacks(type: string?) returns void`

## Predefined REGEX
Available as `this.REGEX_*` for ES6 or `self.REGEX_*` for prototype
- `REGEX_BOOLEAN` - true|false|0|1
- `REGEX_FLOAT` - xxx.yyy _(lengths no defined)_
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
### ES6
```javascript
var tcp = require('../../tcp');
var instance_skel = require('../../instance_skel');
var debug;
var log;

class instance extends instance_skel {

	constructor(system,id,config) {
		super(system,id,config);
		this.actions();
	}

	actions() {
		let actions = {};

		actions['sample_action'] = {
			label: 'Sample Action',
			options: [
				{
					type: 'textinput',
					label: 'Some Text',
					id: 'text',
					regex: this.REGEX_SOMETHING
				}
			]
		};

		this.setActions(actions);
	}

	action(action) {
		let opt = action.options;
		let cmd = '';

		switch (action.action) {
			case 'sample_action':
				cmd = `SET sample_action: ${opt.text}`;
				break;
		}

		if (cmd !== undefined && cmd != '') {
			if (this.socket !== undefined && this.socket.connected) {
				this.socket.send(cmd);
			}
		}
	}

	config_fields() {
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
				regex: this.REGEX_IP
			}
		]
	}

	destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy();
		}

		this.debug("destroy", this.id);;
	}

	init() {
		debug = this.debug;
		log = this.log;

		this.initTCP();
	}

	initTCP() {
		if (this.socket !== undefined) {
			this.socket.destroy();
			delete this.socket;
		}

		if (this.config.port === undefined) {
			this.config.port = 1024;
		}

		if (this.config.host) {
			this.socket = new tcp(this.config.host, this.config.port);

			this.socket.on('status_change', (status, message) => {
				this.status(status, message);
			});

			this.socket.on('error', (err) => {
				this.debug("Network error", err);
				this.log('error',"Network error: " + err.message);
			});

			this.socket.on('connect', () => {
				this.debug("Connected");
			});
		}
	}

	updateConfig(config) {
		var resetConnection = false;

		if (this.config.host != config.host) {
			resetConnection = true;
		}

		this.config = config;

		if (resetConnection === true || this.socket === undefined) {
			this.initTCP();
		}
	}
}

exports = module.exports = instance;
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

	self.actions(); // export actions

	return self;
}

intsance.prototype.actions = function() {
	var self = this;
	var actions = {};

	actions['sample_action'] = {
		label: 'Sample Action',
		options: [
			{
				type: 'textinput',
				label: 'Some Text',
				id: 'text',
				regex: this.REGEX_SOMETHING
			}
		]
	};

	self.setActions(actions);
}

intance.prototype.action = function(action) {
	var self = this;
	var opt = action.options;
	var cmd = '';

	switch (action.action) {
		case 'sample_action':
			cmd = `SET sample_action: ${opt.text}`;
			break;
	}

	if (cmd !== undefined && cmd != '') {
		if (self.socket !== undefined && self.socket.connected) {
			self.socket.send(cmd);
		}
	}
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

		self.socket.on('status_change', (status, message) => {
			self.status(status, message);
		});

		self.socket.on('error', (err) => {
			self.debug("Network error", err);
			self.log('error',"Network error: " + err.message);
		});

		self.socket.on('connect', () => {
			self.debug("Connected");
		});
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