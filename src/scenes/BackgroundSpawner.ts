import Phaser from 'phaser';

export default class BackgroundSpawner extends Phaser.GameObjects.Container {
   
    private background1! : Phaser.GameObjects.Image;
    private background2! : Phaser.GameObjects.Image;
    private background3! : Phaser.GameObjects.Image;
    private background4! : Phaser.GameObjects.Image;
    private background5! : Phaser.GameObjects.Image;
    private background6! : Phaser.GameObjects.Image;
    private background7! : Phaser.GameObjects.Image;
    private background8! : Phaser.GameObjects.Image;
    private background9! : Phaser.GameObjects.Image;
    
    constructor(scene, x, y, background1, background2, background3, background4, background5, background6, background7, background8, background9) {

        super(scene, x, y);
        this.scene = scene;
        this.background1 = this.scene.add.image(0,0, background1);
        this.background2 = this.scene.add.image(0,0, background2);
        this.background3 = this.scene.add.image(0,0, background3);
        this.background4 = this.scene.add.image(0,0, background4);
        this.background5 = this.scene.add.image(0,0, background5);
        this.background6 = this.scene.add.image(0,0, background6);
        this.background7 = this.scene.add.image(0,0, background7);
        this.background8 = this.scene.add.image(0,0, background8);
        this.background9 = this.scene.add.image(0,0, background9);

        this.add(this.background1);
        this.add(this.background2);
        this.add(this.background3);
        this.add(this.background4);
        this.add(this.background5);
        this.add(this.background6);
        this.add(this.background7);
        this.add(this.background8);
        this.add(this.background9);

        console.log(this);

        this.background1.setVisible(true);
        this.background2.setVisible(false);
        this.background3.setVisible(false);
        this.background4.setVisible(false);
        this.background5.setVisible(false);
        this.background6.setVisible(false);
        this.background7.setVisible(false);
        this.background8.setVisible(false);
        this.background9.setVisible(false);

        // this.setDisplaySize(1200, 800);
    }

    changeScene(i: integer) {
        switch(i) {
            case 1: {
                this.background1.setVisible(true);
                this.background2.setVisible(false);
                this.background3.setVisible(false);
                this.background4.setVisible(false);
                this.background5.setVisible(false);
                this.background6.setVisible(false);
                this.background7.setVisible(false);
                this.background8.setVisible(false);
                this.background9.setVisible(false);
                break;
            }
            case 2: {
                this.background1.setVisible(false);
                this.background2.setVisible(true);
                this.background3.setVisible(false);
                this.background4.setVisible(false);
                this.background5.setVisible(false);
                this.background6.setVisible(false);
                this.background7.setVisible(false);
                this.background8.setVisible(false);
                this.background9.setVisible(false);
                break;
            }
            case 3: {
                this.background1.setVisible(false);
                this.background2.setVisible(false);
                this.background3.setVisible(true);
                this.background4.setVisible(false);
                this.background5.setVisible(false);
                this.background6.setVisible(false);
                this.background7.setVisible(false);
                this.background8.setVisible(false);
                this.background9.setVisible(false);
                break;
            }
            case 4: {
                this.background1.setVisible(false);
                this.background2.setVisible(false);
                this.background3.setVisible(false);
                this.background4.setVisible(true);
                this.background5.setVisible(false);
                this.background6.setVisible(false);
                this.background7.setVisible(false);
                this.background8.setVisible(false);
                this.background9.setVisible(false);
                break;
            }
            case 5: {
                this.background1.setVisible(false);
                this.background2.setVisible(false);
                this.background3.setVisible(false);
                this.background4.setVisible(false);
                this.background5.setVisible(true);
                this.background6.setVisible(false);
                this.background7.setVisible(false);
                this.background8.setVisible(false);
                this.background9.setVisible(false);
                break;
            }
            case 6: {
                this.background1.setVisible(false);
                this.background2.setVisible(false);
                this.background3.setVisible(false);
                this.background4.setVisible(false);
                this.background5.setVisible(false);
                this.background6.setVisible(true);
                this.background7.setVisible(false);
                this.background8.setVisible(false);
                this.background9.setVisible(false);
                break;
            }
            case 7: {
                this.background1.setVisible(false);
                this.background2.setVisible(false);
                this.background3.setVisible(false);
                this.background4.setVisible(false);
                this.background5.setVisible(false);
                this.background6.setVisible(false);
                this.background7.setVisible(true);
                this.background8.setVisible(false);
                this.background9.setVisible(false);
                break;
            }
            case 8: {
                this.background1.setVisible(false);
                this.background2.setVisible(false);
                this.background3.setVisible(false);
                this.background4.setVisible(false);
                this.background5.setVisible(false);
                this.background6.setVisible(false);
                this.background7.setVisible(false);
                this.background8.setVisible(true);
                this.background9.setVisible(false);
                break;
            }

            default: {
                this.background1.setVisible(false);
                this.background2.setVisible(false);
                this.background3.setVisible(false);
                this.background4.setVisible(false);
                this.background5.setVisible(false);
                this.background6.setVisible(false);
                this.background7.setVisible(false);
                this.background8.setVisible(false);
                this.background9.setVisible(true);
                break;
            }
        }
    }
}