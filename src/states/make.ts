import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {EffectUtils} from '../utils/effect.utils';
import {AdUtils} from '../utils/ad/ad.utils';
import {SoundUtils} from '../utils/sound/sound.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {ILaser} from './spec-effects/laser/i.laser';
import {DecorBackground} from './template/decor/decor.background';

export default class Make extends Phaser.State {

    private NEXT = 'Pread';
    private nextPrepared = false;
    private changing = false;

    private gui: IGui = null;
    private saver: ISaver = null;

    private bg: Phaser.Sprite = null;
    private mirror: Phaser.Sprite = null;
    private currentDecor: DecorBackground = null;
    private decorAnna: DecorBackground = null;
    private decorCindy: DecorBackground = null;
    private decorPoco: DecorBackground = null;
    private playBtn: Phaser.Button = null;
    private btnContainer: Phaser.Group = null;
    private btn1: Phaser.Button = null;
    private btn2: Phaser.Button = null;
    private btn3: Phaser.Button = null;
    private btn4: Phaser.Button = null;
    private btn5: Phaser.Button = null;
    private btn6: Phaser.Button = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    private cat1: boolean = false;
    private cat2: boolean = false;
    private cat3: boolean = false;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.DECOR_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.DECOR_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.DECOR_STATE);
                break;
            }
        }
        this.cat1 = false;
        this.cat2 = false;
        this.cat3 = false;
        this.changing = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.mirror = this.game.add.sprite(274, 33,
            ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
            ImageUtils.getAtlasClass('AtlasesStateMake').Frames.Mirror);

        this.decorAnna = new DecorBackground(274, 33)
            .layer('hair_b', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesGuiMcg').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiMcg').Frames.Dummy)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesGuiMcg').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiMcg').Frames.Dummy)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesGuiMcg').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiMcg').Frames.Dummy)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').Frames.HB3)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').Frames.HB4)
            .build()
            .sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesDollMakeAnna').getName(),
                ImageUtils.getAtlasClass('AtlasesDollMakeAnna').Frames.Body)
            .layer('lip', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').Frames.Lp)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').Frames.Lp1)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').Frames.Lp2)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').Frames.Lp3)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').Frames.Lp4)
            .build()
            .layer('shad', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').Frames.Sh)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').Frames.Sh1)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').Frames.Sh2)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').Frames.Sh3)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').Frames.Sh4)
            .build()
            .layer('res', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').Frames.Rs)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').Frames.Rs1)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').Frames.Rs2)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').Frames.Rs3)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna2').Frames.Rs4)
            .build()
            .layer('hair', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').Frames['H'])
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').Frames.H1)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').Frames.H2)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').Frames.H3)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeAnna').Frames.H4)
            .build();
        this.decorCindy = new DecorBackground(274, 33)
            .layer('hair_b', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesGuiMcg').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiMcg').Frames.Dummy)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesGuiMcg').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiMcg').Frames.Dummy)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').Frames.HB2)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').Frames.HB3)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesGuiMcg').getName(),
                    ImageUtils.getAtlasClass('AtlasesGuiMcg').Frames.Dummy)
                .build()
            .sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesDollMakeCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollMakeCindy').Frames.Body)
            .layer('lip', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').Frames.Lp)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').Frames.Lp1)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').Frames.Lp2)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').Frames.Lp3)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').Frames.Lp4)
            .build()
            .layer('shad', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').Frames.Sh)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').Frames.Sh1)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').Frames.Sh2)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').Frames.Sh3)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').Frames.Sh4)
            .build()
            .sprite(0, 0,
                ImageUtils.getAtlasClass('AtlasesDollMakeCindy').getName(),
                ImageUtils.getAtlasClass('AtlasesDollMakeCindy').Frames.Eyes)
            .layer('hair', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').Frames['H'])
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').Frames.H1)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').Frames.H2)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').Frames.H3)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy').Frames.H4)
            .build()
            .layer('res', false)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').Frames.Rs)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').Frames.Rs1)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').Frames.Rs2)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').Frames.Rs3)
                .item(0, 0,
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').getName(),
                    ImageUtils.getAtlasClass('AtlasesDollMakeCindy2').Frames.Rs4)
            .build();

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesFg3').getName());

        this.decorAnna.show(true);
        this.decorCindy.hide(true);

        this.btnContainer = this.game.add.group();
        this.btn1 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                768, 120, 1,
                'lip', ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
                ImageUtils.getAtlasClass('AtlasesStateMake').Frames.LipBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn2 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                804, 257, 1,
                'shad', ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
                ImageUtils.getAtlasClass('AtlasesStateMake').Frames.ShadBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn3 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                770, 393, 1,
                'res', ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
                ImageUtils.getAtlasClass('AtlasesStateMake').Frames.ResBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn4 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                144, 486, 1,
                'hair', ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
                ImageUtils.getAtlasClass('AtlasesStateMake').Frames.HairBtn,
                true, true, true,
                this.onTool, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn5 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                15, 230, 1,
                'arrow', ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
                ImageUtils.getAtlasClass('AtlasesStateMake').Frames.ArrBtn,
                true, true, true,
                this.changeDoll, GuiUtils.addOverHandler, GuiUtils.addOutHandler);
        this.btn6 =
            GuiUtils.makeButton(
                this, this.btnContainer,
                15, 230, 1,
                'arrow', ImageUtils.getAtlasClass('AtlasesStateMake').getName(),
                ImageUtils.getAtlasClass('AtlasesStateMake').Frames.ArrBtn,
                GameConfig.PUB_MODE === PublishMode.NORMAL, true, GameConfig.PUB_MODE === PublishMode.NORMAL,
                GuiUtils.goLinkInMoreGames, GuiUtils.addOverHandler, GuiUtils.addOutHandler);

        this.btn1.scale.setTo(0);
        this.btn2.scale.setTo(0);
        this.btn3.scale.setTo(0);
        this.btn4.scale.setTo(0);
        this.btn5.scale.setTo(0);
        this.btn5.scale.setTo(0);
        this.btn1.alpha = 0;
        this.btn2.alpha = 0;
        this.btn3.alpha = 0;
        this.btn4.alpha = 0;
        this.btn5.alpha = 0;
        this.btn6.alpha = 0;

        // Initiations
        this.currentDecor = this.decorAnna;

        // GUI Buttons
        this.gui.addGui(GameConfig.PUB_MODE === PublishMode.DUW);
        if (GameConfig.PUB_MODE !== PublishMode.DUW) {
            const m = this.gui.addExtraMore(767, 570,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreE,
                GuiUtils.addOverScaleHandler, GuiUtils.addOutScaleHandler
            );
            const f = this.game.add.sprite(767, 570,
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').Frames.MoreF,
                this.gui.getContainer()
            );
            GuiUtils.centrize(f);
            f.alpha = 0;
            EffectUtils.makeLightRotateAnimation(m, 750);
            EffectUtils.makeLightRotateAnimation(f, 750);
            EffectUtils.makeAlphaAnimation(f, 1, 500);
        }
        this.playBtn = this.gui.addPlayBtn(this.nextState);
        this.playBtn.scale.setTo(0);
        this.playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }

        // Animations goes here
        TweenUtils.fadeAndScaleIn(this.btn1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1);
        TweenUtils.fadeAndScaleIn(this.btn2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.3);
        TweenUtils.fadeAndScaleIn(this.btn3, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.6);
        TweenUtils.fadeAndScaleIn(this.btn4, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1.9);
        TweenUtils.fadeAndScaleIn(this.btn5, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.2);
        TweenUtils.fadeAndScaleIn(this.btn6, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 2.5, () => {
            EffectUtils.makeScaleAnimation(this.btn5);
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            /*if (GameConfig.PUB_MODE !== PublishMode.NO_BUTTONS &&
                GameConfig.PUB_MODE !== PublishMode.NO_BUTTONS_ONE_AD &&
                GameConfig.PUB_MODE !== PublishMode.DUW &&
                GameConfig.PUB_MODE !== PublishMode.NORMAL) {
                PreloaderUtils.preloadDress1State();
                PreloaderUtils.preloadDress2State();
            }
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);*/
        }
    }

    private changeDoll(): void { // comment addd
        if (this.changing) return;
        this.changing = true;
        this.currentDecor.hide();
        if (this.currentDecor === this.decorAnna) {
            this.currentDecor = this.decorCindy;
        }
        else if (this.currentDecor === this.decorCindy) {
            this.currentDecor = this.decorPoco;
        }
        else {
            this.currentDecor = this.decorAnna;
        }
        this.game.time.events.add(Phaser.Timer.SECOND *  .5, () => {
            this.currentDecor.show();
            this.game.time.events.add(Phaser.Timer.SECOND *  1, () => {
                this.changing = false;
            }, this);
        }, this);
    }

    onTool(sprite: Phaser.Button) {
        const name = sprite.name;
        console.log(name);
        this.currentDecor.next(name);
        if (name === 'hair')
            this.currentDecor.next('hair_b');
        if (this.currentDecor === this.decorAnna) this.cat1 = true;
        if (this.currentDecor === this.decorCindy) this.cat2 = true;
        if (this.currentDecor === this.decorPoco) this.cat3 = true;
        if (this.cat1 && this.cat2 && this.cat3) {
            if (this.playBtn.alpha === 0) {
                TweenUtils.customFadeAndScaleIn(this.playBtn, 1, 1.3, 750);
            }
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();

        if (this.bg) this.bg.destroy(true);
        this.btn1.destroy(true);
        this.btn2.destroy(true);
        this.btn3.destroy(true);
        this.btn4.destroy(true);
        this.btn5.destroy(true);
        this.btn6.destroy(true);
        this.btnContainer.destroy(true);

        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);

        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();

        this.decorAnna.dispose();
        this.decorCindy.dispose();
        this.decorPoco.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        /*GameConfig.FREE_RESULT = {
            rapRum: this.decorRap.getIndex('rum') + 1,
            rapLip: this.decorRap.getIndex('lip') + 1,
            rapShad: this.decorRap.getIndex('shad') + 1,
            rapRes: this.decorRap.getIndex('res') + 1,
            elRum: this.decorElza.getIndex('rum') + 1,
            elLip: this.decorElza.getIndex('lip') + 1,
            elShad: this.decorElza.getIndex('shad') + 1,
            elRes: this.decorElza.getIndex('res') + 1,
        };*/
        this.gui.disable();
        if (this.saver) {
            this.saver.setOnOutCallback(() => {
                this.game.time.events.removeAll();
                this.game.tweens.removeAll();
                this.reallyGoNextState(true);
            });
            this.saver.fadeOut();
        } else {
            this.blocker = this.game.add.graphics(0, 0);
            this.blocker.beginFill(0);
            this.blocker.drawRect(0, 0, 960, 720);
            this.blocker.inputEnabled = true;
            this.blocker.alpha = 0;
            this.game.camera.onFadeComplete.addOnce(() => {
                this.game.time.events.removeAll();
                this.game.tweens.removeAll();
                this.game.camera.fade(0x000000, 1, true, 0);
                this.blocker.alpha = .85;
                this.reallyGoNextState(true);
            }, this);
            this.game.camera.fade(0x000000, 500, true, .85);
        }
    }

    private reallyGoNextState(addLoader: boolean = false): void {
        if (this.nextPrepared) {
            this.game.state.start(this.NEXT);
        } else {
            if (addLoader) {
                this.spinner = this.game.add.sprite(
                    this.game.world.centerX,
                    this.game.world.centerY,
                    ImageUtils.getImageClass('ImagesSpin').getName());
                this.spinner.anchor.setTo(.5, .5);
                // this.spinner.scale.setTo(.5);
                TweenUtils.rotate(this.spinner, 360, Phaser.Timer.SECOND * 1, 0, -1);
            }
            this.game.time.events.add(Phaser.Timer.SECOND *  .25, this.reallyGoNextState, this);
        }
    }
}

