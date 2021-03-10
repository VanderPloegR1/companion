# Read First

Upgrading Companion v1.4 to v2.0 is a one-way operation. There is no "rollback" functionality. If you do this, and later decide you want to roll back to v1.4, you will have to start over with a fresh install of v1.4.

# Upgrade Steps

From the command line, run these commands:

```bash
cd /path/to/companion
git checkout master
yarn update
sudo reboot
```

# Upgrading CompanionPi

## Manual Upgrade

Because Companion on the CompanionPi image is installed and run from `/usr/local/src`, we have to run the upgrade commands as sudo.

```bash
cd /path/to/companion
sudo git checkout master
sudo yarn update
sudo reboot
```

## Scripted Upgrade

If you are using CompanionPi released after 2020-01-10 (filename companionpi-2020-01-10), there is a custom binary that's been introduced to automate the upgrade process:

```bash
sudo companion-upgrade
```
