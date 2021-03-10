Presets are a description of a ready-made button, so the user doesn't have to write button text and choose a colour and add an action, he can just drag and drop a preset to an empty bank and all the attributes are copied to the button.

In order to add presets to a module, you will need to another function to your module.
This function creates a button under the category "commands" and names it "Run Demo",
this part is a lot like how you define an action, here we got a "bank" section and an "action" section.
the bank section sets the button up with the look and feel, this is where you select the title and size, and where you can set a background colour. Valid sizes are: `'auto' | '7' | '14' | '18' | '24' | '30' | '44'`. Other things you can set are `latch: true | false` and `relative_delay: true | false`.

```
bank: {
  style: 'text',
  text: 'Run Demo',
  size: 'auto',
  color: '16777215',
  bgcolor: self.rgb(0,0,0)
},
```

the action section is where the magic happens, this is where you select what action you want the button to activate, and what parameters it will use for it. In the example, we run the action "run" and we give it a value to use "demo".

```
actions: [{
  action: 'run',
  options: {
    id: 'demo',
  }
}]
```

if you wanted the button to activate more than on action just repeat the action part of the code, like this:

```
  presets.push({
    category: 'Commands',
    label: demo,
    bank: {
      style: 'text',
      text: 'Run Demo',
      size: '18',
      color: '16777215',
      bgcolor: self.rgb(0,0,0)
    },
    actions: [{
      action: 'run',
      options: {
        id: 'demo',
      }
    }, {
      action: 'stop',
      options: {
        id: 'clip',
      }
    }]
  });
```

for the full preset function it might end up like below, if you want to create more than one button, just duplicate the whole presets.push({}); part of the code and adapt it to the next button with the new actions and titles.

```
instance.prototype.init_presets = function () {
  var self = this;
  var presets = [];

  presets.push({
    category: 'Commands',
    label: demo,
    bank: {
      style: 'text',
      text: 'Run Demo',
      size: '18',
      color: '16777215',
      bgcolor: self.rgb(0,0,0)
    },
    actions: [{
      action: 'run',
      options: {
        id: 'demo',
      }
    }]
  });

self.setPresetDefinitions(presets);
}
```

If you wish to add graphics to a preset button, you can use the built in ICONS or create your own .png file and upload it. Here is how to use a built-in Icon. Look at the `companion/lib/resources/icons.js` file for more choices.

```
bank: {
   style: 'png',
   text:  'Record',
   png64: self.ICON_REC_INACTIVE,
   pngalignment: 'center:center',
   size: '18',
   color: self.rgb(255,255,255),
   bgcolor: self.rgb(0,0,0)
}
```

One last thing to keep in mind, in order to import these presets into the module instance, you will need to include this command, in your instance, updateconfig and init function:

```
self.init_presets();
```

... work in progress ...
