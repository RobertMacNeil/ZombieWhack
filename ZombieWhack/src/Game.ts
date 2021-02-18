// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE } from "./Constants";
import Zombie from "./Zombie";

// game variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
// spritesheet object
let spriteSheet:createjs.SpriteSheet;

let background:createjs.Sprite;
let zombie:Zombie;

// spritesheet data object - UPDATE THIS WITH JSON DATA FROM TEXTUREPACKER
let data:object = {

    "images": [
        "lib/spritesheets/Assets.png"
    ],
    
    "framerate": 30,
    "frames": [
        [1, 1, 306, 143, 0, 151, -57],
        [1, 1, 306, 143, 0, 151, -57],
        [309, 1, 306, 143, 0, 151, -57],
        [309, 1, 306, 143, 0, 151, -57],
        [617, 1, 306, 145, 0, 151, -55],
        [617, 1, 306, 145, 0, 151, -55],
        [925, 1, 145, 148, 0, 73, 75],
        [1072, 1, 306, 171, 0, 151, -29],
        [1072, 1, 306, 171, 0, 151, -29],
        [1380, 1, 306, 189, 0, 151, -11],
        [1380, 1, 306, 189, 0, 151, -11],
        [1688, 1, 306, 255, 0, 151, 55],
        [1688, 1, 306, 255, 0, 151, 55],
        [1, 258, 306, 309, 0, 151, 109],
        [1, 258, 306, 309, 0, 151, 109],
        [309, 258, 276, 343, 0, 132, 143],
        [309, 258, 276, 343, 0, 132, 143],
        [587, 258, 276, 365, 0, 132, 165],
        [587, 258, 276, 365, 0, 132, 165],
        [865, 258, 276, 375, 0, 132, 175],
        [865, 258, 276, 375, 0, 132, 175],
        [1143, 258, 276, 383, 0, 132, 183],
        [1143, 258, 276, 383, 0, 132, 183],
        [1421, 258, 276, 395, 0, 132, 195],
        [1699, 258, 276, 395, 0, 132, 195],
        [1699, 258, 276, 395, 0, 132, 195],
        [1, 655, 276, 395, 0, 132, 195],
        [279, 655, 276, 395, 0, 132, 195],
        [557, 655, 276, 395, 0, 132, 195],
        [835, 655, 600, 600, 0, 0, 0]
    ],
    
    "animations": {
        "spritesheets/ZombieDead": { "frames": [24, 25, 21, 22, 19, 20, 17, 18, 16, 15, 13, 14, 11, 12, 9, 10, 7, 8, 4, 5, 0, 1, 2, 3] },
        "spritesheets/Whack": { "frames": [6] },
        "spritesheets/ZombieAlive": { "frames": [23] },
        "spritesheets/ZombieHurt": { "frames": [26] },
        "spritesheets/ZombieInjured": { "frames": [27] },
        "spritesheets/ZombieNearDeath": { "frames": [28] },
        "spritesheets/Background": { "frames": [29] }
    },
    
    "texturepacker": [
            "SmartUpdateHash: $TexturePacker:SmartUpdate:efcc2b8c18955fdb7caca61344ca7cfe:80bee01c61cf8fcd8034940ba44f7260:343a2cbedbd3a58ea401ebc8df9c4834$",
            "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
    ]
    }
    
// --------------------------------------------------- event handlers
function onReady(e:createjs.Event):void {
    console.log(">> spritesheet loaded – ready to add sprites to game");

    // construct sprites and add to the stage here
    background = new createjs.Sprite(spriteSheet);
    background.gotoAndStop("spritesheets/Background");
    stage.addChild(background);
    
    zombie = new Zombie(stage,spriteSheet);

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
}

function onTick(e:createjs.Event):void {
    // TESTING FPS
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());

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