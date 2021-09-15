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
    private buttonEquip1! : Phaser.GameObjects.Container;
    private buttonEquip2! : Phaser.GameObjects.Container;
    private buttonEquip3! : Phaser.GameObjects.Container;
    private buttonEquip4! : Phaser.GameObjects.Container;
    private buttonEquip5! : Phaser.GameObjects.Container;

    private moralisUser! : string;
    private bExtraJump: boolean = false;
    private bExtraProtect: boolean = false;
    private bExtraSpeed: boolean = false;
    private bExtraHealthPotions: boolean = false;
    private bExtraSword: boolean = false;

    constructor() {
        super('set-nfts-scene');

      }

    init(data) {
        console.log('[SET-NFT-SCENE] data: ', data);
        this.moralisUser = data.moralisUser;
        this.bExtraJump = data.bExtraJump;
        this.bExtraProtect = data.bExtraProtect;
        this.bExtraSpeed = data.bExtraSpeed;
        this.bExtraHealthPotions = data.bExtraHealthPotions;
        this.bExtraSword = data.bExtraSword;
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
        this.add.text(100, 680, 'Click on a perk/NFT to enable it during game play.\nThey are free to use for a limited period of time!', { fontSize: '32px', fill: '#fff' });
        this.buttonClose = new CustomButton(this, 85, 65, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, false, 'BACK', { fontSize: '48px', fill: '#000' }).setScale(0.4);
        this.add.existing(this.buttonClose);
       
          this.buttonClose.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
              this.scene.start('welcome',  
                { moralisUser: this.moralisUser, 
                    bExtraJump: this.bExtraJump,
                    bExtraProtect: this.bExtraProtect,
                    bExtraSpeed: this.bExtraSpeed,
                    bExtraHealthPotions: this.bExtraHealthPotions,
                    bExtraSword: this.bExtraSword
                });
            });
  
        const nft1 = this.add.image(375, 100, NFT_ONE_KEY).setScale(0.3).setDepth(1); // KnightFlight, this.bExtraJump
        (this.bExtraJump === true) ? nft1.setTint(0x00ff00) : nft1.clearTint();
        const nft2 = this.add.image(375, 250, NFT_TWO_KEY).setScale(0.3).setDepth(1); // KnightProtect, this.bExtraProtect
        (this.bExtraProtect === true) ? nft2.setTint(0x00ff00) : nft2.clearTint();
        const nft3 = this.add.image(375, 400, NFT_THREE_KEY).setScale(0.3).setDepth(1); // KnightSpeed, this.bExtraSpeed
        (this.bExtraSpeed === true) ? nft3.setTint(0x00ff00) : nft3.clearTint();
        const nft4 = this.add.image(375, 550, NFT_FOUR_KEY).setScale(0.3).setDepth(1); // KnightLife, this.bExtraHealthPotions
        (this.bExtraHealthPotions === true) ? nft4.setTint(0x00ff00) : nft4.clearTint();
       // const nft5 = this.add.image(375, 700, NFT_FIVE_KEY).setScale(0.3).setDepth(1); // KnightNight, this.bExtraSword
       // (this.bExtraSword === true) ? nft5.setTint(0x00ff00) : nft5.clearTint();

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
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.bExtraJump = !this.bExtraJump;
                    (this.bExtraJump === true) ? nft1.setTint(0x00ff00) : nft1.clearTint();
                });

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
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.bExtraProtect = !this.bExtraProtect;
                    (this.bExtraProtect === true) ? nft2.setTint(0x00ff00) : nft2.clearTint();
                });


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
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.bExtraSpeed = !this.bExtraSpeed;
                    (this.bExtraSpeed === true) ? nft3.setTint(0x00ff00) : nft3.clearTint();
                });


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
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.bExtraHealthPotions = !this.bExtraHealthPotions;
                    (this.bExtraHealthPotions === true) ? nft4.setTint(0x00ff00) : nft4.clearTint();
                });


    /*    nft5.setInteractive()
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
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.bExtraSword = !this.bExtraSword;
                    (this.bExtraSword === true) ? nft5.setTint(0x00ff00) : nft5.clearTint();
                });
    */

    }

    update() {
        
    }

    

}