> You would need the correct user rights for this, we want the module repository to be in the bitfocus environment.
> Where submodule is stated, replace this with module name. Working directory should be your companion directory (not the module directory)

## Adding a submodule
`git submodule add https://github.com/bitfocus/companion-module-submodule.git lib/module/submodule`

`git commit -m "Module Added: submodule"`

`git push`

## Removing a submodule
Sometimes you would exclude a module from the core, this is the correct way to do so

`mv lib/module/submodule lib/module/submodule-tmp`

`git submodule deinit -f -- lib/module/submodule`

`rm -rf .git/modules/lib/module/submodule`

`git rm -f lib/module/submodule`

> lib/module/submodule (no trailing slash)

`git commit -m "Module Deleted: submodule"`

`git push`