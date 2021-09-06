import Phaser from 'phaser'

export default class HealthPotionSpawner
{
	private scene! : Phaser.Scene;
	private key! : string;
	private _group! : Phaser.Physics.Arcade.Group;

	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor(scene, healthPotionKey = 'healthPotion')
	{
		this.scene = scene
		this.key = healthPotionKey

		this._group = this.scene.physics.add.group()
	}

	get group()
	{
		return this._group
	}

	spawn(playerX = 0)
	{
		const x = (playerX < 600) ? Phaser.Math.Between(800, 1200) : Phaser.Math.Between(0, 400)

        const potion = this.group.create(x, 16, this.key).setScale(0.15).refreshBody();
        potion.setBounce(1);
		potion.setGravityY(300);
        potion.setCollideWorldBounds(true);
		potion.setVelocity(Phaser.Math.Between(-100, 300), 25);
		potion.setAngularVelocity(60);
		
		return potion
	}
}