Besides the internal JavaScript variables you can use in your module, Companion also provides a variable system available to the user. Modules can add variables to be used by the user e.g. in buttons.
You can set a variable right away with `self.setVariable('variablename', variablevalue);`
The user can use this variable with `$(instancename:variablename)`
That means for the user variable-names have to be constructed of the instance-name and the variable-name.
Variable names should only use letters [a-zA-Z], numbers, underscore, hyphen.
You mustn't use brackets or the dollar-sign. 
You should inform the users about the variables your module provides using this function:
```
self.setVariableDefinitions( [
	{
		label: 'Describe the variable here',
		name: 'my_extraordinary_variablename'
	},
	{
		label: 'Describe another variable here',
		name: 'my_superextraordinary_variablename'
	}
] );
```

... work in progress ...