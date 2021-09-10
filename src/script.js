// Application id from moralis.io
Moralis.initialize('iXrIAo95USwRZUbHFzS3CIvD2iGezWbYrZWVjZFC');
//Server url from moralis.io
Moralis.serverURL = 'https://6vsvjpvchvem.bigmoralis.com:2053/server';

let moralisUser = login;
async function login() {
    try {
        let user = await Moralis.Web3.authenticate();
        console.log(user);
        alert("User logged in")
        return user
    } catch (error) {
        console.log(error);
    }
}

async function postScore() {
    try {
        let user = await Moralis.Web3.authenticate();
        const GoodKnightScore = Moralis.Object.extend("GoodKnightScore");
        const goodKnightScore = new GoodKnightScore();
        goodKnightScore.set("sender", user.get('ethAddress'));
        goodKnightScore.set("score", 1500);
        console.log(user.get('ethAddress') + " scored " + 1500);
        let result = await goodKnightScore.save();
        console.log(goodKnightScore); 
        alert('Token claim submitted to collective airdrop dataset.\nThank you for submitting...');

    }
    catch (error) {
        console.log(error);
    }
}

async function getNFTs() {
    try {
        let user = await Moralis.Web3.authenticate();
        const userEthNFTs = await Moralis.Web3API.account.getNFTs();
        document.getElementById('nft-info').value = JSON.stringify(userEthNFTs);

        const options = { addresses: "0x3df128ee3860d4ba9112b7edefa790c9492ecd2e" };
        const tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
        console,log(tokenMetadata);
    }
    catch (error) {
        console.log(error);
    }
}

document.getElementById("login_button").onclick = login;
document.getElementById("post-score").onclick = postScore;
document.getElementById("fetch-nfts").onclick = getNFTs;