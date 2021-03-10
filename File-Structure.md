# Introduction

Below are the minimum files necessary to create a control module for Companion.  You can create subfolders and other support Javascript files as needed.

## .gitignore

This is a standard Git file to tell files/folders to be excluded from Git version control. `node_modules/` should always be included in the `.gitignore`.

## HELP.md

A structured 'Help' document that is used within Companion to help users understand the module's capabilities and configure their instance.

## index.js

This main execution script for the module. See [Extending instance_skel](./instance_skel)

## LICENSE

Companion is an MIT licensed project. All modules released with the project must also be MIT.

**Consult the Companion team if you with to incorporate a dependency that does not have an MIT license.**

## package.json

Provides information to Companion about the module.  See [[package.json]]

## README.md

This file should include any relevant developer documentation that the Companion Core and Module Development teams should be aware of, as well as any helpful information for people who wish to fork and contribute.
