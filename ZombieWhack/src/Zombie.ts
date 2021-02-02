export default class Zombie {

    // counts number of clicks
    private _click:number;

    private sprite:createjs.Sprite;
    private whack:createjs.Sprite;
    private spritesheet:createjs.SpriteSheet;
    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, spriteSheet:createjs.SpriteSheet)
    {
        this._click = 0;
        this.sprite = new createjs.Sprite(spriteSheet);
        this.stage = stage;
        this.spritesheet = spriteSheet;

        this.sprite.gotoAndStop("spritesheets/ZombieAlive");
        this.sprite.x = 400;
        this.sprite.y = 400;

        this.sprite.on("click",this.onClick,this);

        stage.addChild(this.sprite);
    }

    private onClick(e:createjs.Event):void
    {
        // uptick counter
        this._click++

        // gathers location of mouseclick
        let mouseX:number = this.stage.mouseX;
        let mouseY:number = this.stage.mouseY;

        this.whack =  new createjs.Sprite(this.spritesheet);
        this.whack.gotoAndStop("spritesheets/Whack");
        
        // runs dead animation and removes listener
        if(this._click >= 4)
        {
            e.remove();

            this.whack.x = mouseX;
            this.whack.y = mouseY;
            this.stage.addChild(this.whack);

            createjs.Tween.get(this.whack, {useTicks:true}).to({alpha:0}, 10).call(() => {
                this.stage.removeChild(this.whack);
            });

            this.sprite.gotoAndPlay("spritesheets/ZombieDead")
            this.sprite.on("animationend",(e:createjs.Event) => {
            this.sprite.stop()});
        }
        else
        {
            // whacks zombie and increases damage
            this.whack.x = mouseX;
            this.whack.y = mouseY;
            this.stage.addChild(this.whack);

            createjs.Tween.get(this.whack, {useTicks:true}).to({alpha:0}, 10).call(() => {
                this.stage.removeChild(this.whack);
            });

            // progresses stages of damage
            if(this._click == 1)
            {
                this.sprite.gotoAndStop("spritesheets/ZombieInjured");
            }
            else if (this._click == 2)
            {
                this.sprite.gotoAndStop("spritesheets/ZombieHurt");
            }
            else if (this._click== 3)
            {
                this.sprite.gotoAndStop("spritesheets/ZombieNearDeath");
            }
        }
    }
}