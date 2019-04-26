/**
 * @author       jaz
 * @copyright    lmao
 * @license      CSPAM
 */

export class TitleScene extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;
    private lastTime: number;
    private floor: Phaser.Physics.Arcade.Group

    constructor() {
        super({
            key: 'Title',
        });
    }

    preload(): void {
        this.load.image('turkey', './src/assets/turkey.png');
        this.load.image('termon', './src/assets/turkey4x.png')
        this.load.image('trongo', './src/assets/turkey4x.png')
        this.load.image('fire', './src/assets/fire.png');
    }

    create(): void {
        let particles = this.add.particles('fire');

        let emitter = particles.createEmitter({
            speed: 50,
            scale: { start: 5, end: 0 },
            blendMode: 'ADD',
        });
        let turkey = this.physics.add.image(400, 100, 'turkey');
        let termon = this.physics.add.image(400, 100, 'termon')
        let trongo = this.physics.add.image(400, 100, 'trongo')

        turkey.setVelocity(100, 200);
        turkey.setBounce(1, 1);
        turkey.setCollideWorldBounds(true);
        turkey.setScaleMode(Phaser.ScaleModes.NEAREST)
        turkey.setScale(4)
        termon.setVelocity(100, 200);
        termon.setBounce(1, 1);
        termon.setCollideWorldBounds(true);
        trongo.setVelocity(100, 200);
        trongo.setBounce(1, 1);
        trongo.setCollideWorldBounds(true);
        this.floor = this.physics.add.group([turkey,termon,trongo])
        Phaser.Actions.PlaceOnLine(this.floor.getChildren(),new Phaser.Geom.Line(0,300,800,300))

        emitter.startFollow(turkey);
    }

    update(time: number): void {
        let diff = time - this.lastTime
        this.lastTime = time
    }
}
