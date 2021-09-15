import CustomButton from "./CustomButton";

const SPLASHSCREEN_KEY = 'splashscreen';
const BUTTON_NORMAL = 'buttonNormal';
const BUTTON_HOVER = 'buttonHover';
const BUTTON_CLICKED = 'buttonClicked';
const BUTTON_LOCKED = 'buttonLocked';

export default class Scene1 extends Phaser.Scene {
    private background! : Phaser.GameObjects.Image;
    private buttonPlay! : Phaser.GameObjects.Container;
    private buttonLoadNFT! : Phaser.GameObjects.Container;
    private buttonRules! : Phaser.GameObjects.Container;
    private welcomeText! : Phaser.GameObjects.Text;
    private btnIsLocked! : boolean;
    private btnNFTIsLocked! : boolean;
    private moralisUser!: string;
    private bExtraJump: boolean = false; // false;
    private bExtraProtect: boolean = false; // false
    private bExtraSpeed: boolean = false; // false;
    private bExtraHealthPotions: boolean = false; // false;
    private bExtraSword: boolean = false; // false
    
    constructor() {
      super('welcome')
    }

    init(data) {
      console.log('[WELCOME] data: ', data);
      this.btnIsLocked = false;
      this.btnNFTIsLocked = false;
      this.moralisUser = data.moralisUser;
      this.bExtraJump = (data.bExtraJump != undefined) ? data.bExtraJump : this.bExtraJump;
      this.bExtraProtect = (data.bExtraProtect != undefined) ? data.bExtraProtect : this.bExtraProtect;
      this.bExtraSpeed = (data.bExtraSpeed != undefined) ? data.bExtraSpeed : this.bExtraSpeed;
      this.bExtraHealthPotions = (data.bExtraHealthPotions != undefined) ? data.bExtraHealthPotions : this.bExtraHealthPotions;
      this.bExtraSword = (data.bExtraSword != undefined) ? data.bExtraSword : this.bExtraSword;
    }

    preload() {
        this.load.image(SPLASHSCREEN_KEY, 'assets/Splashscreen.png');
        this.load.image(BUTTON_NORMAL, 'assets/Button-normal.png');
        this.load.image(BUTTON_HOVER, 'assets/Button-hover.png');
        this.load.image(BUTTON_CLICKED, 'assets/Button-click.png');
        this.load.image(BUTTON_LOCKED, 'assets/Button-locked.png');
    }
  
    create() {
      this.sound.stopAll(); // Stops all sounds from previous screens
      this.background = this.add.image(633, 800, SPLASHSCREEN_KEY).setScale(0.625).setOrigin(0,1);
      const style = { fontSize: '32px', fill: '#fff' }
      this.welcomeText = this.add.text(50, 300, 'You are a broke knight.\n\rNo sword to defend yourself.\n\rGo collect some wealth.\n\rAnd restore your dignity.\n\rMaybe increase your might\n\rwith one or more NFTs?', style);

      const styleSmall = { fontSize: '16px', fill: '#fff' };
      this.add.text (50, 680, 'Left: <LEFT>\nRight: <RIGHT>\nJump: <UP>\nToggle music: <M>\nPause game: <SPACE>\nEnd game:<ESC>');

      this.buttonPlay = new CustomButton(this, 85, 65, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, this.btnIsLocked, 'PLAY', { fontSize: '48px', fill: '#000' }).setScale(0.4);
      this.add.existing(this.buttonPlay);
      if (!this.btnIsLocked) {
        this.buttonPlay.setInteractive()
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('game-scene',  
              { moralisUser: this.moralisUser, 
                bExtraJump: this.bExtraJump,
                bExtraProtect: this.bExtraProtect,
                bExtraSpeed: this.bExtraSpeed,
                bExtraHealthPotions: this.bExtraHealthPotions,
                bExtraSword: this.bExtraSword
              }
            );
          })
      }

      this.buttonRules = new CustomButton(this, 85, 150, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, false, 'RULES', { fontSize: '48px', fill: '#000' }).setScale(0.4);
      this.add.existing(this.buttonRules);
      
      this.buttonRules.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
          this.scene.start('rules',  
            { moralisUser: this.moralisUser, 
              bExtraJump: this.bExtraJump,
              bExtraProtect: this.bExtraProtect,
              bExtraSpeed: this.bExtraSpeed,
              bExtraHealthPotions: this.bExtraHealthPotions,
              bExtraSword: this.bExtraSword
            }
          );
        })
      

      this.buttonLoadNFT = new CustomButton(this, 85, 235, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, this.btnNFTIsLocked, 'NFTs/Perks', { fontSize: '48px', fill: '#000' }).setScale(0.4);
      this.add.existing(this.buttonLoadNFT);
      if (!this.btnNFTIsLocked) {
        this.buttonLoadNFT.setInteractive()
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
         //   window.document.getElementById('fetch-nfts')?.click();
            this.scene.start('set-nfts-scene', 
            { moralisUser: this.moralisUser, 
              bExtraJump: this.bExtraJump,
              bExtraProtect: this.bExtraProtect,
              bExtraSpeed: this.bExtraSpeed,
              bExtraHealthPotions: this.bExtraHealthPotions,
              bExtraSword: this.bExtraSword
            }
          );
/*            setTimeout( () => {
             this.NFTstring = window.document.getElementById('nft-info').value;
             if (this.NFTstring) {
               this.scene.start('set-nfts-scene', { NFTstring: this.NFTstring});
             }
           }, 10000); */

          })
      }
    }
  }
