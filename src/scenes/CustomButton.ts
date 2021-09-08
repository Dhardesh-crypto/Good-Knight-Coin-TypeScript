import Phaser from 'phaser';

export default class CustomButton extends Phaser.GameObjects.Container {
   
    private upImage! : Phaser.GameObjects.Image;
    private overImage! : Phaser.GameObjects.Image;
    private downImage! : Phaser.GameObjects.Image;
    private lockedImage! : Phaser.GameObjects.Image;
    private text! : Phaser.GameObjects.Text;
    private isLocked! : boolean
    
    constructor(scene, x, y, upTexture, overTexture, downTexture, lockedTexture, isLocked, caption, style) {

        super(scene, x, y);
        this.scene = scene;
        this.upImage = this.scene.add.image(0,0, upTexture);
        this.overImage = this.scene.add.image(0,0, overTexture);
        this.downImage = this.scene.add.image(0,0, downTexture);
        this.lockedImage = this.scene.add.image(0,0, lockedTexture);
        this.text = this.scene.add.text(0, 0, caption, style).setOrigin(0.5);

        this.add(this.upImage);
        this.add(this.overImage);
        this.add(this.downImage);
        this.add(this.lockedImage);
        this.add(this.text);

        this.upImage.setVisible(!isLocked);
        this.overImage.setVisible(false);
        this.downImage.setVisible(false);
        this.lockedImage.setVisible(isLocked);

        this.setSize(this.upImage.width, this.upImage.height)
        if (!isLocked) {
            this.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                    this.upImage.setVisible(false);
                    this.overImage.setVisible(true);
                    this.downImage.setVisible(false);
            
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                    this.upImage.setVisible(true);
                    this.overImage.setVisible(false);
                    this.downImage.setVisible(false);
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    this.upImage.setVisible(false);
                    this.overImage.setVisible(true);
                    this.downImage.setVisible(false);
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.upImage.setVisible(false);
                    this.overImage.setVisible(false);
                    this.downImage.setVisible(true);
                })
        }
    }
}