import Phaser from 'phaser'

export default class GameOverSpawner
{
	private scene! : Phaser.Scene;
	private key! : string;

	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor(scene, gameOverKey = 'gameover')
	{
		this.scene = scene
		this.key = gameOverKey
	}

	spawn()
	{
        const gameOver =  this.scene.add.image(650, 350, this.key);
        this.scene.physics.pause();
        return gameOver;
	}
}