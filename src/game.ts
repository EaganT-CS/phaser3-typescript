/**
 * @author       jaz
 * @copyright    lmao
 * @license      CSPAM
 */

import "phaser";
import { TitleScene } from "./scenes/title";

// main game configuration
const config: GameConfig = {
  scale: {
    width: 800,
    height: 600,
    parent: "game",
    mode: Phaser.Scale.FIT
  },
  type: Phaser.AUTO,
  parent: "game",
  scene: TitleScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  }
};

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  var game = new Game(config);
});
