> A companion module is a submodule on GitHub

# For core maintainers

This section is only for companion core maintainers, if you want to add your own module to companion you need to request a new repository for your module, from one of the maintainers. Usually this is done on our slack at the #module-development channel.

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

`tools/upgrade_module.sh <theModuleThatNeedsAnUpgrade> '[Optional description of module changes]'`