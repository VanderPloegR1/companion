Rather than using rc.local scripting, modern Linux distributions can use `systemd` to manage start-up scripting. The new CompanionPi project uses systemd to auto-start Companion at boot. If you are unfamiliar with systemd, this Wikipidia article is a good primer: https://en.wikipedia.org/wiki/Systemd.

Because the commands used to start Companion differ between headless and headed operation, the unit files used to manage the service differ between headless and headed operation, as well.

This information is provided as a reference for those choosing to manually install Companion on a Linux-powered computer (especially a Raspberry Pi 4). For those using the CompanionPi pre-built images, the appropriate file is already included in the image.

# Headless and Wireless
If you are using Companion in headless mode and you intend to bind the Admin User Interface to a wireless network connection, you will need to make 1 minor modification to the headless `companion.service` unit file. On the line where you see `.../headless.js eth0` you need to change `eth0` to your wireless connection's designation. For Raspberry Pi 4 users, this is mostly likely `wlan0`.

# Headless Unit File
File name: /etc/systemd/system/companion.service
```bash
#
# This file is part of the Companion project
# Copyright (c) 2018 Bitfocus AS
# Authors: William Viker <william@bitfocus.io>, Håkon Nessjøen <haakon@bitfocus.io>
#
# This program is free software.
# You should have received a copy of the MIT licence as well as the Bitfocus
# Individual Contributor License Agreement for companion along with
# this program.
#
# You can be released from the requirements of the license by purchasing
# a commercial license. Buying such a license is mandatory as soon as you
# develop commercial activities involving the Companion software without
# disclosing the source code of your own applications.
#

[Unit]
Description=Companion v1.4.0
Requires=network.target
After=network.target

[Service]
Type=simple
ExecStart=/home/companion/companion/headless.js eth0
ExecReload=/home/companion/companion/headless.js eth0
KillMode=process
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

# Headless Unit File
File name: /etc/systemd/system/companion.service
_(this is still being tested but will be posted when available)_