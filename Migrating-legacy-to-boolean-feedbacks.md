Most feedbacks should now be defined as 'boolean' feedbacks. The idea is to gradually convert them across over time, as they give the user more flexibility and will end up with a more consistent interface.

The process to migrate feedbacks across does involve a bit of work, but it is pretty straightforward.

## 1. Update feedback definitions
The feedback definitions need updating to the new style.  
From:
```javascript
feedbacks['set_source'] = {
    label: 'Brief description of the feedback here',
    description: 'Longer description of the feedback',
    options: [{
        type: 'colorpicker',
        label: 'Foreground color',
        id: 'fg',
        default: self.rgb(0, 0, 0)
    }, {
        type: 'colorpicker',
        label: 'Background color',
        id: 'bg',
        default: self.rgb(255, 0, 0)
    }, {
        type: 'number',
        label: 'Source'
        id: 'source',
        default: 1
    }]
}
```
To:
```js
feedbacks['set_source'] = {
    type: 'boolean', // Add this
    label: 'Brief description of the feedback here',
    description: 'Longer description of the feedback',
    style: {
        // Move the values from options to here
        color: self.rgb(0, 0, 0),
        bgcolor: self.rgb(255, 0, 0)
    }
    // remove the old style properties from options
    options: [{
        type: 'number',
        label: 'Source'
        id: 'source',
        default: 1
    }],
}
```

## 2. Update feedback callback/handler
The callback function on the feedback definition, or the feedbacks function on your class will need updating to return true or false instead of an object of values

From:
```js
if (self.some_device_state.source == options.source) {
    return { color: options.fg, bgcolor: options.bg }
}
return {}
```
To:
```js
if (self.some_device_state.source == options.source) {
    return true
}
return false
```

## 3. Update presets
Any presets defined in the module will need to be updated to match the changes in the definition

From:
```js
{
    category: `Category description`,
    label: `Button description`,
    bank: {
        ...
    },
    feedbacks: [
        {
            type: 'set_source',
            options: {
                bg: instance.rgb(0, 255, 0),
                fg: instance.rgb(255, 255, 255),
                input: src.id,
                mixeffect: me,
            },
        },
    ],
    actions: [
       ...
    ],
}
```
To:
```js
{
    category: `Category description`,
    label: `Button description`,
    bank: {
        ...
    },
    feedbacks: [
        {
            type: 'set_source',
            options: {
                input: src.id,
                mixeffect: me,
            },
            style: {
                bgcolor: instance.rgb(0, 255, 0),
                color: instance.rgb(255, 255, 255),
            }
        },
    ],
    actions: [
       ...
    ],
}
```

## 4. Add an upgrade script
Users will have feedbacks assigned to buttons already, and these will all need updating to the new format. A helper has been added to help with self. After the other upgrade scripts (or at the end of the class constructor if you have none), do the following

```js
self.addUpgradeToBooleanFeedbackScript({
    'set_source': true,
    'set_output': true,
    // List as many feedback types as you like
})
```
Quick tip: The script will only be run once, if you want to force it to be run again locally, add `self.config._configIdx = -1` above `self.addUpgradeToBooleanFeedbackScript` to force all the upgrade scripts to be rerun. Make sure to *not* commit that line

This script will handle moving the options properties across to the style object for you.
It handles the most common cases of property naming, which may not match what your module does.  
If this is the case, you can customise the behaviour by providing more details:
```js
self.addUpgradeToBooleanFeedbackScript({
    'set_source': {
        'bg': 'bgcolor',
        'fg': 'fgcolor',
    },
})
```

## 5. Test it
Make sure to test it all thoroughly, then you are done!

Feel free to ask on slack if you have any questions, or anything here doesn't make sense.