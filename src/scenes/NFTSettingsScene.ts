
export default class NFTSettingsScene extends Phaser.Scene {

    private NFTstring!: string;
    private nftArray!: any;
    private nftNames: string[] = [];

    constructor() {
        super('set-nfts-scene');

      }

    init(data) {
      this.NFTstring = data.NFTstring;
      console.log('INIT Set NFT ', JSON.parse(this.NFTstring));
    }

    async preload() {
       this.nftArray =  JSON.parse(this.NFTstring).result;
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
    }

    create() {
        console.log('===============================================================================================================================================================');
        console.log('NFT Names = ', this.nftNames);
        console.log('===============================================================================================================================================================');
        for (var i = 0; i < this.nftNames.length; i++) {
            this.add.image(50, 100 +i*100, this.nftNames[i]).setScale(0.1);
        } 

    }

    update() {
        
    }

}