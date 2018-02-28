import {ISaver} from './i.saver';
import {GameConfig, PublishMode} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';
import {Animation} from '../../utils/animation/anim';
import {ImageUtils} from '../../utils/images/image.utils';
import {TweenUtils} from '../../utils/tween.utils';

export class FadeBigSaver implements ISaver {

    private game: Phaser.Game;
    private state: Phaser.State;
    private onInCallback?: Function;
    private onOutCallback?: Function;
    private container: Phaser.Group = null;
    private vs: Phaser.Button = null;
    private blocker: Phaser.Graphics = null;
    private part: Phaser.Sprite = null;
    private inAnimation: Animation = null;
    private outAnimation: Animation = null;
    static initialized: boolean = false;

    constructor() {
        this.game = GameConfig.GAME;
    }

    init(state: Phaser.State, x: number = 480, y: number = 360): void {
        this.state = state;
        this.container = this.game.add.group();
        this.container.add(this.blocker = this.game.add.graphics(0, 0));
        this.blocker.beginFill(0, 0);
        this.blocker.drawRect(0, 0, 960, 720);
        this.blocker.inputEnabled = true;
        this.container.add(
            this.container.add(this.part = this.game.make.sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesSaver').getName(),
                ImageUtils.getAtlasClass('AtlasesSaver').Frames.Part
            ))
        );
        if (GameConfig.PUB_MODE === PublishMode.NORMAL) {
            this.part.inputEnabled = true;
            this.part.events.onInputDown.add(GuiUtils.goLinkMainLogo);
        }
        this.vs = GuiUtils.makeButton(
            this.state, this.container,
            0, 0, 1,
            '', ImageUtils.getAtlasClass('AtlasesSaver').getName(),
            ImageUtils.getAtlasClass('AtlasesSaver').Frames.Vs,
            GameConfig.PUB_MODE === PublishMode.NORMAL ? true : false,
            false, true, GameConfig.PUB_MODE === PublishMode.NORMAL ? GuiUtils.goLinkMainLogo : null);
        this.vs.position.setTo(x, y);
        this.part.position.setTo(0, 0);
        GuiUtils.centrize(this.part);
        if (FadeBigSaver.initialized) {
            //
        } else {
            this.blocker.x = 960;
            this.vs.scale.setTo(0);
            this.vs.alpha = 0;
            this.part.scale.setTo(0);
            this.part.alpha = 0;
            // FadeBigSaver.initialized = true;
        }
    }

    setOnInCallback(callback?: Function): void {
        this.onInCallback = callback;
    }

    setOnOutCallback(callback?: Function): void {
        this.onOutCallback = callback;
    }

    fadeIn(): void {
        // this.inAnimation.animate(this.onInCallback);
        if (FadeBigSaver.initialized) {
            /*TweenUtils.slideIn(this.blocker, 0, 5, 0);
            TweenUtils.customFadeAndScaleIn(this.part, 1, 1, 500, 0);
            TweenUtils.customFadeAndScaleIn(this.vs, 1, 1, 500, 500, this.onInCallback);*/
            TweenUtils.fadeAndScaleOut(this.vs, 500, 0);
            TweenUtils.fadeAndScaleOut(this.part, 1000, 0);
            TweenUtils.slideOut(this.blocker, 960, 5, 800, this.onInCallback);
        }
        else {
            FadeBigSaver.initialized = true;
        }
    }

    fadeOut(): void {
        // this.outAnimation.animate(this.onOutCallback);
        /*TweenUtils.fadeAndScaleOut(this.vs, 1000, 800);
        TweenUtils.fadeAndScaleOut(this.part, 1000, 800);
        TweenUtils.slideOut(this.blocker, 960, 5, 1800, this.onOutCallback);*/
        TweenUtils.slideIn(this.blocker, 0, 5, 0);
        TweenUtils.customFadeAndScaleIn(this.part, 1, 1, 500, 0);
        TweenUtils.customFadeAndScaleIn(this.vs, 1, 1, 500, 0);
        TweenUtils.delayedCall(2000, this.onOutCallback);
    }

    dispose(): void {
        if (this.part) this.part.destroy(true);
        if (this.vs) this.vs.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
        if (this.container) this.container.destroy(true);
    }
}