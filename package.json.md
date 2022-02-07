`package.json` is the root of the module. Companion scans the directory /module-local-dev looking for subfolders containing that package.json-files and if it finds one it assumes it a module.
A typical `package.json` file looks like this:

```
{
  "name": "studiocoast-vmix",
  "version": "1.2.18",
  "api_version": "1.0.0",
  "keywords": [
    "Software",
    "Vision Mixer"
  ],
  "manufacturer": "StudioCoast",
  "product": "vMix",
  "shortname": "vmix",
  "description": "Module to control StudioCoast vMix",
  "homepage": "https://github.com/bitfocus/companion-module-studiocoast-vmix",
  "bugs": {
    "url": "https://github.com/bitfocus/companion-module-studiocoast-vmix/issues",
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/bitfocus/companion-module-studiocoast-vmix.git",
  },
  "main": "src/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Per Røine <Example@Something.com>",
  "contributors": [
    "Jeff Martin <Example@Something.com>",
    "Andreas H. Thomsen <Example@Something.com>"
  ],
  "license": "MIT",
  "dependencies": {
    "lodash": "^4.17.19",
    "xml2js": "^0.4.22"
  }
}
```

The shown properties are required to be set, but more are allowed. If you want to make sure that you have set everything you are required to, check what [this unit test](https://github.com/bitfocus/companion/blob/master/test/module-syntax.test.js#L37) is requiring must be set.

You can guess the meaning of most parts. "main" is the location/name of the main JavaScript file, it is common to either reflect the module name or to use index.js.

At this point we don't make use of scripts given in the package.json, so you can just copy the test line. The test script will be executed if you run the module with `npm test`. Test help to improve the stability and quality of the code and we may use them in the future.
If you are using typescript, you should setup a `postinstall` script to build your code. Make sure this works when only production dependencies are installed. Check out [another typescript module](https://github.com/bitfocus/companion-module-bmd-atem) for an example of how this script and the type dependencies should be written.

A basic package.json file can be created by hand or it is automatically created for you when you use the command `npm init`.

"dependencies" lists other node packages and their minimum versions this package relies on. Most modules will rely on some standard packages like TCP, we have them in the core, so you don't have to list them here.

When you want to any packages via `require('....')` please install them in your module's node_modules folder with yarn `yarn add myfancymodule`. This will also add the package to the dependencies in package.json. Please also make sure to add the yarn.lock file to .gitignore after using yarn.