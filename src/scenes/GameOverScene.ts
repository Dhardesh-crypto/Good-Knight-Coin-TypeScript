import CustomButton from "./CustomButton";
import GameOverSpawner from "./GameOverSpawner";
import ScoreLabel from "~/ui/ScoreLabel";
import LivesLabel from '../ui/LivesLabel'

const BUTTON_NORMAL = 'buttonNormal';
const BUTTON_HOVER = 'buttonHover';
const BUTTON_CLICKED = 'buttonClicked';
const BUTTON_LOCKED = 'buttonLocked';
const GAME_OVER_LIT_KEY = 'gameoverLit';
const SCORE_BACKGROUND_KEY = 'scoreBackground'; 
const LIVES_BACKGROUND_KEY = 'livesBackground';

export default class GameOverScene extends Phaser.Scene {

    private buttonPlay! : CustomButton;
    private gameOverSpawner! : GameOverSpawner;
    private gameOver! : boolean;
    private finalScore! : integer;
    private scoreLabel! : ScoreLabel;
    private livesLabel! : LivesLabel;
    private scoreBackground! : Phaser.GameObjects.Image;
    private livesBackground! : Phaser.GameObjects.Image;


    constructor() {
        super('game-over');

      }

    init(data) {
      console.log(data);
      this.finalScore = data.score;
    }

    preload() {
        this.load.image(BUTTON_NORMAL, 'assets/Button-normal.png');
        this.load.image(BUTTON_HOVER, 'assets/Button-hover.png');
        this.load.image(BUTTON_CLICKED, 'assets/Button-click.png');
        this.load.image(BUTTON_LOCKED, 'assets/Button-locked.png');
        this.load.image(GAME_OVER_LIT_KEY, 'assets/gameover_lit.png');
        this.load.image(SCORE_BACKGROUND_KEY, 'assets/Score_Background.png');

    }
  
    create() {

        this.physics.pause();
        this.add.image(650, 350, GAME_OVER_LIT_KEY);

        this.scoreBackground = this.add.image(80,33, SCORE_BACKGROUND_KEY).setScale(0.4);
        this.scoreLabel = this.createScoreLabel(63, 16, this.finalScore);

        this.livesBackground = this.add.image(80,83, LIVES_BACKGROUND_KEY).setScale(0.4);
        this.livesLabel = this.createLivesLabel(63, 67, 0);

        this.buttonPlay = new CustomButton(this, 600, 600, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, false, 'RESTART', { fontSize: '48px', fill: '#000' }).setScale(0.4);
        this.add.existing(this.buttonPlay);
        this.buttonPlay.setInteractive()
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            location.reload();
          })

        this.input.keyboard.on('keydown-SPACE',  () => {
            this.sound.stopAll();
        }, this);
  
    }

    createScoreLabel(x, y, score)
    {
      const style = { fontSize: '32px', fill: '#fff' }
      const label = new ScoreLabel(this, x, y, score, style)
  
      this.add.existing(label)
  
      return label
    }

    createLivesLabel(x, y, lives)
    {
      const style = { fontSize: '32px', fill: '#fff' }
      const label = new LivesLabel(this, x, y, lives, style)
  
      this.add.existing(label)
  
      return label
    }

  }