> A companion module is a submodule on GitHub

## Adding a (sub)module

First create a new module repo: 
`companion-module-[brand]-[product]`  

all small letters

Then when your module is ready and tested:

`git submodule add https://github.com/bitfocus/companion-module-[brand]-[product] lib/module/[brand]-[product]`

Make a new commit message:

`git commit -m "Module added: [brand]-[product]"`

Push the changes to github, in this case add the submodule to the core:

`git push`

## Edit a module and push to core

Make sure you are working in the correct master branch. When you've updated the submodule on gitub, that latest commit is not into the core yet.

`git status`

Will display the changes compared to the core (if you are in the base companion directory)

`git add lib/module/[theModuleThatNeedsAnUpgrade]`

`git commit -m "Module upgraded: theModuleThatNeedsAnUpgrade [short message about what is new, fixed, solved]"`

`git push`
