/**
 * @author       jaz
 * @copyright    lmao
 * @license      CSPAM
 */

export class TitleScene extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;
    private lastTime: number;
    private floor: Phaser.Physics.Arcade.Group;

    constructor() {
        super({
            key: 'Title',
        });
    }

    preload(): void {
        this.load.image('turkey', './src/assets/turkey.png');
        this.load.image('termon', './src/assets/turkey4x.png');
        this.load.image('trongo', './src/assets/turkey4x.png');
        this.load.image('fire', './src/assets/fire.png');
    }

    create(): void {
        let fire = this.add.particles('fire', 0, [
            { speed: 50, scale: { start: 5, end: 0 }, blendMode: Phaser.BlendModes.ADD },
            { speed: 50, scale: { start: 5, end: 0 }, blendMode: Phaser.BlendModes.ADD },
            { speed: 50, scale: { start: 5, end: 0 }, blendMode: Phaser.BlendModes.ADD },
        ]);
        let turkeyParticles = this.add.particles('turkey', 0, [
            { speed: 100, scale: { start: 10, end: 0 }, blendMode: Phaser.BlendModes.SCREEN, bounce:3,bounds: new Phaser.Geom.Rectangle(0,0,300,300)},
            { speed: 50, scale: { start: 5, end: 0 }, blendMode: Phaser.BlendModes.ADD },
            { speed: 50, scale: { start: 5, end: 0 }, blendMode: Phaser.BlendModes.ADD },
        ]);
        let turkey = this.physics.add.image(400, 100, 'turkey');

        turkey.setVelocity(100, 200);
        turkey.setBounce(1, 1);
        turkey.setCollideWorldBounds(true);
        turkey.setScaleMode(Phaser.ScaleModes.NEAREST);
        turkey.setScale(4);
        this.floor = this.physics.add.group([turkey]);
        Phaser.Actions.PlaceOnLine(this.floor.getChildren(), new Phaser.Geom.Line(0, 300, 800, 300));
        turkeyParticles.emitters.list[0].startFollow(turkey);
    }

    update(time: number): void {
        let diff = time - this.lastTime;
        this.lastTime = time;
    }
}
