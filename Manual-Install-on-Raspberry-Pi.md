These instructions are for installing Companion on a Raspberry Pi 4. Instructions differ slightly between versions 1.4 (stable) and 2.0 (alpha). Instructions here cover both.
> **Please note:** Companion can be installed on a Raspberry Pi 2B, 3B, or 3B+, **but it is not recommended or supported**. Should you choose to do so, you do so at your own risk and with the understanding that the community will not be able to help you if something goes wrong.

Companion can be run in 2 different modes on the Raspberry Pi: Headless (no display attached) and Headed (display attached). The installation instructions are the same up to the point of building the code to run. In the instructions below you will note that the instructions diverge near the end to address the specific needs of headless vs headed installation and operation.

# Common Installation Steps
Before starting the installation process, you'll need to get your Raspberry Pi set up and configured. If you intend to run your Raspberry Pi headless (no display attached), you'll need to make sure you've got SSH access enabled (`sudo raspi-config` on the Raspberry Pi terminal to enable) before switching to headless mode. These instructions assume your Raspberry Pi is fully configured and ready to go.

These steps assume you're starting from the home directory of the current user. If not, your mileage may vary with these instructions. It is recommended to move to the home directory (`cd ~`) before starting:

1. Make sure apt and all installed packages are up-to-date.
```bash
sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get autoclean -y && sudo apt-get autoremove
```

2. Install some required packages.
```bash
sudo apt-get install libgusb-dev npm nodejs git build-essential cmake libudev-dev libusb-1.0-0-dev -y
```
_If you haven't already done so, make sure to install the latest version of the eeprom update tool to ensure you've got the latest firmware for the USB controller chip:_
```sudo apt install rpi-eeprom rpi-eeprom-images```
_You'll need to reboot immediately_ (```sudo reboot```) _after updating this package to finalize the installation and firmware update._

3. Because it is never recommended to run things on Linux as the root user, you will need to add a udev rule.
```bash
sudo nano /etc/udev/rules.d/50-companion.rules
```
Add these lines to that new file
```
SUBSYSTEM=="input", GROUP="input", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0060", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0060", MODE:="666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f40", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f40", MODE:="666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0063", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="0063", MODE:="666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="006c", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw", ATTRS{idVendor}=="0fd9", ATTRS{idProduct}=="006c", MODE:="666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f41", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw", ATTRS{idVendor}=="ffff", ATTRS{idProduct}=="1f41", MODE:="666", GROUP="plugdev"
```

4. Either reboot your Raspberry Pi (`sudo reboot`) or reload the udev rules `sudo udevadm control --reload-rules`

5. Install Node.js tools
```bash
sudo npm install n -g
sudo n 8.12.0
```
*double-check https://github.com/bitfocus/companion/blob/master/DEVELOPER.md to confirm the current required node.js version*

6. Install yarn and update your PATH variable
```bash
sudo npm install yarn -g
export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
```

7. Now we're ready to clone the repository and build. These commands will clone the respository, move into the `companion` directory, update all dependencies and modules, and create a fresh build.
> It's important to note which version of Companion you are hoping to install: v1.4 (stable) or v2.0-alpha (not guaranteed to be stable). v2.0-alpha is not ready for production environments at the time of this writing (November 10, 2019), but is available for testing. The other important distinction to note is that the build commands are different between the two versions.

## Version 1.4 (stable)
```bash
git clone https://github.com/bitfocus/companion.git
cd companion
git checkout backport
./tools/update.sh
./tools/build_writefile.sh
```
## Version 2.0 (alpha)
```bash
git clone https://github.com/bitfocus/companion.git
cd companion
yarn update
./tools/build_writefile.sh
```

This is the point where our instructions will diverge based on whether you intend to run headless, with a display attached or a build to be copied to another device.

# Headless Installation & Operation
_(no attached display)_

8. The last step for headless operation is to ensure Companion will start at console boot. We currently do this via `rc.local`. You will first need to know the designation of the network interface you wish to have Companion run on (i.e. `eth0` or `wlan0`)
```bash
sudo nano /etc/rc.local
```
Add this line before the `exit 0` line, making sure to change the interface designation if appropriate for your setup:
```bash
/home/pi/companion/headless.js eth0
```

9. Reboot your Raspberry Pi (`sudo reboot`), wait a couple minutes, and you should be able to access the Companion UI on port 8000 of your Raspberry Pi's IP address (i.e. `http://192.168.1.2:8000`)

# Headed Installation & Operation
_(display attached to Raspberry Pi)_

8. At this point you are ready to confirm your fresh build of Companion functions.
  * v1.4.0 stable
    * `npm run start` **or** `npm --prefix /home/pi/companion start`
  * v2.0-alpha
    * `yarn prod` will start Companion silently, with no debugging
      * full explicit command: `/usr/local/bin/yarn --cwd /home/pi/companion prod`
    * `yarn dev` will start Companion with debugging fuctionality
      * full explicit command: `/usr/local/bin/yarn --cwd /home/pi/companion dev`

9. Click the "Companion" icon in the system tray to trigger the application window and set your desired network interface and port number, then click "Change".
> Note the visual difference between the v1.3 and v2.0 splash screens. If you are seeing the wrong splash, you'll need to back up to step 7 in the Common Steps to pull the correct version for building.

| v1.4 Splash Screen | v2.0 Splash Screen |
| --- | --- |
| ![Companion v1.4 Splash Screen](https://github.com/jarodwsams/companion/blob/master/documentation/images/companion-splash-1.3.png?raw=true) | ![Companion v2.0 Splash Screen](https://github.com/jarodwsams/companion/blob/master/documentation/images/companion-splash-2.0.png?raw=true) |

10. Click "Launch GUI" to confirm Companion is running. The default internet browser should open a new tab to the IP:Port set in the configuration splash screen.

## Headed Autostart
If you would like to have Companion load automatically at startup, follow these steps:
1. Create a directory named `autostart` in your home .config directory: `mkdir ~/.config/autostart`
2. Create a new companion.desktop file (`sudo nano ~/.config/autostart/companion.desktop`) and copy the following lines  

| Version 1.4.0 (stable) |
| -------------------- |
| <div class="highlight highlight-source-shell"><pre>[Desktop Entry]<br>Type=Application<br>Name=Companion<br>Exec=npm --prefix /home/pi/companion start</pre></div> |

| Version 2.0 (alpha) |
| -------------------- |
| <div class="highlight highlight-source-shell"><pre>[Desktop Entry]<br>Type=Application<br>Name=Companion<br>Exec=/usr/local/bin/yarn --cwd /home/pi/companion prod</pre></div> |

> You will need to replace the "prod" in the v2.0-alpha file with dev if you intend to launch Companion with debugging.

3. Reboot, and confirm Companion starts at system start-up

# Build for another device
_(distributable build)_

Note: This will produce a Headed build. There is not currently a method for creating a distributable build for headless operation.

8. Run a Raspberry Pi build `yarn Raspberry Pidist` or `yarn lindist` for desktop linux

9. The build can be found as a tar.gz under electron-output

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