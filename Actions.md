Actions are the "commands" being executed when a user pushes a button.

This section explains how to provide the possible actions and their options to the user. The code executed when an action is triggered has to be written too, but not during action declaration.

If you look at the existing modules you'll find a call to `instance.prototype.actions = function(system)` in the instance function. Again, you don't have to use the same pattern, especially not if you are declaring actions ony once, but it may enhance readability to put all declarations in a separate function.

In the actions function you emit a message with the declaration: `self.system.emit('instance_actions', self.id, { ...here goes the actions ... });`

All the actions are passed in one json array, like `{'action1', 'action2', 'action3'}`. You need to explain Companion a little more about your action now or later, like

```
{
  'action1' : { properties of action 1 },
  'action2' : { properties of action 2 },
  'action3' : { properties of action 3 }
}
```

The only property you really need is `label: 'call me names'`.

Now companion makes that action available with the name you specified in label.
Maybe you want your action to have options, let's say you want your action to run a task and you want the user to be able to specify which task. You can do this by adding an options array to the properties of the action, like `options: [{ ... here goes the options ... }]`

Similar to the configuration fields of the module an option can be of different types.

**Textinput**

```
{
  type: 'textinput',
  label: 'The best option ever',
  id: 'bestoption',
  default: '1',
  tooltip: 'In this option you can enter whatever you want as long as it is the number one',
  regex: '/^1$/'
}
```

Later you can access the value of the textfield in the above example with `var userInput = action.options.bestoption`.

**Dropdown**

```
{
  type: 'dropdown',
  label: 'What do you want',
  id: 'myExampleDropdown',
  default: '1',
  tooltip: 'Which ice cream shall I order?',
  choices: [
    { id: '0', label: 'Chocolate' },
    { id: '1', label: 'Vanilla' },
    { id: '2', label: 'Strawberry' },
    { id: 'somethingelse', label: 'I hate ice cream' }
  ],
  minChoicesForSearch: 0
}
```

The option value will be filled with the id of the selected choice, the id given in default is preselected.
Adding `minChoicesForSearch: x`, will add a search box. The user can type into the search box and the choices will be narrowed according to the input. To always get the search box set the the property `minChoicesForSearch: 0`, "0" means always show the search box. If you set the property minChoicesForSearch to a different value the search box will only be shown if you have at least that much choices. E.g. with `minChoicesForSearch: 8` and up to 7 choices the search box won't be shown and with at least 8 choices the seach box will be shown. This is handy if you retrieve the choices from a remote device and don't know how much there are, for only a few choices you don't waste screen real estate but with many choices you can make it a lot easier to find what you want.

There are two optional properties which change the behaviour of dropdown substiantially: multiple and tags.

With `allowCustom: true` the user can generate a new choice on the fly. If he types into the search box and no matching choice is found a new choice is generated after he presses return. Only thing to consider is that the entered text will be used for both, the id and the label.
It is strongly advisable to use tags only in conjunction with a regex. The syntax is exactly the same like with a textinput, e.g. `regex: '/^myvalue\d+$/'`, now the user still can enter any text in the search box, but a tag is only created when it matches the regex (e.g. "myvalue42").
If one has just created a tag and now changes the option to a different choice the tag dissapears, but can be recreated at any time. If a project with a stored tag is opened the tag will stay available as long as Companion runs even when deselected. But if Companion is closed all deselected tags are not stored.
A typical usecase for tags is when you control a device with many storage slots and you create an action to recall a slot. You can retrieve all the used slots with their names and show the user only these slots. He can then easily select a slot. But maybe he wants to preprogram or just chose a slot not in use when you pulled from the machine. Now this can be done with a dynamic tag.

with `multiple: true` dropdown can be used to select multiple items but it is rendered much different than the multiselect option. While multiselect gives you a list where all options are shown all the time, dropdown gives you a pillbox. That means only when clicking on the option all choices are shown with the search box. After selecting one or more items the selection is shown as pillbox style multiselect. "multiple" can be used without or with "tags", that means the user can also be allowed to generate many new choices on the fly. Valid tags can again be controlled with regex.
The maximum number of selectable choices with multiple are not limited by default. If you want to limit them use `maxSelection: 4` to limit to maximum 4 items.
The minimum number of selected choices is by default zero returning an empty array. If you want to make the select mandatory use `minSelection: 1` and the user can't remove the last selection. You can also set minSelection to a higher number forcing the user to select more values. Keep in mind that if you want exact n selections and if you set maxSelection is set to n and minSelection is also set to n, the user can't change the selection anymore because he has no possibility to add or delete items from the current selection. If you want a specific number of selections you have to solve this with a validation in your code.
If you use "multiple" the result will always be an array of strings. If only one choice is selected, the array has only one element.

**Multiselect**

Multiselect shows a list with several items. The user can select none, one or multiple items.

```
{
  type: 'multiselect',
  label: 'Rooms',
  id: 'myExampleMultiselect',
  default: '1',
  tooltip: 'Where do you want to play audio?',
  choices: [
    { id: '0', label: 'Foyer' },
    { id: '1', label: 'Conference-room 1' },
    { id: '2', label: 'Conference-room 2' },
    { id: '3', label: 'Restaurant' }
  ]
}
```

The multiselect returns an array with the chosen options. If no option is selected it returns an empty array.

**Checkbox**

A checkbox with a boolean value of `true` when checked and `false` when unchecked. The `default` property must be a boolean. The value returned will be a boolean.

```
{
  type: 'checkbox',
  label: 'HTTPS Connection',
  id: 'https',
  default: false
}
```

**Number**

Creates a [number input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number) element which will only accept numbers between `min` and `max` (inclusive). The `default` property must be a number (or `""` if not required). If the `required` property is `true` then the field can't be left empty.

If the `range` property is `true` then a [range input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range) will also be created. Adding a range input will always make the field required since a range always has a value.

The value returned will always be a number (example: `50`, not `"50"`), unless the field isn't required and was left empty, in which case it will be an empty string.

```
{
  type: 'number',
  label: 'Opacity',
  id: 'opacity',
  tooltip: 'Sets the opacity percent (0-100)',
  min: 0,
  max: 100,
  default: 50,
  step: 0.5,
  required: true,
  range: false
}
```

**Optional Options**

Every option can have the property `isVisible: ` to controle its visibility. A static value of `true`of `false`is possible but the fun starts with a function controlling the visibility

```
{
  id: 'pwNeeded',
  label: 'Password needed',
  type: 'checkbox',
},
{
  id: 'password',
  label: 'Password',
  type: 'textinput',
  isVisible: (action) => { action.options.pwNeeded }
```

If the function returns true the option will be shown.


**Callback**

Like said in [instance_skel](https://github.com/bitfocus/companion/wiki/instance_skel) one common practice is to separate action definition from the code which is executed when running the action.
If you prefer or need, you can also attach the code to the action definition with a callback function like so:

```
callback: (action) => {
  console.log(action.options.mostImportantOption)
}
```

As you can see the callback will always be called with a reference to the action itself, so you have acces to all action options.

**Learn**

If you define a learn function in your action, there will be a small 'Learn' button in the GUI next to the action. If the user clicks on the learn button, the function gets called and the properties of the return object can be used to fill the action options. You can use this e.g. to get data from the device you are controlling and fill the options. Think of a remote controlled radiator, wich is set to level 'Ultra hot'. If you provide an action to set the temperature you can use the learn functionality to retrieve the actual level setting and provide it to the option. Instead of having to search thru a long dropdown with many options from 'Sub arctic' to 'Beyond plasma', the current setting can be retrieved by the click of one button.
The syntax is similar to the callback, but with a return value:

```
learn: (action) => {
  // do some stuff
  const newValue = 'Ultra hot'
  return {
    ...action.options,
    action.options.temperature: newValue
  }
}
```
