# About CompanionPi
CompanionPi is built and maintained by a member of the community, not by Bitfocus or its employees. If you encounter issues using CompanionPi, you should ask questions in the #rpi channel of the Bitfocus AS Slack server or report issues/feature requests here, on GitHub.

The current version of CompanionPi is built specifically for Rasbpian Buster on the Raspberry Pi 4. It has not been tested, and is therefore not supported on, any previous version of the Raspberry Pi.
* Headless: Raspbian Buster Lite
* Headed: "Raspbian Buster with desktop" (not "Raspbian Buster with desktop and recommended software")
>Headless, with no attached display and no graphical user interface, is the recommended mode of operation for Companion on current Raspberry Pi systems. This is because this mode maximizes the computational resources available to Companion.

# CompanionPi Configuration
CompanionPi is built on an unmodified deployment of the Raspbian OS, with Companion installed per the standard instructions ([[Manual Install on Raspberry Pi]]). There is one key difference, though:
* **SSH Server is enabled by default**
* CompanionPi has a 2nd user account set up for the sole purpose of housing and running the Companion software: `companion`.
  * This was done so that no matter what happens to the default `pi` user account, Companion should still continue to function if the Raspberry Pi will boot.
Certain other minor changes were made to the Raspbian environment for setup and configuration purposes, as well, most notably:
* The default `pi` user account still has the default `raspberry` password. Those are left up to you to change for security purposes should you choose to do so (and you should!)
* Locale, Timezone, and Keyboard Layout settings were changed to US-based settings instead of the default UK-based settings

## Complete Changes From Base Raspbian (Headless)
1. Change default hostname from `raspberrypi` to `CompanionPi` _(raspi-config > 2 Network Options > N1 Hostname)_
1. Change Locale to en_US.UTF-8 _(raspi-config > 4 Localisation Options > I1 Change Locale)_
1. Change Timezone to America/Chicago _(raspi-config > 4 Localisation Options > I2 Change Timezone)_
1. Change Keyboard Layout to Generic Logitech/US English _(raspi-config > 4 Localisation Options > I3 Change Keyboard Layout)_
1. Enable SSH _(raspi-config > 5 Interfacing Options > P2 SSH)_
1. Add new user `companion`, with default password `bitfocus` and home directory `/home/companion`
1. Using the new `companion` user, Companion was installed via the standard instructions for the Raspberry Pi, substituting the appropriate home directory where necessary: [[Manual Install on Raspberry Pi]]

## Complete Changes From Base Rasbpian (Headed)
_Coming soon!_

# CompanionPi Images
The images are currently being developed and/or tested to confirm viability. As they are deemed viable for public consumption, download links will be made available here.