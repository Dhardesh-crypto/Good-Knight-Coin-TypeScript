import CustomButton from "./CustomButton";

const SPLASHSCREEN_KEY = 'rulesscreen';
const BUTTON_NORMAL = 'buttonNormal';
const BUTTON_HOVER = 'buttonHover';
const BUTTON_CLICKED = 'buttonClicked';
const BUTTON_LOCKED = 'buttonLocked';

export default class RulesScene extends Phaser.Scene {
    private background! : Phaser.GameObjects.Image;
    private buttonClose! : Phaser.GameObjects.Container;
    private moralisUser! : string;
    private bExtraJump: boolean = false;
    private bExtraProtect: boolean = false;
    private bExtraSpeed: boolean = false;
    private bExtraHealthPotions: boolean = false;
    private bExtraSword: boolean = false;
    
    constructor() {
      super('rules')
    }

    init(data) {
        console.log('[RULES] data: ', data);
        this.moralisUser = data.moralisUser;
        this.bExtraJump = data.bExtraJumo;
        this.bExtraProtect = data.bExtraProtect;
        this.bExtraSpeed = data.bExtraSpeed;
        this.bExtraHealthPotions = data.bExtraHealthPotions;
        this.bExtraSword = data.bExtraSword;
    }

    preload() {
        this.load.image(SPLASHSCREEN_KEY, 'assets/Good-Knight-Coin-Rules.png');
        this.load.image(BUTTON_NORMAL, 'assets/Button-normal.png');
        this.load.image(BUTTON_HOVER, 'assets/Button-hover.png');
        this.load.image(BUTTON_CLICKED, 'assets/Button-click.png');
        this.load.image(BUTTON_LOCKED, 'assets/Button-locked.png');
    }
  
    create() {
      this.cameras.main.fadeIn(1000,0,0,0);

      this.background = this.add.image(30, 750, SPLASHSCREEN_KEY).setScale(0.625).setOrigin(0,1);
      const style = { fontSize: '32px', fill: '#fff' }

      this.buttonClose = new CustomButton(this, 85, 65, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, false, 'BACK', { fontSize: '48px', fill: '#000' }).setScale(0.4);
      this.add.existing(this.buttonClose);
     
        this.buttonClose.setInteractive()
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.cameras.main.fadeOut(1000,0,0,0);

            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

              this.scene.start('welcome',   { moralisUser: this.moralisUser, 
                  bExtraJump: this.bExtraJump,
                  bExtraProtect: this.bExtraProtect,
                  bExtraSpeed: this.bExtraSpeed,
                  bExtraHealthPotions: this.bExtraHealthPotions,
                  bExtraSword: this.bExtraSword
                }
              );
            });
            
          });
     
    }
}