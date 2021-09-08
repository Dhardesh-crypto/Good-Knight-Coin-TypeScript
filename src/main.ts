import Phaser from 'phaser'

import GoodKnightCoinScene from './scenes/GoodKnightCoinScene'
import Welcome from './scenes/Welcome'
import GameOverScene from './scenes/GameOverScene'
import CongratulationsScene from './scenes/CongratulationsScene'

const config = {
    type: Phaser.AUTO,
    dom: {
        createContainer: true
    },
    width: 1200,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
	scene: [
        Welcome, 
        GoodKnightCoinScene, 
        GameOverScene,
        CongratulationsScene
    ]
}

export default new Phaser.Game(config)
