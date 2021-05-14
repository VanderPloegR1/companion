Buttons can also have feedbacks that change the style of the button based on the state of some device.
A simple example is:

```js
const feedbacks = {}
feedbacks['set_source'] = {
    type: 'boolean', // Feedbacks can either a simple boolean, or can be an 'advanced' style change (until recently, all feedbacks were 'advanced')
    label: 'Brief description of the feedback here',
    description: 'Longer description of the feedback',
    style: {
        // The default style change for a boolean feedback
        // The user will be able to customise these values as well as the fields that will be changed
        color: self.rgb(0, 0, 0),
        bgcolor: self.rgb(255, 0, 0)
    }
    // options is how the user can choose the condition the feedback activates for
    options: [{
        type: 'number',
        label: 'Source'
        id: 'source',
        default: 1
    }],
    callback: function (feedback) {
        // This callback will be called whenever companion wants to check if this feedback is 'active' and should affect the button style
        if (self.some_device_state.source == options.source) {
			return true
		} else {
            return false
        }
    }
}
self.setFeedbackDefinitions(feedbacks);
```

Elsewhere in your code, you can use `self.checkFeedbacks('set_source')` to make companion recheck the specified feedback type. This is typically done as part of the handling of messages from the device.

When feedbacks are executed, they are executed in a top to bottom order, as shown in the button editor in the ui. eg, if a feedback lower down the list sets `color`, and one higher up, then the lower value will be used.

### Style properties

The full set of style properties that feedbacks can change is as follows. The uer can choose any of these for 'boolean' feedbacks, or they can be set via 'advanced' feedbacks
```typescript
export type CompanionAlignment =
	| 'left:top'
	| 'center:top'
	| 'right:top'
	| 'left:center'
	| 'center:center'
	| 'right:center'
	| 'left:bottom'
	| 'center:bottom'
	| 'right:bottom'

export type CompanionTextSize = 'auto' | '7' | '14' | '18' | '24' | '30' | '44'

export interface CompanionStyleProps {
	text: string
	size: CompanionTextSize
	color: number
	bgcolor: number
	alignment: CompanionAlignment
	pngalignment: CompanionAlignment
	png64: string | null
}
```

## Migrating legacy to boolean feedbacks 
[Migrating legacy to boolean feedbacks](https://github.com/bitfocus/companion/wiki/Migrating-legacy-to-boolean-feedbacks)

## Alternate flows
### Callbacks
In some modules, it is more appropriate to not have the callback functions defined with the feedback definition. If this is desired, you can instead create a `feedbacks` function on your class that will be called for each feedback (that does not have a callback defined)

```
instance.prototype.feedback = function (event) {
	var self = this;
	var options = event.options;

	if (event.feedback == 'set_source') {
		if (self.some_device_state.source == options.source) {
			return true
		}
	} // else if (.....) {}

	return false
}
```

### Subscriptions
Sometimes it is useful to know what feedbacks are being used. This is common if devices have thousands of properties, or if a device requires polling to fetch the data.

On the feedback definition, it is possible to register some additional callbacks to be informed about the feedbacks, to help with self.
```javascript
const feedbacks = {}
feedbacks['set_source'] = {
    label: 'Brief description of the feedback here',
    description: 'Longer description of the feedback',
    options: [{
        type: 'number',
        label: 'Source'
        id: 'source',
        default: 1
    }],
    callback: function (feedback) {
        ....
    },
    subscribe: function (feedback) {

    },
    unsubscribe: function (feedback) {

    }
}
```

Whenever a feedback is added to a button, `subscribe` will be called.  
Whenever a feedback is removed from a button, `unsubscribe` will be called.  
Whenever the options of a feedback on a button is changed, `unsubscribe` will be called, followed by `subscribe`. (Note: this is not triggered when the style properties are changed for boolean feedbacks)

It is also possible to force either `unsubscribe` or `subscribe` to be called for every feedback, by calling `self.subscribeFeedbacks()` or `self.unsubscribeFeedbacks()`. Both functions accept a `feedback_type` parameter, to only run on a certain feedback type (eg `self.unsubscribeFeedbacks('set_source'))`.  
When using these callbacks, it is common to call `subscribeFeedbacks` once the connection to the device has been established, to help ensure all the required data gets loaded.

### 'advanced' feedbacks
While this is called advanced, this is how all feedbacks behaved until boolean feedbacks were introduced. It is called advanced as it allows for more flexibility, but should not be used for most feedbacks.

These are very similar to boolean, but define the style properties differently:
```js
const feedbacks = {}
feedbacks['set_source'] = {
    type: 'advanced',
    label: 'Brief description of the feedback here',
    description: 'Longer description of the feedback',
    options: [{
        type: 'number',
        label: 'Source'
        id: 'source',
        default: 1
    }],
    // Note: no 'style' object
    callback: function (feedback) {
        if (self.some_device_state.source == options.source) {
            // Instead a style object can be returned each time the callback is called
			return { bgcolor: self.rgb(0, 255, 0) }
		} else {
            return {}
        }
    }
}
self.setFeedbackDefinitions(feedbacks);
```
This flow is most beneficial to allow for dynamic values to be returned.  
Perhaps you want to change the background colour between black and red based on an opacity value in the device `return { bgcolor: self.rgb(self.some_device_state.opacity, 0, 0) }`
Or you want to generate/use a generated png image `return { png64: self.some_device_state.preview_image }`.
