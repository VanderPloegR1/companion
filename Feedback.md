Buttons can also have feedbacks that change the style of the button based on the state of some device.
A simple example is:

```
const feedbacks = {}
feedbacks['set_source'] = {
		label: 'Brief description of the feedback here',
		description: 'Longer description of the feedback',
		options: [{
			type: 'colorpicker',
			label: 'Foreground color',
			id: 'fg',
			default: this.rgb(0, 0, 0)
		}, {
			type: 'colorpicker',
			label: 'Background color',
			id: 'bg',
			default: this.rgb(255, 0, 0)
		}, {
			type: 'number',
			label: 'Source'
			id: 'source',
			default: 1
		}]
	}
self.setFeedbackDefinitions(feedbacks);
```

This example allows the user to pick a new foreground and background colour, and has a field that will be used as a
condition. The types of options allowed here are the same as listed above for the actions.
Commonly the possible rules will be very similar to what can be changed by the actions.
To accompany the feedback definition, we need some code to handle it. This is done by a method on the class:

```
instance.prototype.feedback = function (event) {
	var self = this;
	var options = event.options;

	if (event.feedback == 'set_source') {
		if (this.some_device_state.source == options.source) {
			return { color: options.fg, bgcolor: options.bg }
		}
	} // else if (.....) {}

	return {}
}
```

Use `self.checkFeedbacks('feedback id')` to reload the specified feedback.

TODO - stacking order of multiple feedbacks

TODO - setting an image/other values that can be defined

... work in progress ...
