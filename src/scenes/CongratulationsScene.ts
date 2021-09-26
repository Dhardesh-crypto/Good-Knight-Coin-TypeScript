import CustomButton from "./CustomButton";

const BUTTON_NORMAL = 'buttonNormal';
const BUTTON_HOVER = 'buttonHover';
const BUTTON_CLICKED = 'buttonClicked';
const BUTTON_LOCKED = 'buttonLocked';
const CONGRATULATIONS = 'congratulations';

export default class CongratulationsScene extends Phaser.Scene {

  private buttonSubmit!: CustomButton;
  private buttonPlay!: CustomButton;
  private gameOver!: boolean;
  private moralisUser!: string;
  private NFTstring!: string;
  private bExtraJump: boolean = false;
  private bExtraProtect: boolean = false;
  private bExtraSpeed: boolean = false;
  private bExtraHealthPotions: boolean = false;
  private bExtraSword: boolean = false;

  constructor() {
    super('congratulations');
  }

  init(data) {
    this.moralisUser = data.moralisUser;
    this.bExtraJump = data.bExtraJump;
    this.bExtraProtect = data.bExtraProtect;
    this.bExtraSpeed = data.bExtraSpeed;
    this.bExtraHealthPotions = data.bExtraHealthPotions;
    this.bExtraSword = data.bExtraSword;
  }

  preload() {
    this.load.image(BUTTON_NORMAL, 'assets/Button-normal.png');
    this.load.image(BUTTON_HOVER, 'assets/Button-hover.png');
    this.load.image(BUTTON_CLICKED, 'assets/Button-click.png');
    this.load.image(BUTTON_LOCKED, 'assets/Button-locked.png');
    this.load.image(CONGRATULATIONS, 'assets/OutroBG.png');
  }

  create() {

    this.cameras.main.fadeIn(1000,0,0,0);

    const congrats = this.add.image(600, 450, CONGRATULATIONS).setScale(1.3);


    this.buttonPlay = new CustomButton(this, 85, 65, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, false, 'RESTART', { fontSize: '48px', fill: '#000' }).setScale(0.4);
    this.add.existing(this.buttonPlay);
    this.buttonPlay.setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {

        this.cameras.main.fadeOut(1000,0,0,0);

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

            this.scene.start('welcome',
              {
                moralisUser: this.moralisUser,
                bExtraJump: this.bExtraJump,
                bExtraProtect: this.bExtraProtect,
                bExtraSpeed: this.bExtraSpeed,
                bExtraHealthPotions: this.bExtraHealthPotions,
                bExtraSword: this.bExtraSword
              });
          });
      })

    this.buttonSubmit = new CustomButton(this, 85, 150, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, false, 'CLAIM EXBR', { fontSize: '48px', fill: '#000' }).setScale(0.4);

    this.add.existing(this.buttonSubmit);
    this.buttonSubmit.setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        let walletAddress = prompt("Enter your ERC-20 Wallet Address:", "<NOT AN EXCHANGE ADDRESS!>");
        
        if (walletAddress?.value != '') 
        {
          window.document.getElementById('walletAddress').value = walletAddress;
        }
        window.document.getElementById('post-score')?.click();
        setTimeout(() => {
          this.scene.start('welcome',
            {
              moralisUser: this.moralisUser,
              bExtraJump: this.bExtraJump,
              bExtraProtect: this.bExtraProtect,
              bExtraSpeed: this.bExtraSpeed,
              bExtraHealthPotions: this.bExtraHealthPotions,
              bExtraSword: this.bExtraSword
            });
        }, 10000);
      })


    this.input.keyboard.on('keydown-SPACE', () => {
      this.sound.stopAll();
    }, this);


  }
}