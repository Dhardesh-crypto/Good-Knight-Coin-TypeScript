import CustomButton from "./CustomButton";

const NFT_ONE_KEY = 'NFT-Knight-Flight';
const NFT_TWO_KEY = 'NFT-Knight-Protect';
const NFT_THREE_KEY = 'NFT-Knight-Speed';
const NFT_FOUR_KEY = 'NFT-Knight-Life';
const NFT_FIVE_KEY = 'NFT-Knight-Night';
const SHOPPING_CART = 'ShoppingCart';

const BUTTON_NORMAL = 'buttonNormal';
const BUTTON_HOVER = 'buttonHover';
const BUTTON_CLICKED = 'buttonClicked';
const BUTTON_LOCKED = 'buttonLocked';
const GREY_PANEL = 'greyPanel';


export default class NFTSettingsScene extends Phaser.Scene {

    private NFTstring!: string;
    private nftArray!: any;
    private nftNames: string[] = [];

    private buttonBack! : Phaser.GameObjects.Container;
    private buttonActivate! : Phaser.GameObjects.Container;

    private buttonEquip1! : Phaser.GameObjects.Container;
    private buttonEquip2! : Phaser.GameObjects.Container;
    private buttonEquip3! : Phaser.GameObjects.Container;
    private buttonEquip4! : Phaser.GameObjects.Container;
    private buttonEquip5! : Phaser.GameObjects.Container;
    private shoppingPanel! : Phaser.GameObjects.Container;
    private bShowPanel!: boolean = false;

    private moralisUser! : string;
    private bExtraJump: boolean = false;
    private bExtraProtect: boolean = false;
    private bExtraSpeed: boolean = false;
    private bExtraHealthPotions: boolean = false;
    private bExtraSword: boolean = false;

    private bPrevExtraJump: boolean = false;
    private bPrevExtraProtect: boolean = false;
    private bPrevExtraSpeed: boolean = false;
    private bPrevExtraHealthPotions: boolean = false;
    private bPrevExtraSword: boolean = false;
    private bPurchased: boolean = false;

    private localStorageKey: string = 'GoodKnightCoinV1';
    private localPurchaseKey: string = 'GoodKnightCoinV1P';
    private localAmountKey: string = 'GoodKnightCoinV1A';

    private localStoredPerks: string = '{}';
    private localPurchasedPerks: boolean = false;
    private localAmountPerks: string = '{}';

    private amountKnightFlight: integer = 0;
    private amountKnightProtect: integer = 0;
    private amountKnightSpeed: integer = 0;
    private amountKnightHealingPotions: integer = 0;
    private amountKnightSword: integer = 0;

    constructor() {
        super('set-nfts-scene');

      }

    init(data) {
        // Using cookies to rememberlast settings
        this.localStoredPerks = (localStorage.getItem(this.localStorageKey) == null) ? '{}' : localStorage.getItem(this.localStorageKey);
        const perksJSON = JSON.parse(this.localStoredPerks);
        this.moralisUser = data.moralisUser;
        this.bExtraJump = (perksJSON?.bExtraJump) ? perksJSON.bExtraJump : data.bExtraJump;
        this.bExtraProtect =  (perksJSON?.bExtraProtect) ? perksJSON.bExtraProtect : data.bExtraProtect;
        this.bExtraSpeed =  (perksJSON?.bExtraSpeed) ? perksJSON.bExtraSpeed : data.bExtraSpeed;
        this.bExtraHealthPotions =  (perksJSON?.bExtraHealthPotions) ? perksJSON.bExtraHealthPotions : data.bExtraHealthPotions;
        this.bExtraSword =  (perksJSON?.bExtraSword) ? perksJSON.bExtraSword : data.bExtraSword;

        // Using cookies to rememberlast settings
        this.localAmountPerks = (localStorage.getItem(this.localAmountKey) == null) ? '{}' : localStorage.getItem(this.localAmountKey);
        const amountsJSON = JSON.parse(this.localAmountPerks);
        this.amountKnightFlight = (amountsJSON?.Jump) ? amountsJSON.Jump : 0;
        this.amountKnightProtect =  (amountsJSON?.Protect) ? amountsJSON.Protect : 0;
        this.amountKnightSpeed =  (amountsJSON?.Speed) ? amountsJSON.Speed : 0;
        this.amountKnightHealingPotions =  (amountsJSON?.Potions) ? amountsJSON.Potions : 0;
        this.amountKnightSword =  (amountsJSON?.Sword) ? amountsJSON.Sword : 0;

        console.log(`{ "Jump": ${this.amountKnightFlight}, "Protect": ${this.amountKnightProtect}, "Speed": ${this.amountKnightSpeed}, "Potions": ${this.amountKnightHealingPotions}, "Sword": ${this.amountKnightSword}}`);
        // Storing previous settings in case of using Back button instead of activating
        this.bPrevExtraJump = data.bExtraJump;
        this.bPrevExtraProtect = data.bExtraProtect;
        this.bPrevExtraSpeed = data.bExtraSpeed;
        this.bPrevExtraHealthPotions = data.bExtraHealthPotions;
        this.bPrevExtraSword = data.bExtraSword;

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

        this.load.image(SHOPPING_CART, 'assets/shoppingCart.png');
        this.load.image(GREY_PANEL, 'assets/grey_panel.png');

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

    create() 
    {
        this.cameras.main.fadeIn(1000,0,0,0);

        this.add.text(190, 680, '1. Purchase perks with the shoppingcart.\n2. Click on a perk/NFT to enable it.\n3. Click Activate to use it during gameplay.', { fontSize: '32px', fill: '#fff' });
        this.buttonBack = new CustomButton(this, 85, 65, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, false, 'BACK', { fontSize: '48px', fill: '#000' }).setScale(0.4);
        this.add.existing(this.buttonBack);
       
          this.buttonBack.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.cameras.main.fadeOut(1000,0,0,0);

                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
    
                    this.scene.start('welcome',  
                        { moralisUser: this.moralisUser, 
                            bExtraJump: this.bPrevExtraJump,
                            bExtraProtect: this.bPrevExtraProtect,
                            bExtraSpeed: this.bPrevExtraSpeed,
                            bExtraHealthPotions: this.bPrevExtraHealthPotions,
                            bExtraSword: this.bPrevExtraSword
                        });
                });
            });

            this.buttonActivate = new CustomButton(this, 85, 150, BUTTON_NORMAL, BUTTON_HOVER, BUTTON_CLICKED, BUTTON_LOCKED, false, 'ACTIVATE', { fontSize: '48px', fill: '#000' }).setScale(0.4);
            this.add.existing(this.buttonActivate);
           
              this.buttonActivate.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    localStorage.setItem(
                        this.localStorageKey, 
                        `{ "bExtraJump": ${this.bExtraJump}, "bExtraProtect": ${this.bExtraProtect}, "bExtraSpeed": ${this.bExtraSpeed}, "bExtraHealthPotions": ${this.bExtraHealthPotions}, "bExtraSword": ${this.bExtraSword}}`
                    );

                    this.cameras.main.fadeOut(1000,0,0,0);

                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        
                        this.scene.start('welcome',  
                            { moralisUser: this.moralisUser, 
                                bExtraJump: this.bExtraJump,
                                bExtraProtect: this.bExtraProtect,
                                bExtraSpeed: this.bExtraSpeed,
                                bExtraHealthPotions: this.bExtraHealthPotions,
                                bExtraSword: this.bExtraSword
                            });
                    });
                });
    
        this.shoppingPanel = this.add.container(this.scale.width +155, 220).setDepth(3);
        const panel = this.add.image(0, 0, GREY_PANEL).setScale(3);
        this.shoppingPanel.add(panel);
        const kfText = this.add.text(-130, -100, '5x KnightFlight  1.00 EUR', { fontSize: '16px', color: '#000' });
        this.shoppingPanel.add(kfText);
        const ksText = this.add.text(-130, -70,  '5x KnightSpeed   1.00 EUR', { fontSize: '16px', color: '#000' });
        this.shoppingPanel.add(ksText);
        const kpText = this.add.text(-130, -40,  '5x KnightProtect 1.00 EUR', { fontSize: '16px', color: '#000' });
        this.shoppingPanel.add(kpText);
        const klText = this.add.text(-130, -10,   '5x KnightLife    1.00 EUR', { fontSize: '16px', color: '#000' });
        this.shoppingPanel.add(klText);
        const taxText = this.add.text(-25, 20,    'Taxes 0.84 EUR', { fontSize: '16px', color: '#000' });
        this.shoppingPanel.add(taxText);
        const totalText = this.add.text(-25, 50,  'Total 4.84 EUR', { fontSize: '16px', color: '#000', fontStyle: 'bold' });
        this.shoppingPanel.add(totalText);
        const usePPText = this.add.text(-75, 80,  'Use the Paypal button\nto purchase', { fontSize: '16px', color: '#000', fontStyle: 'bold' });
        this.shoppingPanel.add(usePPText);
 
        const shoppingCartButton = this.add.image(this.scale.width - 40, 40, SHOPPING_CART).setScale(0.7);
        shoppingCartButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                shoppingCartButton.setTint(0x70c244);
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                shoppingCartButton.clearTint();
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                shoppingCartButton.setTint(0x11ff11);
                this.toggleShow();

            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                shoppingCartButton.setTint(0x70c244);
            })

        const txtNFT1Amount = this.add.text(190, 90, `${this.amountKnightFlight} x `, { fontSize: '32px', fill: '#fff' });
        const txtNFT2Amount = this.add.text(190, 240, `${this.amountKnightProtect} x `, { fontSize: '32px', fill: '#fff' });
        const txtNFT3Amount = this.add.text(190, 390, `${this.amountKnightSpeed} x `, { fontSize: '32px', fill: '#fff' });
        const txtNFT4Amount = this.add.text(190, 540, `${this.amountKnightHealingPotions} x `, { fontSize: '32px', fill: '#fff' });
        // const txtNFT1Amount = this.add.text(190, 690, `${this.amountKnightFlight} x `, { fontSize: '32px', fill: '#fff' });

  
        const nft1 = this.add.image(450, 100, NFT_ONE_KEY).setScale(0.3).setDepth(1); // KnightFlight, this.bExtraJump
        (this.bExtraJump === true) ? nft1.setTint(0x70c244) : nft1.clearTint();
        const nft2 = this.add.image(450, 250, NFT_TWO_KEY).setScale(0.3).setDepth(1); // KnightProtect, this.bExtraProtect
        (this.bExtraProtect === true) ? nft2.setTint(0x70c244) : nft2.clearTint();
        const nft3 = this.add.image(450, 400, NFT_THREE_KEY).setScale(0.3).setDepth(1); // KnightSpeed, this.bExtraSpeed
        (this.bExtraSpeed === true) ? nft3.setTint(0x70c244) : nft3.clearTint();
        const nft4 = this.add.image(450, 550, NFT_FOUR_KEY).setScale(0.3).setDepth(1); // KnightLife, this.bExtraHealthPotions
        (this.bExtraHealthPotions === true) ? nft4.setTint(0x70c244) : nft4.clearTint();
       // const nft5 = this.add.image(450, 700, NFT_FIVE_KEY).setScale(0.3).setDepth(1); // KnightNight, this.bExtraSword
       // (this.bExtraSword === true) ? nft5.setTint(0x70c244) : nft5.clearTint();

        nft1.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                    this.tweens.add(
                        {
                            targets: nft1,
                            x: 675,
                            y: 175,
                            scale: 0.6,
                            duration: 300,
                            ease: Phaser.Math.Easing.Sine.InOut
                        })
                    nft1.setDepth(2);
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                    this.tweens.add(
                        {
                            targets: nft1,
                            x: 450,
                            y: 100,
                            scale: 0.3,
                            duration: 300,
                            ease: Phaser.Math.Easing.Sine.InOut
                        }
                    )
                    nft1.setDepth(1);
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    if (this.amountKnightFlight > 0) {
                        this.bExtraJump = !this.bExtraJump;
                        (this.bExtraJump === true) ? nft1.setTint(0x70c244) : nft1.clearTint();
                    }
                    else {
                        alert('Please, purchase the perks in the shoppingcart first!');
                    } 
                });

        nft2.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                    this.tweens.add(
                        {
                            targets: nft2,
                            x: 675,
                            y: 300,
                            scale: 0.6,
                            duration: 300,
                            ease: Phaser.Math.Easing.Sine.InOut
                        })
                    nft2.setDepth(2);
            
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                    this.tweens.add(
                        {
                            targets: nft2,
                            x: 450,
                            y: 250,
                            scale: 0.3,
                            duration: 300,
                            ease: Phaser.Math.Easing.Sine.InOut
                        })
                    nft2.setDepth(1);
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    if (this.amountKnightProtect > 0) {
                        this.bExtraProtect = !this.bExtraProtect;
                        (this.bExtraProtect === true) ? nft2.setTint(0x70c244) : nft2.clearTint();
                    }
                    else {
                        alert('Please, purchase the perks in the shoppingcart first!');
                    } 
                });


        nft3.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                    this.tweens.add(
                        {
                            targets: nft3,
                            x: 675,
                            y: 475,
                            scale: 0.6,
                            duration: 300,
                            ease: Phaser.Math.Easing.Sine.InOut
                        })
                    nft3.setDepth(2);
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                    this.tweens.add(
                        {
                            targets: nft3,
                            x: 450,
                            y: 400,
                            scale: 0.3,
                            duration: 300,
                            ease: Phaser.Math.Easing.Sine.InOut
                        })
                    nft3.setDepth(1);
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    if (this.amountKnightSpeed > 0) {
                        this.bExtraSpeed = !this.bExtraSpeed;
                        (this.bExtraSpeed === true) ? nft3.setTint(0x70c244) : nft3.clearTint();
                    }
                    else {
                        alert('Please, purchase the perks in the shoppingcart first!');
                    } 
                });


        nft4.setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                    this.tweens.add(
                        {
                            targets: nft4,
                            x: 675,
                            y: 575,
                            scale: 0.6,
                            duration: 300,
                            ease: Phaser.Math.Easing.Sine.InOut
                        })
                    nft4.setDepth(2);
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                    this.tweens.add(
                        {
                            targets: nft4,
                            x: 450,
                            y: 550,
                            scale: 0.3,
                            duration: 300,
                            ease: Phaser.Math.Easing.Sine.InOut
                        })
                    nft4.setDepth(1);
                })
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    if (this.amountKnightHealingPotions > 0) {
                        this.bExtraHealthPotions = !this.bExtraHealthPotions;
                        (this.bExtraHealthPotions === true) ? nft4.setTint(0x70c244) : nft4.clearTint();
                    }
                    else {
                        alert('Please, purchase the perks in the shoppingcart first!');
                    }
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

    toggleShow() {
        this.bShowPanel = !this.bShowPanel;

        if (this.bShowPanel) {
            this.tweens.add({
                targets: this.shoppingPanel,
                x: this.scale.width -155,
                duration: 300,
                ease: Phaser.Math.Easing.Sine.InOut
            })
        }
        else {
            this.tweens.add({
                targets: this.shoppingPanel,
                x: this.scale.width + 155,
                duration: 300,
                ease: Phaser.Math.Easing.Sine.InOut
            })        
        }
    }

    update() {
        
    }

    

}