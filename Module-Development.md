# Developers Guide. Ish.
So, you want to develop a module for Companion? Welcome!
This document describes what you need to know and do to make a beautiful module being able to control your favorite gear with Companion.
## Prerequisites
Companion is written in Javascript and uses the node.js runtime. That means you should be at least a little bit familiar with Javascript.
Companion, Javascript and Node.js are platform independent, so you can develop on Windows, macOS or Linux and the code you write will be able to run on Windows, macOS and Linux, but the following text shows how to develop on Linux or macOS. On Windows you need a little different setup, so you can't use the commands for Windows. Follow these guidelines and come back when ready; [Developing on Windows 10](https://github.com/bitfocus/companion/wiki/Developing-on-Windows-10)

1. Install [node.js](https://nodejs.org/en/). Node installs itself, the node executable and the node package manager "npm". You won't see any icons on your desktop or somewhere else, all node executables are used from the terminal.
2. Install n with the terminal command ```sudo npm install n -g```. n is a node version control module, it is very helpful because many node modules are working only with a certain version of node.
3. Install yarn with the terminal command ```sudo npm install yarn -g```. Yarn is a package management system for node modules, it helps you keeping all of your modules and their dependencies up to date.
4. Install [git](https://git-scm.com/downloads). Git is a version control system which allows many developers to collaborate on the same project and keep track of their work. If you have never worked with git before it is a good idea to read some getting started with git guides now.
5. Install libgusb headers, in debian based systems use package `libgusb-dev`
6. Install udev headers, in debian based systems use package `libudev-dev`
7. Install `cmake` as it is required for building nodejs modules for companion 2.0

### Installation on osx with homebrew

1. Open terminal
2. Install [homebrew](https://docs.brew.sh/) `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
3. Install needed packages `brew install nodejs npm libusb git`
4. Install npm packages: `npm install n yarn -g`
5. Select needed node.js version using n: `n 8.12.0`
6. Create directory to clone companion to and change to that directory: `mkdir -p ~/src && cd ~/src`
7. Clone the companion repository: `git clone https://github.com/bitfocus/companion`
8. Install required node.js modules and update companion modules: `cd companion && ./tools/update.sh && ./tools/build_writefile.sh`

## Getting started
1. Tell node what version you want to use ```n 8.12.0```
2. If you don't have a GitHub account yet, now you have to make one.
3. Fork the companion repository. Go to the [companion repository](https://github.com/bitfocus/companion) and click on Fork in the right top corner. Now GitHub will make a complete copy of all the companion source in your account, but GitHub will remember that this is a copy derived from the original Bitfocus/companion repository. If you want to make changes to the code or write a new module you cannot change the data in the Bitfocus/companion repository but you can write to your own fork. 
4. You cannot edit the code on GitHub (not really), you have to do this on your local computer. Use git to clone your fork to your computer. First change to the directory where you want to have your local repositoy and then ```git clone <your forked repository>```. \<your forked repository\> is something like https://github.com/yourgithubusername/companion.git
5. Change into your new local repository ```cd companion```
6. We provide some shell-scripts to run common tasks in the folder tools. Now use the update-script to install all the needed modules and submodules ```./tools/update.sh```
7. Voilá, you should now have everything set up to run Companion directly from the source code. Later you may or may not bundle all the stuff together and build an executable, but now you can just tell node to do the same stuff it would do when starting that executable but without packaging it first ```yarn dev``` (use ```npm run start``` for pre 2.0 code)

## The git workflow
For first time git and GitHub users this is a tough part. The commands in that section are only named for your reference, this section describes the workflow and is not a copy and paste to your commandline guide. Companion is open source, everybody can see and use the source code. You can change it the way you want, but we also want Companion to be a useful piece of software, so there has to be some management to ensure the software quality. Git and GitHub are tools, which help us with that. GitHub is a platform hosting the source code and its associated metadata and git is a program controlling that metadata and transferring the code from here to there on your computer and between computers.
* When you start developing Companion you are a stranger and we can't allow you to change the code directly in the Bitfocus/companion repository. Instead you have to change the code somewhere else and then propose your changes for being included in the original data. The first step is to fork the repo, that means GitHub makes a copy of the original repo in your account, but GitHub will remember that this is a copy derived from the original repository.
GitHub allows only very limited online editing, so you have to get all the data to your computer to edit it there. This process is called cloning, you have to clone your forked repository to your computer. When you clone a repo you do not only get the source code in its latest version you get all the history metadata together with it.
* Now that you have all the files on your computer you can edit them as you wish and try them out as long as you want. If you are satisfied with your work you have to make your changes available (if you want). Unfortunately this is a little complex process.
* git is a version control system, it allows us to go back in time and to see which change has been made to which file by who for what purpose. But we don't want to track every single edit you made, only the edits you think which should be a separate snapshot where you or anybody else might be interested in later. To create such a snapshot you have to "commit" your changes. First you have to select the changes which you want to commit, you don't have to include all your current changes you made in a snapshot. In git speak you have to "stage" the files you want to be included in the snapshot. With the commit command you tell git that you feel the state of the staged files like they are now on your computer should have a snapshot. If you edit a staged file before you commit it, it will get unstaged and you have to stage it again. You will be prompted to enter a commit message describing what that snapshot, we call it commit from now on, contains. Now git stores all the data in its database it needs to restore that point in time whenever you want.
* The commit still lives only on your computer, so you have to transfer it somehow to your remote repository. The command for that purpose is "push". At the time you cloned your remote repository to your computer git has remembered where it comes from and automatically added the remote location as a "remote" to your local repository. This remote automatically gets the name "origin". That means when you push now to origin you are transferring all your commits since cloning or the last push to the remote named origin.
* Now that your changes are in your fork you need a way to tell the Companion developers that you have some exciting new features and you want them to be included in the original Bitfocus/companion repository. The way to do that is to create a pull-request. You can do that on GitHub and you can decide which commits of which branch you want to be pulled to which branch in the Bitfocus/companion repo. Wait, what is a branch? Don't care about that for now, if you don't know about branches, then the branch with the name "master" is the right one for you.
* GitHub also tells you if the pull-request can be merged automatically. If yo are the only one who has made changes to the files in your pull-request, then it is easy. Git then just uses all your changes if the pull-request is accepted. But imagine somebody else has done some changes to the same files during the time it took you to fork and clone and edit and stage and commit and push and pull-request. Now the git program has two competing versions with different alterations and it cannot decide automatically how to mix the two files into one. That means a core developer has to do the work and review your changes and which lines to use from which version of the two competing files. If you have done bigger changes you normally had tested your code before pushing it and if somebody else now has to decide which lines to keep this may break the code. Therefor it is a good habit to "pull before push". That means you look yourself for changes somebody else may have done before you push your files. That is important even if there are changes in files you didn't change, because those changes may influence your code as well.
But at that point you have only one remote to your local repository, the automatically generated origin pointing to your fork. If you pull now you will pull from your fork and nobody else should have made any change on your fork. To pull the changes from the original repository you have to add it as a remote as well. You can name that remote as you like but a common name is "upstream". Once you have done that you pull from upstream and push to origin. If there are any conflicts, you are the one to solve them and test before you push. That makes the life of the maintainers a lot easier.
* If the core developers get tired of merging your pull-requests they may give you write access to a repository, then you can push direct to the code of Companion.

## Editing code
To edit the source code or write new code you can use any text editor you like, but there are many editors which are made especially for developing computer code or even better especially for JavaScript.
If you have no idea you should try the [atom editor](https://atom.io/), it is open source as well and very customizable.
### Bracing and indentation
Use tabs for indentation. We use tabwith=2, but you can do whatever you like. One indentation = one tab.

For bracing, do this
```
if (var == 1) {
  return;
}
```
not this
```
if (var == 1)
{
  return;
}
```
not this
```
if (var == 1) return;
```
not this
```
if (var == 1)
  return;
```

One thing we also like to do, is to subindent similar lines like
```
var moda = require("modulea");
var moduleb = require("moduleb");
var hello = require("hello");
```
to being
```
var moda    = require("modulea");
var moduleb = require("moduleb");
var hello   = require("hello");
```
this subindentation is not done with tabs, but spaces. Looks nice!

## Tools

### Update all, including yarn in submodules [Core Devs, Mod Devs]
./tools/update.sh

## Modules
Companion uses plug-ins to expand its capabilities, we call these plug-ins modules. For every device you can control with Companion there is a module. We splitted the repositories for the Companion source code and the code for the modules. Every module has its own repository on github and that repository is referenced in the core repo as a submodule. "Submodule" is a git term, "module" is a Javascript and Companion term. 

### Changing existing modules
When you want to make changes to an existing module, you need to fork the module's repository in the same way like you did with the core of Companion.
When you're doing changes to modules in companion, you need to upgrade the git link in the core as well. A submodule is similar to a pointer referencing a different repository at a certain commit point. If you made a change you have to update that pointer, so it points to the newest commit in the referenced repository.

1. Make sure you pull inside the module folder ```git pull origin master``` (maybe for you it is not "origin", just pull from the remote pointing to the original files)
2. Do your changes
3. Commit the changes with a nice message
4. Push your changes ```git push origin HEAD:master``` (again the name of your remote may be something different than "origin", if you are pushing to your fork of the submodule it usually is origin)

Now, in the core, we need to upgrade the reference to the module to the new version. For this we've made a tool. Go to the companion base directory (not inside the module):

```
cd companion
./tools/upgrade_module.sh <modulename>
```


## When you want to create a new ```mynewmodule``` module that doesn't have a repository yet:

1) ```cd ./lib/module/```
2) ```mkdir mynewmodule```
3) ```cd mynewmodule```
4) ```npm init``` (enter x 10)
5) ```git init```
6) ```git add package.json```
7) ```git commit package.json -m "package.json"```
8) ```echo node_modules/ > .gitignore```
9) ```git add .gitignore```
10) ```git commit .gitignore -m "gitignore to ignore the node_modules/ folder"```

Now, you need to ask the core developers to create a repository for your module, and wait for them to create the module repository.

When the repository gets created by a core developer, you can continue.

11) ```git remote add origin https://github.com/bitfocus/companion-module-mynewmodule.git```
12) ```git push origin HEAD:master```

Now we're at a point that the core developers must decide if its time to include this module in the companion core. But ask us on slack, and if we decide to add it - and we say it's done, you may proceed.

It's important that you didn't get any erros in the last push, because you're going to delete the code from your computer (make a backup if you're unsure).

13) ```cd ..```
14) ```rm -rf mynewmodule```
15) ```cd ../../```
16) ```./tools/update.sh```

The module should now appear in lib/module/mynewmodule, and if you want to change something in the module after this, you need to do your changes, commit it to the repository and read the beginning of the modules section in this document.

## What makes up a module

This document describes the API version 1.0.0. Your module will be compatible with all versions of Companion using API 1.x.x.
A Companion module consists of several files in one folder, the folder can have subfolders if needed.
On the root of the folder there have to be at least two files for a working module:
1) a file with the name package.json
2) a file containing the code of the module
There should be a few more files in every module, though technically not needed:
3) HELP.md, a file with some user manual for the module
4) LICENSE, in open source projects like Companion it is very important that you make clear under which license the modulke is released
5) .gitignore, this is a file which we recommend to add to your module to control which of the files within your module will be tracked by our version control system.

**Let's start with package.json**

package.json is the root of the module. Companion scans the directory /lib/module looking for subfolders containing that package.json-files and if it finds one it assumes it a module.
A typical package.json-file looks like this:
```
{
  "name": "eventmaster",
  "version": "0.0.4",
  "description": "Barco EventMaster plugin for Companion",
  "main": "eventmaster.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "William Viker",
  "license": "MIT",
  "dependencies": {
    "barco-eventmaster": "^5.1.0"
  }
}
```
You can guess the meaning of the most parts. "main" is the location/name of the main JavaScript file, it is common to either reflect the module name or to use index.js.

At this point we don't make use of scripts given in the package.json, so you can just copy the test line. The test script will be executed if you run the module with ```npm test```. Test help to improve the stability and quality of the code and we may use them in the future.

A basic package.json file can be created by hand or it is automatically created for you when you use the command `npm init`.

"dependencies" lists other node packages and their minimum versions this package relies on. Most modules will rely on some standard packages like tcp, we have them in core, so you don't have to list them here.

When you want to use packages not available in core please install them in your module's node_modules folder with yarn `yarn add myfancymodule`. This will also add the package to the dependencies in package.json. Please also make sure to add the yarn.lock file to .gitignore after using yarn.

**The Module source code**

You can handle all your module's stuff in one big file or you can distribute it to several files, it's up to you. But you have to have some things in the module. If the user adds an instance to the configuration Companion instantiates the module. But JavaScript doesn't have classes, we are working with functions and objects. That means our module is required by the system and then some functions will be called. You have to fill the functions with code. Easiest way to build a new module is to have a look at some existing modules. Take them as a starting point.

The functions divide into several categories:
 1. Module internal stuff, initialization, housekeeping...  
 2. Providing functionality to the user  
    2.1. Module configuration  
    2.2. Actions  
    2.3. Presets  
    2.4. Variables  
    2.5. Feedbacks  
 3. The code behind all that stuff  

### Module internal stuff, initialization, housekeeping...

When the user adds a new instance Companion looks in your module's main JavaScript file and executes the function `instance(system, id, config)`. Within that function the module gets constructed by calling `instance_skel.apply(this, arguments);` (you need to require '../../instance_skel'). During construction instance_skel calls `instance.prototype.init` where all your initialization code should go.

When the module gets deleted `instance.prototype.destroy` is called where you should clean-up whatever you don't need anymore (sockets, timers...)

Most modules define the property "info" like this 
`instance.module_info = {
	label: 'Your module name',
	id: 'module_id',
	version: 'x.y.z'
};`
This is deprecated, the module information should be only in package.json

For the module to work you also need
`instance_skel.extendedBy(instance);
exports = module.exports = instance;`
It is the JavaScript equivalent to some object oriented code.

### Providing functionality to the user

Most (so far all) modules do want to provide some interaction with the user. The possible items are stored in json objects. This splits up in several categories.

#### Module configuration
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

#### Actions

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
  ]
}
```
The option value will be filled with the id of the selected choice, the id given in default is preselected.

**Select2**
```
{
  type: 'select2',
  label: 'Genre',
  id: 'myExampleSelect2',
  default: '1',
  tooltip: 'Enter the genre of the music file',
  choices: [ 
    { id: '0', label: 'Rock' },
    { id: '1', label: 'Pop' },
    { id: '2', label: 'Classical' },
    { id: 'ambient', label: 'Ambient' }
  ],
  minChoicesForSearch: 0
}
```
In its simplest form the select2 can be used exactly like a dropdown. Then the only difference is that it is not styled in the native OS way, but like the other bootstrap input elements. To get that behaviour you use exactly the code like you would with a dropdown, but use `type: 'select2'` instead.
The first difference is, that you can add a search box. The user can type into the search box and the choices will be narrowed according to the input. To always get the search box set the the property `minChoicesForSearch: 0`, "0" means always show the search box. If you set the property minChoicesForSearch to a different value the search box will only be shown if you have at least that much choices. E.g. with `minChoicesForSearch: 8` and up to 7 choices the search box won't be shown and with at least 8 choices the seach box will be shown. This is handy if you retrieve the choices from a remote device and don't know how much there are, for only a few choices you don't waste screen real estate but with many choices you can make it a lot easier to find what you want.

There are two optional properties which change the behaviour of select2 substiantially: multiple and tags.

With `tags: true` the user can generate a new choice on the fly. If he types into the search box and no matching choice is found a new choice is generated after he presses return. Only thing to consider is that the entered text will be used for both, the id and the label.
It is strongly advisable to use tags only in conjunction with a regex. The syntax is exactly the same like with a textinput, e.g. `regex: '/^myvalue\d+$/'`, now the user still can enter any text in the search box, but a tag is only created when it matches the regex (e.g. "myvalue42").
If one has just created a tag and now changes the option to a different choice the tag dissapears, but can be recreated at any time. If a project with a stored tag is opened the tag will stay available as long as Companion runs even when deselected. But if Companion is closed all deselected tags are not stored.
A typical usecase for tags is when you control a device with many storage slots and you create an action to recall a slot. You can retrieve all the used slots with their names and show the user only these slots. He can then easily select a slot. But maybe he wants to preprogram or just chose a slot not in use when you pulled from the machine. Now this can be done with a dynamic tag.

with `multiple: true` select2 can be used to select multiple items but it is rendered much different than the multiselect option. While multiselect gives you a list where all options are shown all the time, select2 gives you a pillbox. That means only when clicking on the option all choices are shown with the search box. After selecting one or more items the selection is shown as pillbox style multiselect. "multiple" can be used without or with "tags", that means the user can also be allowed to generate many new choices on the fly. Valid tags can again be controlled with regex.
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

Creates a [number input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number) element which will only accept integers between `min` and `max` (inclusive). The `default` property must be a number (or `""` if not required). If the `required` property is `true` then the field can't be left empty.

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
  required: true,
  range: false
}
```




#### Presets

Presets are a description of a ready made button, so the user doesn't have to write button text and choose a color and add an action, he can just drag and drop a preset to an empty bank and all the attributes are copied to the button.

In order to add presets to a module, you will need to an another function to your module.
This function creates a button under the category "commands" and names it "Run Demo",
this part is a lot like how you define an action, here we got a "bank" section and an "action" section.
the bank section sets the button up with the look and feel, this is where you select the title and size, and where you can set a background colour.
```
bank: {
  style: 'text',
  text: 'Run Demo',
  size: '18',
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
One last thing to keep in mind, in order to import these presets into the module instance, you will need to include this command, in your instance, updateconfig and init function:
```
self.init_presets();
```

... work in progress ...

#### Variables

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

#### Feedbacks

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
condition.  The types of options allowed here are the same as listed above for the actions. 
Commonly the possible rules will be very similar to what can be changed by the actions.
To accompany the feedback definition, we need some code to handle it. This is done by a method on the class:
```
instance.prototype.feedbacks = function (event) {
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

TODO - stacking order of multiple feedbacks

TODO - setting an image/other values that can be defined

... work in progress ...

### The code behind all that stuff

Once you declared the actions and presets and maybe variables and feedbacks you have a nice looking module which still doesn't do any thing. Now you have to program some code to be executed when a action is triggered or feedback has to be updated.
Let's start with the actions.
Companion calls the function `instance.prototype.action = function(action)` when it wants the module to execute an action.
It passes the object action, which reflects the ID of the action in the property action.action and has the options in the property action.options.
```
var theIDofTheAction = action.action;
var theOptionsOfTheAction = action.options;
```
Now you can act depending on the action and the options. Many modules use a simple switch statement with one case for each action. Another method is to use the action-ID itself. Let's assume you just want to send a string with each action, then you can use that string as the action-ID and use it like sendmystring(action.action);
If you are working with options, especially textinput, you should validate the inputs or make the code as failsafe as possible.

## Testing

In any case your module should be tested throughout at different stages of its life. Off course you should use a linting tool which most code editors and IDEs offer.  
You should check the compatibility to the Companion core, especially to different versions of the configuration file. Some users may not have used Companion in a long time and their configuration file might look different then what you expect.  
And last but not least you should check **all** your actions with **all** the options and feedbacks and whatever with the real device. Most bugs we find are typos, which would have easily been detected be complete testing. Also please don't rely on simulations, often the real device reacts different than the simulator.

... work in progress ...

Questions? SLACK! :)
