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
    private welcomeText! : Phaser.GameObjects.Text;
    private btnIsLocked! : boolean;
    private btnNFTIsLocked! : boolean;
    
    constructor() {
      super('welcome')
    }

    init() {
      this.btnIsLocked = false;
      this.btnNFTIsLocked = true;
    }

    preload() {
        this.load.image(SPLASHSCREEN_KEY, 'assets/Splashscreen.png');
        this.load.image(BUTTON_NORMAL, 'assets/Button-normal.png');
        this.load.image(BUTTON_HOVER, 'assets/Button-hover.png');
        this.load.image(BUTTON_CLICKED, 'assets/Button-click.png');
        this.load.image(BUTTON_LOCKED, 'assets/Button-locked.png');
    }
  
    create() {
      this.background = this.add.image(605, 800, SPLASHSCREEN_KEY).setOrigin(0,1);
      const style = { fontSize: '32px', fill: '#fff' }
      this.welcomeText = this.add.text(50, 300, 'You are a broke knight.\n\rNo sword to defend yourself.\n\rGo collect some wealth.\n\rAnd restore your dignity.\n\rMaybe increase your might\n\rwith one or more NFTs?', style);

      this.buttonPlay = new CustomButton(this, 100, 100, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, this.btnIsLocked, 'PLAY', { fontSize: '48px', fill: '#000' }).setScale(0.4);
      this.add.existing(this.buttonPlay);
      if (!this.btnIsLocked) {
        this.buttonPlay.setInteractive()
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('game-scene');
          })
      }

      this.buttonLoadNFT = new CustomButton(this, 300, 100, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, this.btnNFTIsLocked, 'NFTs', { fontSize: '48px', fill: '#000' }).setScale(0.4);
      this.add.existing(this.buttonLoadNFT);
      if (!this.btnNFTIsLocked) {
        this.buttonLoadNFT.setInteractive()
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.scene.start('load-nfts');
          })
      } else {
        this.buttonLoadNFT.setInteractive()
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            alert('This functionality will be implemented in the near future.');
          })

      }
    }
  }