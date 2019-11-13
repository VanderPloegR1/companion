# About CompanionPi
CompanionPi is built and maintained by a member of the community, not by Bitfocus or its employees. If you encounter issues using CompanionPi, you should ask questions in the #rpi channel of the Bitfocus AS Slack server or report issues/feature requests here, on GitHub.

The current version of CompanionPi is built specifically for Rasbpian Buster on the Raspberry Pi 4. It has not been tested, and is therefore not supported on, any previous version of the Raspberry Pi.
* Headless: Raspbian Buster Lite
* Headed:"Raspbian Buster with desktop" (not "Raspbian Buster with desktop and recommended software")
>Headless, with no attached display and no graphical user interface, is the recommended mode of operation for Companion on current Raspberry Pi systems. This is because this mode maximizes the computational resources available to Companion.

# CompanionPi Configuration
CompanionPi is built on an unmodified deployment of the Raspbian OS, with Companion installed per the standard instructions ([[Manual Install on Raspberry Pi]]). There is one key difference, though:
* CompanionPi has a 2nd user account set up for the sole purpose of housing and running the Companion software: `companion`.
  * This was done so that no matter what happens to the default `pi` user account, Companion should still continue to function if the Raspberry Pi will boot.
Certain other minor changes were made to the Raspbian environment for setup and configuration purposes, as well, most notably:
* Locale, Timezone, and Keyboard Layout settings were changed to US-based settings instead of the default UK-based settings
* **SSH Server is enabled by default**

So, for the sake of comprehensive documentation, here is a list of all changes made to bring you CompanionPi:
1. Add new user `companion` and used that to build and run the Companion Software
1. 