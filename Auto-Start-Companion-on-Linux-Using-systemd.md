Rather than using rc.local scripting, modern Linux distributions can use `systemd` to manage start-up scripting. The new CompanionPi project uses systemd to auto-start Companion at boot. If you are unfamiliar with systemd, this Wikipidia article is a good primer: https://en.wikipedia.org/wiki/Systemd.

Because the commands used to start Companion differ between headless and headed operation, the unit files used to manage the service differ between headless and headed operation, as well.

This information is provided as a reference for those choosing to manually install Companion on a Linux-powered computer (especially a Raspberry Pi 4). For those using the CompanionPi pre-built images, the appropriate file is already included in the image.

# Headless and Wireless
If you are using Companion in headless mode and you intend to bind the Admin User Interface to a wireless network connection, you will need to make 1 minor modification to the headless `companion.service` unit file. On the line where you see `.../headless.js eth0` you need to change `eth0` to your wireless connection's designation. For Raspberry Pi 4 users, this is mostly likely `wlan0`.

There had been a slide modification to the companion.service file, we will connect to a modified headless.js (headless_ip.js which is included in the source files);

# Headless Unit File
File name: /etc/systemd/system/companion.service (create: `sudo nano /etc/systemd/system/companion.service` and copy paste below, then save)
```
[Unit]
Description=Bitfocus Companion (v1.4.0)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=/usr/local/src/companion
ExecStart=/usr/local/src/companion/headless_ip.js 0.0.0.0
Restart=on-failure
KillSignal=SIGINT
TimeoutStopSec=60

[Install]
WantedBy=multi-user.target
```
In some cases the headless_ip.js file doesn't have the right rights;
`chmod a+x /usr/local/src/companion/headless_ip.js`

Don't forget to enable the service with `systemctl enable companion.service` and reboot `sudo reboot`

# Headed Unit File
_(for deployments with an attached display and keyboard/mouse)_  
File name: /etc/systemd/system/companion.service  
> This is still being tested but will be posted when available