import { Player } from './Player';
import { type Direction } from './PlayerMove';
import { Enemy } from './Enemy';
import { InputHandler } from './InputHandler';

export class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    player: Player;
    enemies: Enemy[] = [];
    inputHandler: InputHandler;
    score: number = 0;
    roundTime: number = 60;
    gameRunning: boolean = false;
    enemySpawnInterval: number = 1;
    animationFrameId: number = 1;

    timeScale: number = 1;
    slowMotionScale: number = 0.1;
    slowMotionDuration: number = 9000;
    isSlowMotion: boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')!;
        this.player = new Player(64, 64, 32, 32);
        this.inputHandler = new InputHandler();
        this.setupInputBindings();
    }

    startGame() {
        this.gameRunning = true;
        this.score = 0;
        this.roundTime = 60;
        this.enemies = [];
        this.gameLoop();
    }

    gameLoop() {
        if (this.gameRunning) {
            this.update();
            this.draw();
    
            this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
        } else {
            clearInterval(this.enemySpawnInterval);
        }
    }

    update() {
       
        this.player.update(this.canvas);
        this.updateEnemies();
    }

    draw() {
        this.clearCanvas();
        this.player.draw(this.context);
        this.enemies.forEach(enemy => enemy.draw(this.context));
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setupInputBindings() {
        for (const [key, action] of Object.entries(this.inputHandler.keyBindings)) {
       
            console.log(key)
            this.inputHandler.registerAction(
                action as Direction,
                () => this.player.move(action as Direction), 
                () => this.player.beat(action as Direction)
            );
        }
        // this.inputHandler.registerAction('kombo', () => this.activateSlowMotion(), () => {});
    }

    // activateSlowMotion() {
    //     if (!this.isSlowMotion) {
    //         this.isSlowMotion = true;
    //         this.timeScale = this.slowMotionScale;
    //         this.player.timeScale = this.slowMotionScale;
    //         this.enemies.forEach(enemy => enemy.timeScale = this.slowMotionScale);
    //         setTimeout(() => this.deactivateSlowMotion(), this.slowMotionDuration);
    //     }
    // }

    // deactivateSlowMotion() {
    //     this.timeScale = 1;
    //     this.player.timeScale = 1;
    //     this.enemies.forEach(enemy => enemy.timeScale = 1);
    //     this.isSlowMotion = false;
    // }

    updateEnemies() {
        this.enemies.forEach(enemy => enemy.update(this.player));
        this.enemies = this.enemies.filter(enemy => enemy.isAlive());
    }

    stopGame() {
        cancelAnimationFrame(this.animationFrameId);
        clearInterval(this.enemySpawnInterval);
    }
}
