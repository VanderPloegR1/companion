> Please note: This documentation is a work-in-progress up until the release of the CompanionPi images.
> Nothing here should be considered "final" until those images are released and this note is removed.

## Table of Contents
1. [About CompanionPi](#about-companionpi)
1. [Configuration Notes](#configuration-notes)
1. [CompanionPi Terminal Commands](#companionpi-terminal-commands)
1. [CompanionPi Images](#companionpi-images)
1. [Accessing the Companion Admin User Interface](#accessing-the-companion-admin-user-interface)
1. [Complete Changes from Base Raspbian](#complete-changes-from-base-raspbian)

# About CompanionPi
CompanionPi is built and maintained by a member of the community, not by Bitfocus or its employees. If you encounter issues using CompanionPi, you should ask questions in the #rpi channel of the Bitfocus AS Slack server or report issues/feature requests [here, on GitHub](https://github.com/bitfocus/companion/issues).

The current version of CompanionPi is built specifically for Rasbpian Buster on the Raspberry Pi 4. It has not been tested, and is not in any way supported on, any previous version of the Raspberry Pi.
* Headless: Raspbian Buster Lite
* Headed: "Raspbian Buster with desktop" (not "Raspbian Buster with desktop and recommended software")
> Headless, with no attached display and no graphical user interface, is the recommended mode of operation for Companion on current Raspberry Pi systems.
> This is because this mode maximizes the computational resources available to Companion.

# Configuration Notes
CompanionPi is built on the Raspbian OS. Aside from the addition of the Companion source code, only a few minor changes have been made to the system configuration to facilitate construction of the image(s):
* **SSH Server is enabled by default**
* The default `pi` user account still has the default `raspberry` password. This is left up to you to change for security purposes should you choose to do so [(and you should!)](https://www.raspberrypi.org/documentation/configuration/security.md)
* ~~CompanionPi has a 2nd user account set up for the sole purpose of housing and running the Companion software. The username for this account is `companion` and the password is 'bitfocus'.~~
  * ~~This was done so that no matter what happens to the default `pi` user account, Companion should still continue to function if the Raspberry Pi will boot.~~
* Locale, Timezone, and Keyboard Layout settings were changed to US-based settings instead of the default UK-based settings
* More specific details about how the CompanionPi image was assembled can be found at the end of this wiki page.

# CompanionPi Terminal Commands
There are several commands that will be useful for all CompanionPi users. These commands will perform several functions, such as
* Viewing the full Bitfocus Companion licensing information
  * `companion-license` is a custom executable that's been added to output the full text of the Bitfocus Companion License.
  * To close the license viewer (`less` file viewer) you can simply type `q`.
* Starting, stopping, or restarting Companion, or viewing the status of the Companion service
  * `sudo systemctl [start/stop/restart/status] companion` will execute the desired action as it relates to the Companion service
* Updating the Companion source code from GitHub and building any new changes
  * `companion-update` is a custom executable that's been added to easily call the `update.sh` script that performs the update operations.
  * This must be run as `sudo`, so either run it as `sudo companion-update` or you will be prompted for your `sudo` password before the update can begin.

# CompanionPi Images
The images are currently being developed and/or tested to confirm viability. As they are deemed viable for public consumption, download links will be made available here.

## Flashing the Image to your microSD Card
First of all, you're going to want a fast Micro SD card. One of the most popular ones currently on the market is the SanDisk Extreme PRO 32GB card ([on Amazon, here (Amazon US)](https://www.amazon.com/gp/product/B06XYHN68L)). This isn't always going to be _the best_ one to use, but it is a very good, adequately fast microSD card. Look for anything that is classified as UHS 1 or higher as these will have the read/write speeds you need for your Raspberry Pi to be useful instead of a slow pain in the neck.

Once you've got your fast microSD card in hand, you'll need a tool for flashing the image to the card. One of the most popular tools is Balena Etcher (Windows, Mac, and Linux). It's very easy to use. You can [download it here](https://www.balena.io/etcher/).

> On first boot, it'll take a few minutes for the Admin User Interface to be available. The OS has to resize itself to the capacity of your SD card and that takes an extra reboot.

# Accessing the Companion Admin User Interface
~~In order for Companion to bind the Admin User Interface to your network connection (wired Ethernet or wireless), that connection has to be available at boot.~~
* ~~Wired Ethernet: you'll need to have the Ethernet cable plugged in before you power on the Raspberry Pi.~~
* ~~Wireless network: you'll need to set up your wireless connection first, then reboot the Raspberry Pi so Companion can bind the Admin User Interface to the wireless network connection.~~
  * ~~If you're going to use wireless, make sure you've also updated the service file accordingly. The documentation for this is here: [[Auto Start Companion on Linux Using systemd]]~~

Once you've got your Raspberry Pi up and running with the CompanionPi image, you'll need to know the IP address of your Raspberry Pi. There are a few ways to do this:
* A custom Python script written to email you the IP address every time it boots _(requires internet connection at boot)_: [on GitHub, here](https://github.com/oliverscheer/send-email-with-device-ip-address)
* Set a static IP address on your Pi _(good option if your Raspberry Pi is going to be always connected to the same equipment)_: [this tutorial from The Pi Hut](https://thepihut.com/blogs/raspberry-pi-tutorials/how-to-give-your-raspberry-pi-a-static-ip-address-update)
* An attached LCD display to show your current IP address _(a little maker-y, and pretty cool)_: [example from PiMyLifeUp](https://pimylifeup.com/raspberry-pi-lcd-16x2/)

Once you know your IP address, you can access the Companion Admin User Interface on port 8000 of that IP address (i.e. http://192.168.1.3:8000).


# Complete Changes from Base Raspbian
These notes are not a "to-do" list, but are provided for transparency so users can see what changes have been made to the default Raspbian environment to make CompanionPi work. Enterprising users are free to make additional changes in their own environments, and having this informational baseline is always helpful in doing so.

## CompanionPi Headless
* Changed default hostname from `raspberrypi` to `CompanionPi`  
_(raspi-config > 2 Network Options > N1 Hostname)_
* Changed Locale to en_US.UTF-8  
_(raspi-config > 4 Localisation Options > I1 Change Locale)_
* Changed Timezone to America/Chicago  
_(raspi-config > 4 Localisation Options > I2 Change Timezone)_
* Changed Keyboard Layout to Generic Logitech/US English  
_(raspi-config > 4 Localisation Options > I3 Change Keyboard Layout)_
* Enabled SSH  
_(raspi-config > 5 Interfacing Options > P2 SSH)_
* ~~Added new user `companion`, with default password `bitfocus` and home directory `/home/companion`~~
* ~~Using the new `companion` user, Companion was installed via the standard instructions for the Raspberry Pi, substituting the appropriate home directory where necessary: [[Manual Install on Raspberry Pi]]~~
* Companion was installed per the standard instructions ([[Manual Install on Raspberry Pi]]) with one change:  
**Companion is installed at `/usr/local/src` instead of `/home/pi`.**
  * This was done primarily so individual users have the option to disable/remove the default `pi` user as a security measure.  
  * This directory is also, historically, the "preferred" location for source code applications.
* The standard `headless.js` is replaced with a modified version that will bind to IP address `0.0.0.0` at boot instead of requiring an active network connection.
  * This allows for the Raspberry Pi to be booted up _and then_ connected to a network, such as a wireless netork, and have Companion still launch and available as soon as the network connection is up.
  * The code for this modified `headless.js` (named `headless_ip.js`) can be found here [Companion Issue #538](https://github.com/bitfocus/companion/issues/538#issuecomment-472007173)
* Companion is configured to auto-start at boot using a systemd unit file.
  * The code and documentation for this is here: [[Auto Start Companion on Linux Using systemd]]
* Two executables have been added to `/usr/local/bin` to make two functions easier. These commands can be run from any directory by any logged-in user.
  * `companion-license` - outputs the contents of the full LICENSE.md file
  * `companion-update` - simplifies the process of updating Companion
    * If not run as `sudo companion-update`, the user will be automatically prompted for their `sudo` password
* A custom Message of the Day has been added to be displayed in the terminal when users log in either locally or via SSH.  
```This Raspberry Pi is running the Bitfocus Companion software, version 1.4.0.  
The source code repository for this project can be found here:  
https://github.com/bitfocus/companion

Full licensing information for Bitfocus Commpanion can be found at
/usr/local/src/LICENSE.md or https://github.com/bitfocus/companion/blob/master/LICENSE.md  
or by running 'companion-license' in the terminal

Any bugs, issues, or feature requests for the Companion software should be reported on the project's GitHub:  
https://github.com/bitfocus/companion/issues

Companion should auto-start on this computer as soon as a viable network connection is detected.  
You can access the Companion Admin User Interface on port 8000 of this computer's IP address  
(i.e. http://192.1.1.2:8000).
```

## CompanionPi w/ Attached Display (Headed)
_Coming soon!_