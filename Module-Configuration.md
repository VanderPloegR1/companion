The module configuration is like preferences for the instance. E.g. the IP-adress of the device controlled by the instance.

The configuration json is returned by the function `instance.prototype.config_fields`
Every item needs to have:
- id: an unique (within the configuration) id of the item
- label: the text which will be shown next to the configuration item
- type: the type of the configuration item.

Following types are supported: textinput, dropdown, text, checkbox, number  

`textinput` shows a textinput line where users can provide some text
```
{
  type: 'textinput',
  id: 'host',
  label: 'Target IP',
  width: 6,
  regex: self.REGEX_IP
}
```

`dropdown` shows a dropdown menu with some choices to chose from
```
{
  type: 'dropdown',
  label: 'Nice Dropdown',
  id: 'myfirstdropdown',
  default: '1',
  choices: [
    { id: '1', label: 'One' },
    { id: '2', label: 'Zwei' },
    { id: '3', label: 'Tres' },
    { id: '4', label: '4' }
  ]
}
```

`text` shows just some informational text
```
{
  type: 'text',
  id: 'info',
  width: 12,
  label: 'Information',
  value: 'Hello World!'
}
```

`checkbox` shows checkbox and returns a value of `true` when checked and `false` when unchecked. The `default` property must be a boolean. The value returned will be a boolean.
```
{
  type: 'checkbox',
  label: 'HTTPS Connection',
  id: 'https',
  default: false
}
```

`number` shows a [number input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number) element which will only accept integers between min and max (inclusive). The `default` property must be a number (or `""` if not required). If the `required` property is `true` then the field can't be left empty.

The value returned will always be a number (example: `50`, not `"50"`), unless the field isn't required and was left empty, in which case it will be an empty string.

```
{
  type: 'number',
  label: 'Port',
  id: 'port',
  min: 1,
  max: 65535,
  default: 8080,
  required: true
}
```

Additional an item can have:
- width: tries to set the display with of the item relative to the other items' widths
- default: a default value
- regex: a regular expression to validate the user-input
  you can find some predefined regular expressions in instance_skel and use them like e.g. `self.REGEX_IP`
  If you want to write your own regular expression the string should look like this `'/foo(bar)?/i'`, if you need a backslash, you have to double escape it like this `'/^\\w+$/'`

In your code you can get the values of the configuration like `var myConfigValue = this.config.idOfItem`
