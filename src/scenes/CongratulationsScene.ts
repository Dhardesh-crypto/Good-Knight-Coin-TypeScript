import CustomButton from "./CustomButton";

const BUTTON_NORMAL = 'buttonNormal';
const BUTTON_HOVER = 'buttonHover';
const BUTTON_CLICKED = 'buttonClicked';
const BUTTON_LOCKED = 'buttonLocked';
const CONGRATULATIONS = 'congratulations';

export default class CongratulationsScene extends Phaser.Scene 
{

  private buttonSubmit! : CustomButton;
  private buttonPlay! : CustomButton;
  private gameOver! : boolean;
  private moralisUser!: string;

  constructor() 
  {
    super('congratulations');
  }

  init(data) {
    this.moralisUser = data.moralisUser;
    console.log('Init congratulations ' + this.moralisUser);
  }

  preload() {
    this.load.image(BUTTON_NORMAL, 'assets/Button-normal.png');
    this.load.image(BUTTON_HOVER, 'assets/Button-hover.png');
    this.load.image(BUTTON_CLICKED, 'assets/Button-click.png');
    this.load.image(BUTTON_LOCKED, 'assets/Button-locked.png');
    this.load.image(CONGRATULATIONS, 'assets/OutroBG.png');
  }
  
  create() {

    const congrats = this.add.image(600, 450, CONGRATULATIONS).setScale(1.3);


        this.buttonPlay = new CustomButton(this, 85, 65, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, false, 'RESTART', { fontSize: '48px', fill: '#000' }).setScale(0.4);
        this.add.existing(this.buttonPlay);
        this.buttonPlay.setInteractive()
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            location.reload();
          })

          this.buttonSubmit = new CustomButton(this, 250, 65, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, false, 'CLAIM EXBR', { fontSize: '48px', fill: '#000' }).setScale(0.4);
         
          this.add.existing(this.buttonSubmit);
          this.buttonSubmit.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
              window.document.getElementById('post-score')?.click();
            })
  

        this.input.keyboard.on('keydown-SPACE',  () => {
            this.sound.stopAll();
        }, this);
  
    }
  }