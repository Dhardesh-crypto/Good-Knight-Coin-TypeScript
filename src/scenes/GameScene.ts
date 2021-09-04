import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene
{
    private cursors! : Phaser.Types.Input.Keyboard.CursorKeys;
    private knight! : Phaser.Physics.Matter.Sprite;
    private isTouchingGround : boolean;

	constructor()
	{
		super('game-scene')
        this.isTouchingGround = false;
	}

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

	preload()
    {
        this.load.atlas('knight', 'assets/knight.png', 'assets/knight.json');
    }

    create()
    {
        this.matter.world.setBounds();
        this.createKnightAnimations();

        const {width, height } = this.scale;


        this.knight = this.matter.add.sprite(width*0.5, height*0.5, 'knight').setScale(0.15) 
            .play('player-idle')
            .setFixedRotation()


            console.log(this.knight.body);
    }

    update() 
    {
        if (!this.knight) {
            return;
        }

        const speed = 5;
        if (this.cursors.left.isDown)
        {
            console.log('left');
            this.knight.flipX = true;
            this.knight.setVelocityX(-speed);
            this.knight.anims.play('player-walk', true);
        }
        else if (this.cursors.right.isDown)
        {
            console.log('right');
            this.knight.flipX = false;
            this.knight.setVelocityX(speed);
            this.knight.anims.play('player-walk', true);
        }
        else
        {
            this.knight.setVelocityX(0);
            this.knight.anims.play('player-idle',);
        }

        const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);
        if (upJustPressed /* && this.isTouchingGround */)
        {
            this.isTouchingGround = false;
            this.knight.setVelocityY(-12);
            this.knight.anims.play('player-jump', true);
        }
        else if (this.cursors.space.isDown)
        {
            console.log('attack');
            this.knight.anims.play('player-attack', true);
        }
    }

    private createKnightAnimations() {

        this.anims.create({
			key: 'player-idle',
			frames: this.anims.generateFrameNames('knight', 
            {   start: 1, 
                end: 4,
                prefix: 'Idle (',
                suffix: ').png'
             }),
			frameRate: 10,
			repeat: -1

		})

		this.anims.create({
			key: 'player-attack',
			frames: [{ key: 'knight', frame: 'Attack (9).png' }]

		})

        this.anims.create({
			key: 'player-jump',
			frames: this.anims.generateFrameNames('knight', 
            {   start: 1, 
                end: 10,
                prefix: 'Jump (',
                suffix: ').png'
             }),
			frameRate: 10,
			repeat: -1
		})

        this.anims.create({
			key: 'player-run',
			frames: this.anims.generateFrameNames('knight', 
            {   start: 1, 
                end: 10,
                prefix: 'Run (',
                suffix: ').png'
             }),
			frameRate: 10,
			repeat: 0
		})

        this.anims.create({
			key: 'player-walk',
			frames: this.anims.generateFrameNames('knight', 
            {   start: 1, 
                end: 10,
                prefix: 'Walk (',
                suffix: ').png'
             }),
			frameRate: 10,
			repeat: 0
		})
    }
}
