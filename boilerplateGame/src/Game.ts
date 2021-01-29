// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE } from "./Constants";

// game variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
// spritesheet object
let spriteSheet:createjs.SpriteSheet;
// spritesheet data object - UPDATE THIS WITH JSON DATA FROM TEXTUREPACKER
let data:object = {}
    
// --------------------------------------------------- event handlers
function onReady(e:createjs.Event):void {
    console.log(">> spritesheet loaded – ready to add sprites to game");

    // construct sprites and add to the stage here
    // ...
    
    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
}

function onTick(e:createjs.Event):void {
    // TESTING FPS
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());

    // this is the game loop
    // ...

    // update the stage!
    stage.update();
}

// --------------------------------------------------- main method
function main():void {
    // get reference to canvas
    canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    // set canvas width and height - this will be the stage size
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;    

    // create stage object
    stage = new createjs.StageGL(canvas, { antialias: true });

    // construct Spritesheet object using data - will preload the assets.png
    spriteSheet = new createjs.SpriteSheet(data);
    if (spriteSheet.complete == false) spriteSheet.on("complete", onReady, this, true);
    else onReady(null);
}

main();