import CustomButton from "./CustomButton";
import GameOverSpawner from "./GameOverSpawner";

const BUTTON_NORMAL = 'buttonNormal';
const BUTTON_HOVER = 'buttonHover';
const BUTTON_CLICKED = 'buttonClicked';
const BUTTON_LOCKED = 'buttonLocked';
const GAME_OVER_LIT_KEY = 'gameoverLit';

export default class GameOverScene extends Phaser.Scene {

    private buttonPlay! : CustomButton;
    private gameOverSpawner! : GameOverSpawner;
    private gameOver! : boolean;
    constructor() {
        super('game-over');

      }

    preload() {
        this.load.image(BUTTON_NORMAL, 'assets/Button-normal.png');
        this.load.image(BUTTON_HOVER, 'assets/Button-hover.png');
        this.load.image(BUTTON_CLICKED, 'assets/Button-click.png');
        this.load.image(BUTTON_LOCKED, 'assets/Button-locked.png');
        this.load.image(GAME_OVER_LIT_KEY, 'assets/gameover_lit.png');
    }
  
    create() {

        this.gameOverSpawner = new GameOverSpawner(this, GAME_OVER_LIT_KEY);
        this.gameOverSpawner.spawn();
        this.physics.pause();
        this.add.image(600, 400, GAME_OVER_LIT_KEY);

        this.buttonPlay = new CustomButton(this, 100, 100, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, false, 'RESTART', { fontSize: '48px', fill: '#000' }).setScale(0.4);
        this.add.existing(this.buttonPlay);
        this.buttonPlay.setInteractive()
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            location.reload();
          })
  
    }
  }