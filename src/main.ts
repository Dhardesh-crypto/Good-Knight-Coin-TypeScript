import Phaser from 'phaser'

import GoodKnightCoinScene from './scenes/GoodKnightCoinScene'
import Welcome from './scenes/Welcome'
import GameOverScene from './scenes/GameOverScene'

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
            gravity: { y: 300 },
            debug: false
        }
    },
/*    plugins: {
        global: [
            { key: 'RpgCharacterPlugin', plugin: RpgCharacterPlugin, start: true }
        ]
    }, */
	scene: [
        Welcome, 
        GoodKnightCoinScene, 
        GameOverScene
    ]
}

export default new Phaser.Game(config)
