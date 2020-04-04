# Guide to extending `instance_skel`
All modules include and extend the `lib/instance_skel.js` class.  This provides a base level of functionality and communication with the core application.
## Setup
### ES6
### Prototype

## Required Functions
#### `action(action: object) returns void`
#### `config_fields() returns object[]`
#### `destroy() returns void`
#### `init() returns void`
#### `updateConfig(config: object) returns void`

## Additional Functions
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
