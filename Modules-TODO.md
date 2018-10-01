## Description of this document

Modules have been developed in a very fast pace, and in the meantime the core has matured more and more. This means that
the code in the modules needs to be updated. And we should try to update all modules at once, so that new module developers have
better "examples" to look at, instead of there coming more and more new modules with old and outdated code etc.

## Things that needs to be changed in all modules very soon

 * We should move away from the instance.module_info object. All technical info about the module should reside in package.json of that module

Done

 * ```system.emit('instance_actions', ...)``` should be replaced with a abstraction function, like it has been done with setPresetDefinitions, etc.

 * Version numbers of modules should start with >= 1.x.x. At least those with support for presets/feedbacks.

Done

 * We should populate each module with it's own category (sound/vision/etc), and maybe also sub categories like switcher/router/gpio, etc. This should be added to the package.json file of each module.

Done

 * Module name (folder name, and module shortname) should be composed of <manufacturer>-<product|protocol>.

 These changes should all be fixed in one, or two commits. Or at least the same day. So that nothing is forgotten.

## Who

This should probably be done by one of the core developers````