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

Example showing how to use `release_actions` and `latch: true` to set a button with a key down and a key up action.

```
{
    category: 'Socket Toggle On/Off',
    label: 'Toggle Output 6',
    bank: {
        bgcolor: 0,
        style: 'text',
        text: '6',
        size: '44',
        color: 16777215,
        latch: true
    },
    actions: [{
        action: 'switchOn',
        options: {
            socketOn: '6',
        }
    }],
    release_actions: [{
        action: 'switchOff',
        options: {
            socketOff: '6',
        }
    }]
}
```

One last thing to keep in mind, in order to import these presets into the module instance, you will need to include this command, in your instance, updateconfig and init function:

```
self.init_presets();
```

... work in progress ...

## Standard Colors

Below are some color profiles for typical action and/or feedback combinations we recommend.

| Color  | RGB Value | Text color | Usage                                                                                |
| ------ | --------- | ---------- | ------------------------------------------------------------------------------------ |
| RED    | 255,0,0   | White text | STOP,HALT,BREAK,KILL and similar terminating functions + Active program on switchers |
| GREEN  | 0,204,0   | White text | TAKE,GO,PLAY, and similar starting functions. + Active Preview on switchers          |
| YELLOW | 255,255,0 | Black text | PAUSE,HOLD,WAIT and similar holding functions + active Keyer on switchers            |
| BLUE   | 0,51,204  | White text | Active AUX on switchers                                                              |
| PURPLE | 255,0,255 | White text | Presets that need user configuration after they have been draged onto a button       |

## Icons

There are some icons you can use that are part of the fonts.

| Glyph | Hex Code | font size | Usage                     |
| ----- | -------- | --------- | ------------------------- |
| ⏵     | 23F5     | 44        | Play,Start,Go, TAKE       |
| ⏹     | 23F9     | 44        | Stop, Halt, Break, KILL   |
| ⏸     | 23F8     | 44        | Pause, Hold, Wait         |
| ⏯     | 23EF     | 44        | Toggle Play/Pause         |
| ⏺     | 23FA     | 44        | Rec, Save, Store          |
| ⏭     | 23ED     | 44        | Next, Skip, FWD           |
| ⏮     | 23EE     | 44        | Previous, Back, Rev       |
| ⏩    | 23E9     | 44        | Fast FWD, Shuttle Fwd     |
| ⏪    | 23EA     | 44        | Fast Rewind , Shuttle rev |
| ⏏️    | 23CF     | 44        | Eject, Unload             |
| 🔁    | 1F501    | 44        | Loop, Cycle               |
| ❄︎    | 2744     | 44        | Freeze                    |
| ⬆️    | 2B06     | 44        | Up                        |
| ↗️    | 2197     | 44        | Up Right                  |
| ➡️    | 27A1     | 44        | Right                     |
| ↘️    | 2198     | 44        | Down Right                |
| ⬇️    | 2B07     | 44        | Down                      |
| ↙️    | 2199     | 44        | Down Left                 |
| ⬅️    | 2B05     | 44        | Left                      |
| ↖️    | 2196     | 44        | Up Left                   |
| 🔀    | 1F500    | 44        | Transition                |
| 🔇    | 1F507    | 44        | Mute                      |
| 🔈    | 1F508    | 44        | Unmute                    |
| ⏻     | 23FB     | 44        | Power Toggle              |
| ⏾     | 23FE     | 44        | Power Sleep               |
| ⏽     | 23FD     | 44        | Power On                  |
| ⏼     | 23FC     | 44        | Power Off                 |
| 😱    | 1F631    | 44        | Panic                     |
