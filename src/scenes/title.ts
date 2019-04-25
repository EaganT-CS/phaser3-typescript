/**
 * @author       jaz
 * @copyright    lmao
 * @license      CSPAM
 */

export class TitleScene extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: 'Title',
         });
    }

    preload(): void {
        this.load.image('logo', './src//assets/phaser.png');
        this.load.image('fire', './src//assets/fire.png');
    }

    create(): void {
        var particles = this.add.particles('fire');

        var emitter = particles.createEmitter({
            speed: 50,
            scale: { start: 5, end: 0 },
            blendMode: 'ADD',
        });
        var logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);
    }
}
