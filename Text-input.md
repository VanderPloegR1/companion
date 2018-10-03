## Line breaks
Text on the Buttons is automatically wrapped. When you want to force a line break add '\n' in the text input line.
## Variables
If a module offers variables (you can see this during instance creation or instance edit) you can use the value of this Variable in the button text.
To do so enter `$(instancelabel:variablelabel)`. Of course you have to replace instancelabel with the name you have given to the instance and variablelabel with the name of the variable you want to see.
You can also go fancier and use variables as parts of your variables like `$(myinstance:name_of_input_$(myinstance:input_on_output_$(myinstance:current_output)))`
## Unicode Characters
In the smallest font of 7pt only basic latin glyphs are available, but in all the larger fonts you can use a vast amount of glyphs. The number below a glyph is the decimal NCR representation of the UTF-16 hex. If you want to enter the glyph in your browser you usually need the hex representation. You can convert between the different formats on this website: [http://sceneonthe.net/unicode.htm](http://sceneonthe.net/unicode.htm) (enter the number in the Decimal NCR field leaded by '&#' and followed by ';' e.g. `&#10003;`)

Here are them all:
![All Companion glyphs](https://i.imgur.com/SsIE6OQ.png)