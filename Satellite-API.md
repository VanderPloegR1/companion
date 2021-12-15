It is possible to remotely connect a 'streamdeck' to companion so that it appears as its own device and follows the paging model. This is different to how the OSC/TCP/UDP servers operate.

This page documents the protocol. The intention is to only ever add non-breaking functionality to this API, and to keep this document updated with new functionality as it is added.

## API Spec

The server by default runs on port 16622, but this may become configurable in the future. You should make sure to support alternate ports to allow for future compatibility as well as firewalls or router port forwarding.  
Each message is presented as a line, with a `\n` or `\r\n` terminator.  
Messages follow the general format of `COMMAND-NAME ARG1=VAL1 ARG2=true ARG3="VAL3 with spaces"\n`. 
Key numbers are in the range of 0-31.  

Note: Boolean values can be represented as both true/false and 0/1

Upon connection you will receive `BEGIN CompanionVersion=2.2.0-d9008309-3449 ApiVersion=1.0.0` stating the build of companion you are connected to. The `CompanionVersion` field should not be relied on to be meaningful to your application, but can be presented as information to the user, or to aid debugging. You should use the `ApiVersion` field to check compatibility with companion. The number followers [semver](https://semver.org/) for versioning. We hope to keep breaking changes to a minimum, and will do so only when necessary. 

### Messages to send
Upon receiving an unknown command, the server will respond with the format `ERROR MESSAGE="Unknown command: SOMETHING"`  
Known commands will get either a success or error response like the following:
* `COMMAND-NAME ERROR MESSAGE="Some text here"\n`
* `COMMAND-NAME OK\n`
* `COMMAND-NAME OK ARG1=arg1\n`

#### Close connection
`QUIT`
Close the connection, removing all registered devices

#### Ping/pong
`PING payload`
Check the server is alive, with an arbitrary payload
Responds with `PONG payload`

#### Adding a satellite device
`ADD-DEVICE DEVICEID=00000 PRODUCT_NAME="Satellite Streamdeck"`
* `DEVICEID` should be a unique identifier for the hardware device. such as a serialnumber, or mac address.
* `PRODUCT_NAME` is the name of the product to show in the Surfaces table in the UI

Optional parameters:
* `KEYS_TOTAL` - number of keys the device has. Must be in the range 1-32 (default 32)
* `KEYS_PER_ROW` - number of keys per row. Must be in the range 1-8 (default 8)
* `BITMAPS` - true/false whether you want to be streamed bitmaps for display on the buttons (default true)
* `COLORS` - true/false whether you want to be streamed colors for display on the buttons (default false)
* `TEXT` - true/false whether you want to be streamed button text for display on the buttons (default false)

#### Removing a satellite device
`REMOVE-DEVICE DEVICEID=00000`
* `DEVICEID` the unique identifier used to add the device

#### Pressing a key
`KEY-PRESS DEVICEID=00000 KEY=0 PRESSED=true`
* `DEVICEID` the unique identifier used to add the device
* `KEY` number of the key which is pressed/released
* `PRESSED` true/false whether the key is pressed

### Messages to receive
No responses are expected to these unless stated below, and to do so will result in an error.

#### Ping/pong
`PING payload`
The server is checking you are still alive, with an arbitrary payload
You must respond with `PONG payload`

#### State change for key
`KEY-STATE DEVICEID=00000 KEY=0 BITMAP=abcabcabc COLOR=#00ff00`
* `DEVICEID` the unique identifier of the device
* `KEY` number of the key which the pixel buffer is for
* `TYPE` type of the key. (added in v1.1.0) Either `BUTTON`, `PAGEUP`, `PAGEDOWN` or `PAGENUM`

Optional parameters:
* `BITMAP` base64 encoded pixel data. Currently 72x72 pixels of 8bit RGB (this may be configurable in the future). This is only sent for devices which were added where `BITMAPS` was true
* `COLOR` hex encoded 8bit RGB color for the key. This is only sent for devices which were added where `COLORS` was true
* `TEXT` base64 encoded text as should be displayed on the key. This is only sent for devices which were added where `TEXT` was true

Note: expect more parameters to be added to this message over time. Some could increase the frequency of the message being received.

#### Reset all keys to black
`KEYS-CLEAR DEVICEID=00000`
* `DEVICEID` the unique identifier of the device

#### Change brightness
`BRIGHTNESS DEVICEID=00000 VALUE=100`
* `DEVICEID` the unique identifier of the device
* `VALUE` brightness number in range 0-100

