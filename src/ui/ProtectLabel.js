import Phaser from 'phaser'

const formatProtect = (protect) => `${protect}`

export default class ProtectLabel extends Phaser.GameObjects.Text
{
	constructor(scene, x, y, protect, style)
	{
		super(scene, x, y, formatProtect(protect), style)

		this.protect = protect
	}

	setProtect(protect)
	{
		this.protect  = protect
		this.updateProtectText()
	}

	add(protect)
	{
		this.setProtect(this.protect + protect)
	}

    subtract(protect)
	{
		this.setProtect(this.protect - protect)
	}


	updateProtectText()
	{
		this.setText(formatProtect(this.protect))
	}
}