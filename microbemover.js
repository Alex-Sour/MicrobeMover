/*
MicrobeMover is a free library which recreates the micro:bit functions in a regular HTML page.
https://github.com/Alex-Sour/MicrobeMover
License: MIT
*/

var microbeContainer;
var microbe; // Microbe will be a div on the page containing a 5x5 matrix of pixels that can be on (red) or off (black)
microbeContainer = document.createElement("div");
// Microbe is a div child of microbeContainer
microbe = document.createElement("div");
// Make microbe a child of microbeContainer
microbeContainer.appendChild(microbe);

console.log('Starting MicrobeMover...');
console.log('microbe is ' + microbe);

// Inject CSS into the page
var css = document.createElement("style");
css.innerHTML = ".microbePixel {width: 20px; height: 20px; border-radius:50%; padding:0px; margin:1px; background-color:#000000; transition: 0.5s;}\n.microbePixelOn { background-color: #ff0000; }";
// Width is 800px, height is 500px
// Each pixel is 10px wide and 10px high by default

var width = 800;
var height = 500;

// Set microbe background color to grey
microbe.style.backgroundColor = "#111111";
// Set microbe display to grid and grid-template-columns to auto auto auto
microbe.style.display = "grid";
microbe.style.gridTemplateColumns = "auto auto auto auto auto";
microbe.style.height = "110px";
microbe.style.width = "110px";

microbeContainer.style.height = "120px";
microbeContainer.style.width = "150px";
microbeContainer.style.outline = "2px #000000 solid";
microbeContainer.style.borderRadius = "8px";
microbeContainer.style.backgroundColor = "#888888";
microbe.style.top = "50%";
microbe.style.left = "50%";
microbe.style.transform = "translate(-50%, -50%)";
microbeContainer.style.position = "relative";
microbe.style.position = "absolute";
microbe.style.margin = "0";


var pixelHTML = `<div class="microbePixel"></div>`;
// We set a pixel to red (#ff0000) if the led is on, and black (#000000) if it is off

// Add a 5x5 matrix to the microbe
microbe.innerHTML = "";
for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
        microbe.innerHTML += pixelHTML;
    }
}

var pixels = microbe.getElementsByClassName("microbePixel");

// Add private functions to set the state of each pixel

function setPixelState(x, y, state) {
    var pixel = microbe.getElementsByClassName("microbePixel")[x + y * 5];
    if (state) {
        // Add microbePixelOn class if it isn't already there
        if (!pixel.classList.contains("microbePixelOn")) {
            pixel.classList.add("microbePixelOn");
        }
    } else {
        // Remove microbePixelOn class if it exists
        if (pixel.classList.contains("microbePixelOn")) {
            pixel.classList.remove("microbePixelOn");
        }
    }
}

document.body.appendChild(microbeContainer);
document.head.appendChild(css);

var basic = {};

basic.showLeds = function (leds) {
    // Leds is a string, example:
    /*
    # . . . .
    . # . . .
    . . # . .
    . . . # .
    . . . . #
    */
    // Will draw a 5x5 matrix with a line going from top-left to bottom-right

    // The above example turns into the following array:
    // [[true, false, false, false, false], [false, true, false, false, false], [false, false, true, false, false], [false, false, false, true, false], [false, false, false, false, true]]

    // Remove empty lines and trim all lines
    leds = leds.split("\n").filter(function (line) {
        return line.trim().length > 0;
    }).map(function (line) {
        return line.trim();
    }).join("\n");

    // Turn leds string into an array of booleans
    var ledsArray = [];
    for (var i = 0; i < 5; i++) {
        console.log('i is ' + i);
        ledsArray[i] = [];
        for (let j = 0; j < 5; j++) {
            console.log('ledsArray[' + i + '][' + j + '] = ' + (leds.replaceAll('\n', ' ').split(" ")[i + (j * 5)] === "#") + ' = ' + '(' + (leds.replaceAll('\n', ' ').split(" ")[i + (j * 5)]) + ' == "#")');
            ledsArray[i][j] = leds.replaceAll('\n', ' ').split(" ")[i + (j * 5)] === "#";
        }
    }

    // Remove first array element
    //ledsArray.shift();

    //console.log(ledsArray);

    console.log(leds.replaceAll('\n', ' ').split(" "));
    // Remove first array element

    // Set the state of each pixel
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            setPixelState(i, j, ledsArray[i][j]);
        }
    }
}