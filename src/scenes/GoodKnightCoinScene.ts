import Phaser from 'phaser'

import BackgroundSpawner from './BackgroundSpawner'
import KnightSpawner from './KnightSpawner'
import PlatformSpawner from './PlatformSpawner'
import MovingPlatformSpawner from './MovingPlatformSpawner'
import CoinSpawner from './CoinSpawner'
import ScoreLabel from '../ui/ScoreLabel'
import LivesLabel from '../ui/LivesLabel'
import SkullSpawner from './SkullSpawner'
import HealthPotionSpawner from './HealthPotionSpawner'
import GameOverSpawner from './GameOverSpawner'
import MoralisScoreSavedLabel from '../ui/MoralisScoreSavedLabel'

const BACKGROUND_KEY = 'background';
const BACKGROUND1_KEY = 'background1';
const BACKGROUND2_KEY = 'background2';
const BACKGROUND3_KEY = 'background3';
const BACKGROUND4_KEY = 'background4';
const BACKGROUND5_KEY = 'background5';
const BACKGROUND6_KEY = 'background6';
const BACKGROUND7_KEY = 'background7';
const BACKGROUND8_KEY = 'background8';
const BACKGROUND9_KEY = 'background9';
const SCORE_BACKGROUND_KEY = 'scoreBackground';
const LIVES_BACKGROUND_KEY = 'livesBackground';
const GROUND_KEY = 'ground';
const GROUND_LEFT_KEY = 'groundLeft';
const GROUND_RIGHT_KEY = 'groundRight';
const KNIGHT_KEY = 'knight';
const COIN_KEY = 'coin';
const SKULL_KEY = 'skull';
const HEALTH_POTION_KEY = 'healthPotion';
const TREE_KEY = 'tree';
const BUSH_ONE_KEY = 'bush1' ;
const BUSH_TWO_KEY = 'bush2';
const GAME_OVER_KEY = 'gameover';
const AUDIO_COLLECT_COIN = 'collectCoin';
const AUDIO_SKULL_HIT = 'skullHit';
const AUDIO_MISSION_COMPLETE = 'missionComplete';
const AUDIO_GAME_OVER = 'gameOverFunny';
const AUDIO_PLAYER_JUMP = 'playerJump';
const AUDIO_HEALTH_POTION = 'drinkPotion';
const AUDIO_BACKGROUND_MUSIC = 'backgroundMusic';
const AUDIO_BACKGROUND_MUSIC_ONE = 'bgmOne';
const AUDIO_BACKGROUND_MUSIC_TWO = 'bgmTwo';
const AUDIO_BACKGROUND_MUSIC_THREE = 'bgmThree';
            
export default class GameScene extends Phaser.Scene
{ 
    private background! : BackgroundSpawner;
    private background1! : Phaser.GameObjects.Image;
    private background2! : Phaser.GameObjects.Image;
    private background3! : Phaser.GameObjects.Image;
    private background4! : Phaser.GameObjects.Image;
    private background5! : Phaser.GameObjects.Image;
    private background6! : Phaser.GameObjects.Image;
    private background7! : Phaser.GameObjects.Image;
    private background8! : Phaser.GameObjects.Image;
    private background9! : Phaser.GameObjects.Image;
    private scoreBackground! : Phaser.GameObjects.Image;
    private livesBackground! : Phaser.GameObjects.Image;
    private platformSpawner! : PlatformSpawner;
    private platforms! : Phaser.Physics.Arcade.StaticGroup;
    private movingPlatformSpawner! : MovingPlatformSpawner;
    private movingPlatforms! : Phaser.Physics.Arcade.StaticGroup; 
    private playerSpawner! : KnightSpawner;
    private player! : Phaser.Physics.Arcade.Sprite;
    private coinSpawner! : CoinSpawner;
    private coins! : Phaser.Physics.Arcade.Group;
    private skullSpawner! : SkullSpawner; 
    private skullGroup! : Phaser.Physics.Arcade.Group;
    private gameOverSpawner! : GameOverSpawner;
    private potionSpawner! : HealthPotionSpawner;
    private potions! : Phaser.Physics.Arcade.Group;
    private cursors! : Phaser.Types.Input.Keyboard.CursorKeys;
    private livesLabel! : LivesLabel;
    private scoreLabel! : ScoreLabel;
    private moralisScoreSavedLabel! : MoralisScoreSavedLabel;
    private coinCollect! : Phaser.Sound.BaseSound;
    private skullHit! : Phaser.Sound.BaseSound;
    private missionComplete! : Phaser.Sound.BaseSound;
    private gameOverFunny! : Phaser.Sound.BaseSound;
    private playerJump! : Phaser.Sound.BaseSound;
    private drinkPotion! : Phaser.Sound.BaseSound;
    private backgroundMusic! : Phaser.Sound.BaseSound;
    private jumpHeight!: integer;
    private movementSpeed! : integer;
    private score! : integer;
    private lives!: integer;
    private completedLevels!: integer;
    private toggleMusic! : boolean;
    private togglePause! : boolean;
    private gameOver! : boolean;
    private movingPlatformDirection! : string;
    private moralisUser!: string;

    constructor() 
    {
        super('game-scene');
    }

    init(data) {
        const style = { fontSize: '32px', fill: '#fff' }
        this.add.text(100, 100, 'loading...', style);
        this.score = 0;
        this.lives = 2; // 2 
        this.toggleMusic = true;
        this.togglePause = false;
        this.completedLevels = 0;

        this.movingPlatformDirection = '';
        this.jumpHeight = -400;
        this.movementSpeed = 160; // 160
        this.gameOver = false;
        this.moralisUser = data.moralisUser;
        console.log(this.moralisUser);
    }

    preload()
    {
        this.load.image(BACKGROUND1_KEY, 'assets/1.png');
        this.load.image(BACKGROUND2_KEY, 'assets/2.png');
        this.load.image(BACKGROUND3_KEY, 'assets/3.png');
        this.load.image(BACKGROUND4_KEY, 'assets/4.png');
        this.load.image(BACKGROUND5_KEY, 'assets/5.png');
        this.load.image(BACKGROUND6_KEY, 'assets/6.png');
        this.load.image(BACKGROUND7_KEY, 'assets/7.png');
        this.load.image(BACKGROUND8_KEY, 'assets/8.png');
        this.load.image(BACKGROUND9_KEY, 'assets/9.png');
        this.load.image(SCORE_BACKGROUND_KEY, 'assets/Score_Background.png');
        this.load.image(LIVES_BACKGROUND_KEY, 'assets/Lives_Background.png');
        this.load.image(GROUND_KEY, 'assets/Tile (2).png');
        this.load.image(GROUND_LEFT_KEY, 'assets/Tile (1).png');
        this.load.image(GROUND_RIGHT_KEY, 'assets/Tile (3).png');
        this.load.image(COIN_KEY, 'assets/coin.png');
        this.load.image(SKULL_KEY, 'assets/Bone (2).png');
        this.load.image(HEALTH_POTION_KEY, 'assets/Potion_health.png');
        this.load.spritesheet(KNIGHT_KEY,
            'assets/Knight.png',
            { frameWidth: 181, frameHeight: 244 }
        );

        this.load.image(TREE_KEY, 'assets/Tree_lit.png');
        this.load.image(BUSH_ONE_KEY, 'assets/Bush (1)_lit.png');
        this.load.image(BUSH_TWO_KEY, 'assets/Bush (2)_lit.png');
        this.load.image(GAME_OVER_KEY, 'assets/gameover.png');

        this.load.audio(AUDIO_COLLECT_COIN, [ 'assets/collectCoin.wav', 'assets/collectCoin.wav' ]);
        this.load.audio(AUDIO_SKULL_HIT, [ 'assets/skullHit.wav', 'assets/skullHit.wav' ]);
        this.load.audio(AUDIO_MISSION_COMPLETE, [ 'assets/missionComplete.wav', 'assets/missionComplete.wav' ]);
        this.load.audio(AUDIO_GAME_OVER, [ 'assets/GameOverFunny.mp3', 'assets/GameOverFunny.mp3']);
        this.load.audio(AUDIO_PLAYER_JUMP, [ 'assets/playerJump.wav', 'assets/playerJump.wav' ]);
        this.load.audio(AUDIO_HEALTH_POTION, [ 'assets/HealthPotion.wav', 'assets/HealthPotion.wav' ]);
        this.load.audio(AUDIO_BACKGROUND_MUSIC, [ 'assets/BackgroundMusic.mp3', 'assets/BackgroundMusic.mp3' ]);
        this.load.audio(AUDIO_BACKGROUND_MUSIC_ONE, [ 'assets/BGMSuperDuper.mp3', 'assets/BGMSuperDuper.mp3' ]);
        this.load.audio(AUDIO_BACKGROUND_MUSIC_TWO, [ 'assets/BGMBreakingPoint.mp3', 'assets/BGMBreakingPoint.mp3' ]);
        this.load.audio(AUDIO_BACKGROUND_MUSIC_THREE, [ 'assets/BGM8BitSamba.mp3', 'assets/BGM8BitSamba.mp3' ]);

    }

    create() 
    {
        this.background = new BackgroundSpawner(this, 600, 400, 
            BACKGROUND1_KEY, BACKGROUND2_KEY, BACKGROUND3_KEY, 
            BACKGROUND4_KEY, BACKGROUND5_KEY, BACKGROUND6_KEY, 
            BACKGROUND7_KEY, BACKGROUND8_KEY, BACKGROUND9_KEY);
        this.background.changeScene(1);
        this.add.existing(this.background);
        this.scoreBackground = this.add.image(80,33, SCORE_BACKGROUND_KEY).setScale(0.4);
        this.livesBackground = this.add.image(80,83, LIVES_BACKGROUND_KEY).setScale(0.4);

        this.platformSpawner = new PlatformSpawner(this, GROUND_KEY, GROUND_LEFT_KEY, GROUND_RIGHT_KEY);
        this.platforms = this.platformSpawner.spawn();

        this.movingPlatformSpawner = new MovingPlatformSpawner(this, GROUND_KEY, GROUND_LEFT_KEY, GROUND_RIGHT_KEY);
        this.movingPlatforms = this.movingPlatformSpawner.spawn();

        this.add.image(400, 645, TREE_KEY);
        this.add.image(1100, 725, BUSH_ONE_KEY);
        this.add.image(1000, 740, BUSH_TWO_KEY);

        this.playerSpawner = new KnightSpawner(this, KNIGHT_KEY);
        this.player = this.playerSpawner.spawn();            
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.movingPlatforms);

        this.coinSpawner = new CoinSpawner(this, COIN_KEY)
        this.coins =  this.coinSpawner.spawn()

        this.physics.add.collider(this.coins, this.platforms);
        this.physics.add.collider(this.coins, this.movingPlatforms);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, undefined, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.scoreLabel = this.createScoreLabel(63, 16, this.score);
        this.livesLabel = this.createLivesLabel(63, 67, this.lives);

        this.skullSpawner = new SkullSpawner(this, SKULL_KEY);
        this.skullGroup = this.skullSpawner.group;

        this.physics.add.collider(this.skullGroup, this.platforms)
        this.physics.add.collider(this.skullGroup, this.movingPlatforms)
        this.physics.add.collider(this.skullGroup, this.skullGroup)
        this.physics.add.collider(this.player, this.skullGroup, this.hitSkull, undefined, this)

        this.coinCollect = this.sound.add(AUDIO_COLLECT_COIN);
        this.skullHit = this.sound.add(AUDIO_SKULL_HIT);
        this.missionComplete = this.sound.add(AUDIO_MISSION_COMPLETE);
        this.gameOverFunny = this.sound.add(AUDIO_GAME_OVER);
        this.playerJump = this.sound.add(AUDIO_PLAYER_JUMP);
        this.drinkPotion = this.sound.add(AUDIO_HEALTH_POTION);
        this.backgroundMusic = this.sound.add(AUDIO_BACKGROUND_MUSIC_ONE);
        this.backgroundMusic.play();

        if (window.location.hostname === 'localhost') {
            this.input.keyboard.on('keydown-H', () => {
                this.potionSpawner = new HealthPotionSpawner(this, HEALTH_POTION_KEY);
                this.potions = this.potionSpawner.spawn();
                this.physics.add.collider(this.potions, this.platforms);
                this.physics.add.collider(this.potions, this.movingPlatforms);
                this.physics.add.collider(this.potions, this.skullGroup);
                this.physics.add.overlap(this.player, this.potions, this.collectPotion, undefined, this);    
            }, this);

            this.input.keyboard.on('keydown-Q', () => {
                this.background.changeScene(1)
            }, this);

            this.input.keyboard.on('keydown-W', () => {
                this.background.changeScene(2)
            }, this);

            this.input.keyboard.on('keydown-E', () => {
                this.background.changeScene(3)
            }, this);

            this.input.keyboard.on('keydown-R', () => {
                this.background.changeScene(4)
            }, this);

            this.input.keyboard.on('keydown-T', () => {
                this.background.changeScene(5)
            }, this);

            this.input.keyboard.on('keydown-Y', () => {
                this.background.changeScene(6)
            }, this);

            this.input.keyboard.on('keydown-U', () => {
                this.background.changeScene(7)
            }, this);

            this.input.keyboard.on('keydown-I', () => {
                this.background.changeScene(8)
            }, this);

            this.input.keyboard.on('keydown-O', () => {
                this.background.changeScene(9)
            }, this);

            this.input.keyboard.on('keydown-L', () => {
                this.lives += 1;
                this.livesLabel.add(1)
            }, this);


        }

        this.input.keyboard.on('keydown-M',  () => {
            this.toggleMusic = !this.toggleMusic;
            if (this.toggleMusic) { this.backgroundMusic.play(); }
            else { this.backgroundMusic.stop(); }
        }, this);

        this.input.keyboard.on('keydown-SPACE',  () => {
            this.togglePause = !this.togglePause;
            if (this.togglePause) {
            this.physics.pause();
            this.sound.stopAll();
            }
            else {
            this.physics.resume();
            if (this.toggleMusic) { this.backgroundMusic.play(); }
            }

        }, this);
    }

    update()
	{
        if (this.completedLevels >= 3) {
            if (this.movingPlatforms.getChildren()[0].x === 0) {
                this.movingPlatformDirection = 'right';
            }
            if (this.movingPlatforms.getChildren()[1].x === 1140) {
              this.movingPlatformDirection = 'left';
            }
            if (this.movingPlatformDirection === 'left') {
                
                if (!this.togglePause) {
                    this.movingPlatforms.getChildren()[0].x -= 1;
                    this.movingPlatforms.getChildren()[1].x -= 1;
                    this.movingPlatforms.getChildren()[2].x += 1;
                    this.movingPlatforms.getChildren()[3].x += 1;

                    this.movingPlatforms.getChildren()[0].refreshBody();
                    this.movingPlatforms.getChildren()[1].refreshBody();
                    this.movingPlatforms.getChildren()[2].refreshBody();
                    this.movingPlatforms.getChildren()[3].refreshBody();
                }
            }
            else {
                if (!this.togglePause) {
                    this.movingPlatforms.children.entries[0].x += 1;
                    this.movingPlatforms.children.entries[1].x += 1;
                    this.movingPlatforms.children.entries[2].x -= 1;
                    this.movingPlatforms.children.entries[3].x -= 1;

                    this.movingPlatforms.children.entries[0].refreshBody();
                    this.movingPlatforms.children.entries[1].refreshBody();
                    this.movingPlatforms.children.entries[2].refreshBody();
                    this.movingPlatforms.children.entries[3].refreshBody();
                }
            }
        }

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-this.movementSpeed);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(this.movementSpeed);
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            if (this.toggleMusic) { this.playerJump.play(); }
            this.player.setVelocityY(this.jumpHeight);
        }
	}

    collectPotion(player, potion) {
        if (this.toggleMusic) { this.drinkPotion.play(); }
        potion.disableBody(true, true);
        this.lives += 1;
        this.livesLabel.add(1);
        player.setTint(0x00ff00);
    }

    collectCoin(player, coin) {
        if (this.toggleMusic) { this.coinCollect.play(); }
        coin.disableBody(true, true);
        this.score += 10;
        this.scoreLabel.add(10)
        player.clearTint(); // reset the red color in case of being hit before

        if (this.score === 1500) {
            this.scene.start('congratulations', { moralisUser: this.moralisUser});
        }

        if (this.coins.countActive(true) == 0) {

            this.completedLevels += 1;
            switch (this.completedLevels) {
                case 1: {
                    this.background.changeScene(2);
                    this.backgroundMusic.stop();
                    this.backgroundMusic = this.sound.add('bgmTwo');
                    if (this.toggleMusic) { this.backgroundMusic.play(); }
                    break;
                }
                case 2: {
                    this.background.changeScene(3);
                    this.backgroundMusic.stop();
                    this.backgroundMusic = this.sound.add('bgmThree');
                    if (this.toggleMusic) { this.backgroundMusic.play(); }

                    this.potionSpawner = new HealthPotionSpawner(this, HEALTH_POTION_KEY);
                    this.potions = this.potionSpawner.spawn();
                    this.physics.add.collider(this.potions, this.platforms);
                    this.physics.add.collider(this.potions, this.movingPlatforms);
                    this.physics.add.collider(this.potions, this.skullGroup);
                    this.physics.add.overlap(this.player, this.potions, this.collectPotion, undefined, this);    
                    break;
                }
                case 3: {
                    this.background.changeScene(4);
                    this.backgroundMusic.stop();
                    this.backgroundMusic = this.sound.add('bgmOne');
                    if (this.toggleMusic) { this.backgroundMusic.play(); }
                    break;
                }
                case 4: {
                    this.background.changeScene(5);
                    this.backgroundMusic.stop();
                    this.backgroundMusic = this.sound.add('bgmTwo');
                    if (this.toggleMusic) { this.backgroundMusic.play(); }
                    break;
                }
                case 5: {
                    this.background.changeScene(6);
                    this.backgroundMusic.stop();
                    this.backgroundMusic = this.sound.add('bgmThree');
                    if (this.toggleMusic) { this.backgroundMusic.play(); }

                    this.potionSpawner = new HealthPotionSpawner(this, HEALTH_POTION_KEY);
                    this.potions = this.potionSpawner.spawn();
                    this.physics.add.collider(this.potions, this.platforms);
                    this.physics.add.collider(this.potions, this.movingPlatforms);
                    this.physics.add.collider(this.potions, this.skullGroup);
                    this.physics.add.overlap(this.player, this.potions, this.collectPotion, undefined, this);    
                    break;
                }
                case 6: {
                    this.background.changeScene(7);
                    this.backgroundMusic.stop();
                    this.backgroundMusic = this.sound.add('bgmOne');
                    if (this.toggleMusic) { this.backgroundMusic.play(); }
                    break;
                }
                case 7: {
                    this.background.changeScene(8);
                    this.backgroundMusic.stop();
                    this.backgroundMusic = this.sound.add('bgmTwo');
                    if (this.toggleMusic) { this.backgroundMusic.play(); }
                    break;
                }
                case 8: {
                    this.background.changeScene(9);
                    this.backgroundMusic.stop();
                    this.backgroundMusic = this.sound.add('backgroundMusic');
                    if (this.toggleMusic) { this.backgroundMusic.play(); }

                    this.potionSpawner = new HealthPotionSpawner(this, HEALTH_POTION_KEY);
                    this.potions = this.potionSpawner.spawn();
                    this.physics.add.collider(this.potions, this.platforms);
                    this.physics.add.collider(this.potions, this.movingPlatforms);
                    this.physics.add.collider(this.potions, this.skullGroup);
                    this.physics.add.overlap(this.player, this.potions, this.collectPotion, undefined, this);    
                    break;
                }
                default: {
                    this.background.changeScene(1);
                    this.backgroundMusic.stop();
                    this.backgroundMusic = this.sound.add('backgroundMusic');
                    if (this.toggleMusic) { this.backgroundMusic.play(); }
                    break;
                }
            }

          if (this.completedLevels === 3) {
              this.movingPlatforms.children.entries[0].enableBody(true, this.movingPlatforms.children.entries[0].x, this.movingPlatforms.children.entries[0].y, true, true);
              this.movingPlatforms.children.entries[1].enableBody(true, this.movingPlatforms.children.entries[1].x, this.movingPlatforms.children.entries[1].y, true, true);
          }
          if (this.toggleMusic) { this.missionComplete.play(); }
          this.coins.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
          });

          this.skullSpawner.spawn(this.player.x);

          for (var i=0; i<12; i++)
          {
              this.platforms.children.entries[i].x = this.platforms.children.entries[i].x - 180;
              if (this.platforms.children.entries[i].x < 0) {
                this.platforms.children.entries[i].x = 1200 - this.platforms.children.entries[i].x;
              }
              this.platforms.children.entries[i].refreshBody();
          }
        }
    }

    /* async */ hitSkull(player, skull)
    {
        // console.log(this);
        if (this.toggleMusic) { 
            this.skullHit.play(); 
        }
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.lives = this.lives -1;
        skull.disableBody(true, true);
        this.livesLabel.subtract(1)
        if (this.lives == 0) {
            this.gameOverSpawner = new GameOverSpawner(this, GAME_OVER_KEY);
            this.gameOverSpawner.spawn();
            this.physics.pause();
            this.gameOver = true;
            if (this.toggleMusic) { this.backgroundMusic.stop(); }
            if (this.toggleMusic) { this.gameOverFunny.play(); }

            //setTimeout( () => {
                this.scene.start('game-over', {score: this.score});
            //}, 3000); 

    
        }
        else {
            // Create a new bomb because player is not allowed to collect coins without
            // a challenge
            this.skullSpawner.spawn(this.player.x);
            this.physics.resume();
        }
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

    createMoralisScoreSavedLabel(x, y, objectID) 
    {
        const style = { fontSize: '32px', fill: '#fff' }
		const label = new MoralisScoreSavedLabel(this, x, y, objectID, style)

		this.add.existing(label)

		return label
    }

}