import CustomButton from "./CustomButton";

const NFT_ONE_KEY = 'NFT-Knight-Flight';
const NFT_TWO_KEY = 'NFT-Knight-Protect';
const NFT_THREE_KEY = 'NFT-Knight-Speed';
const NFT_FOUR_KEY = 'NFT-Knight-Life';
const NFT_FIVE_KEY = 'NFT-Knight-Night';

const BUTTON_NORMAL = 'buttonNormal';
const BUTTON_HOVER = 'buttonHover';
const BUTTON_CLICKED = 'buttonClicked';
const BUTTON_LOCKED = 'buttonLocked';


export default class NFTSettingsScene extends Phaser.Scene {

    private NFTstring!: string;
    private nftArray!: any;
    private nftNames: string[] = [];
    private buttonClose! : Phaser.GameObjects.Container;
    private moralisUser! : string;

    constructor() {
        super('set-nfts-scene');

      }

    init(data) {
      this.NFTstring = data.NFTstring;
      this.moralisUser = data.moralisUser;
      //console.log('INIT Set NFT ', JSON.parse(this.NFTstring));
    }

    preload() {
        this.load.image(BUTTON_NORMAL, 'assets/Button-normal.png');
        this.load.image(BUTTON_HOVER, 'assets/Button-hover.png');
        this.load.image(BUTTON_CLICKED, 'assets/Button-click.png');
        this.load.image(BUTTON_LOCKED, 'assets/Button-locked.png');

        this.load.image(NFT_ONE_KEY, 'assets/NFT-Knight-Flight.png');
        this.load.image(NFT_TWO_KEY, 'assets/NFT-Knight-Protect.png');
        this.load.image(NFT_THREE_KEY, 'assets/NFT-Knight-Speed.png');
        this.load.image(NFT_FOUR_KEY, 'assets/NFT-Knight-Life.png');
        this.load.image(NFT_FIVE_KEY, 'assets/NFT-Knight-Night.png');

/*       this.nftArray =  JSON.parse(this.NFTstring).result;
       for (var i = 0; i < this.nftArray.length; i++) {
           if (this.nftArray[i].metadata) {
                const metadata = JSON.parse(this.nftArray[i].metadata);
                const imageURL = metadata.image.replace('ipfs://ipfs/', 'https://gateway.ipfs.io/ipfs/');
                const nftImage = this.load.image(metadata.name, imageURL);
                console.log(metadata);
                console.log(nftImage);
                this.nftNames.push(metadata.name);
           } 
           else if (this.nftArray[i].token_uri) {

                var xhr = new XMLHttpRequest();
                
                xhr.onreadystatechange = () => {
                    if (xhr.readyState != 4) return;
                
                    if (xhr.status == 200) {
                        var data = JSON.parse(xhr.responseText);
                        const imageURL = data.image.replace('ipfs://ipfs/', 'https://gateway.ipfs.io/ipfs/');
                        const nftImage = this.load.image(data.name, imageURL);
                        console.log(nftImage);
                        console.log(data);
                        this.nftNames.push(data.name);
                    }            
                };
                
                xhr.open('GET', this.nftArray[i].token_uri, true);
                xhr.send();
           }
       }
       */
    }

    create() {

        this.buttonClose = new CustomButton(this, 85, 65, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, false, 'BACK', { fontSize: '48px', fill: '#000' }).setScale(0.4);
        this.add.existing(this.buttonClose);
       
          this.buttonClose.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
              this.scene.start('welcome',  {moralisUser: this.moralisUser});
            });
  
        const nft1 = this.add.image(375, 100, NFT_ONE_KEY).setScale(0.3).setDepth(1);
        const nft2 = this.add.image(375, 250, NFT_TWO_KEY).setScale(0.3).setDepth(1);
        const nft3 = this.add.image(375, 400, NFT_THREE_KEY).setScale(0.3).setDepth(1);
        const nft4 = this.add.image(375, 550, NFT_FOUR_KEY).setScale(0.3).setDepth(1);
        const nft5 = this.add.image(375, 700, NFT_FIVE_KEY).setScale(0.3).setDepth(1);
/*        console.log('===============================================================================================================================================================');
        console.log('NFT Names = ', this.nftNames);
        console.log('===============================================================================================================================================================');
        for (var i = 0; i < this.nftNames.length; i++) {
            this.add.image(50, 100 +i*100, this.nftNames[i]).setScale(0.1);
        } 
*/
        nft1.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                    nft1.setScale(0.6);
                    nft1.setX(575);
                    nft1.setY(175);
                    nft1.setDepth(2);
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                    nft1.setScale(0.3);
                    nft1.setX(375);
                    nft1.setY(100);
                    nft1.setDepth(1);
                })

        nft2.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                    nft2.setScale(0.6);
                    nft2.setX(575);
                    nft2.setY(300);
                    nft2.setDepth(2);
            
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                    nft2.setScale(0.3);
                    nft2.setX(375);
                    nft2.setY(250);
                    nft2.setDepth(1);
                })

        nft3.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                    nft3.setScale(0.6);
                    nft3.setX(575);
                    nft3.setY(400);
                    nft3.setDepth(2);
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                    nft3.setScale(0.3);
                    nft3.setX(375);
                    nft3.setY(400);
                    nft3.setDepth(1);
                })

        nft4.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                    nft4.setScale(0.6);
                    nft4.setX(575);
                    nft4.setY(500);
                    nft4.setDepth(2);
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                    nft4.setScale(0.3);
                    nft4.setX(375);
                    nft4.setY(550);
                    nft4.setDepth(1);
                })

        nft5.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                    nft5.setScale(0.6);
                    nft5.setX(575);
                    nft5.setY(600);
                    nft5.setDepth(2);
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                    nft5.setScale(0.3);
                    nft5.setX(375);
                    nft5.setY(700);
                    nft5.setDepth(1);
                })

    }

    update() {
        
    }

    

}