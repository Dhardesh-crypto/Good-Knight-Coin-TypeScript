import Phaser from 'phaser'

export default class CoinSpawner
{
	private scene! : Phaser.Scene;
	private key: string;
	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor(scene, starkey = 'coin')
	{
		this.scene = scene
		this.key = starkey
	}
    
	spawn()
	{
        const coins = this.scene.physics.add.group({
			key: this.key,
			repeat: 16,
			setXY: { x: 12, y: 0, stepX: 70 }
		})
		
		coins.children.iterate((child) => {
           	child.setScale(0.25).refreshBody();
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
		})

		return coins
	}
}