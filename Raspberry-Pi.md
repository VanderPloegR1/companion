1. [Recommended Hardware](https://github.com/bitfocus/companion/wiki/Raspberry-Pi#recommended-hardware)
2. [Ready-to-go CompanionPi Images](https://github.com/bitfocus/companion/wiki/Raspberry-Pi#companionpi-images)
3. [Manual Installation](https://github.com/bitfocus/companion/wiki/Raspberry-Pi#manual-installation)
4. [Updating Companion](https://github.com/bitfocus/companion/wiki/Raspberry-Pi#updating-companion)

# Recommended Hardware
_And Other Suggestions_
> **Please note:** Companion can be installed on a Raspberry Pi 2B, 3B, or 3B+, but **it is not recommended or supported**. Should you choose to do so, you do so at your own risk and with the understanding that the community will not be able to help you if something goes wrong.

The Raspberry Pi 4 is the first Raspberry Pi SBC (single board computer) that is able to stably run the Companion software. The 2GB variant of the Raspberry Pi 4 is the minimum recommended board. The  4GB variant is the preferred option. As stated above, any Raspberry Pi SBC prior to the 4 is unsupported and is used at your own risk.

If you are installing Companion from scratch, make sure you've got your system updated with the latest eeprom/firmware updates ([info here](https://www.raspberrypi.org/forums/viewtopic.php?t=255001)). A recent update (late October 2019) combines the update mechanisms for both the SPI EEPROM and the VLI USB controller chip. Installing the latest updates will (in the future) open up the ability to boot your Raspberry Pi from a network-connected device or from an external USB storage device, and also updates the VLI firmware to reduce power consumption and bring running temperatures down by up to 3-4 °C.

## Securing your Raspberry Pi
If you haven't already, it's also recommended to change the default password of the `pi` user. Doing this will help secure your system from unauthorized access. This, and other Raspberry Pi security best practice recommendations can be found [here](https://www.raspberrypi.org/documentation/configuration/security.md).

# CompanionPi Images
Coming Soon!

# Manual Installation
Instructions for installing Companion manually on a Raspberry Pi 4 2GB/4GB can be found here: [[Manual Install on Raspberry Pi]]

# Updating Companion
## Companion v1.3 & v1.4
Run the following from the root of the companion folder:
```bash
git pull
./tools/update.sh
sudo reboot
```
## Companion v2.0-alpha
Run the following from the root of the companion folder:
```bash
git pull
yarn update
sudo reboot
```