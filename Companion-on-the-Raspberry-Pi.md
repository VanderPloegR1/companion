# Companion on the Raspberry Pi - A Primer

> :information_source: **First and foremost:** Companion can be installed on a Raspberry Pi 2B, 3B, or 3B+, but **it is not recommended or supported**. Should you choose to do so, you do so at your own risk and with the understanding that the community will not be able to help you if something goes wrong.

The Raspberry Pi 4 is the first Raspberry Pi SBC (single board computer) that is able to stably run the Companion software. The 4GB variant of the Raspberry Pi 4 is the only recommended option. As stated above, any Raspberry Pi SBC prior to the 4 is unsupported and is used at your own risk.

If you are installing Companion from scratch, make sure you've got your system updated with the latest eeprom/firmware updates ([info here](https://www.raspberrypi.org/forums/viewtopic.php?t=255001)). A recent update (late October 2019) combines the update mechanisms for both the SPI EEPROM and the VLI USB controller chip. Installing the latest updates will (in the future) open up the ability to boot your Raspberry Pi from a network-connected device or from an external USB storage device, and also updates the VLI firmware to reduce power consumption and bring running temperatures down by up to 3-4 °C.

## Companion on pre-4 Raspberry Pi systems
* Raspberry Pi 2B
* Raspberry Pi 3B
* Raspberry Pi 3B+
* Raspberry Pi Zero
* Raspberry Pi Zero W

Initial Raspberry Pi community development and testing was performed on multiple variants (primarily the Raspberry Pi 3B/+).  While installation is possible, various operation / stability issues were identified that are resolved by using the upgraded Raspberry Pi 4 (4GB+ memory) system configuration.  This is most likely due to multiple (potentially interrelated) factors, including power output capability (e.g. to power a Stream Deck), power input requirements, OEM power supply capacity, Ethernet-no-longer-on-shared-USB-bus, maximum RAM, and of course CPU (as detailed in [Issue #313](/bitfocus/companion/issues/313)).  Accordingly, ongoing development efforts are focused on Raspberry Pi 4 systems.

# Securing your Raspberry Pi

If you haven't already, it is strongly recommended to change the default password of the `pi` user. If you're using the CompanionPi images, you should also change the default password of the `companion` user. Doing this will help secure your system from unauthorized access. There are other security-oriented best practices that are recommended, such as:

- making `sudo` require a password
- making sure you've got the latest security fixes
- improving SSH security

All of these recommended best practices can be found here, on the raspberrypi.org website: https://www.raspberrypi.org/documentation/configuration/security.md

# CompanionPi Images

You can find current CompanionPi documentation here: [[CompanionPi Documentation]]

The images are currently being developed and/or tested to confirm viability. As they are deemed viable for public consumption, download links will be made available.

# Manual Installation

Instructions for installing Companion manually on a Raspberry Pi 4 2GB/4GB can be found here: [[Manual Install on Raspberry Pi]]

# Updating Companion

Instructions for updating Companion on your Raspberry Pi can be found here: [[Updating Companion on your Raspberry Pi]]

# Upgrading Companion

If you have a Companion v1.4 build that you want to upgrade, you can find those instructions here: [[Upgrading Companion]]
