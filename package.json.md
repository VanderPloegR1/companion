`package.json` is the root of the module. Companion scans the directory /module-local-dev looking for subfolders containing that package.json-files and if it finds one it assumes it a module.
A typical `package.json` file looks like this:

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

At this point we don't make use of scripts given in the package.json, so you can just copy the test line. The test script will be executed if you run the module with `npm test`. Test help to improve the stability and quality of the code and we may use them in the future.

A basic package.json file can be created by hand or it is automatically created for you when you use the command `npm init`.

"dependencies" lists other node packages and their minimum versions this package relies on. Most modules will rely on some standard packages like tcp, we have them in core, so you don't have to list them here.

When you want to use packages not available in core please install them in your module's node_modules folder with yarn `yarn add myfancymodule`. This will also add the package to the dependencies in package.json. Please also make sure to add the yarn.lock file to .gitignore after using yarn.