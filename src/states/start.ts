import * as AssetUtils from '../utils/asset.utils';
import {IGui, StateType} from './gui/i.gui';
import {AssetMode, GameConfig, PublishMode, Sites} from '../config/game.config';
import {GuiMcg} from './gui/mcg.gui';
import {GuiDu} from './gui/du.gui';
import {GuiFgc} from './gui/fgc.gui';
import {ISaver} from './saver/i.saver';
import {GuiUtils} from '../utils/gui.utils';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {EffectUtils} from '../utils/effect.utils';
import {PreloaderUtils} from '../utils/preloader.utils';
import {IParticle} from './spec-effects/particle/i.particle';
import {FallParticles} from './spec-effects/particle/fall.particle';

export default class Start extends Phaser.State {

    private NEXT = 'Dress1';
    private nextPrepared = false;

    private gui: IGui = null;
    private saver: ISaver = null;
    private particle: IParticle = null;
    private bg: Phaser.Sprite = null;
    private girl1: Phaser.Sprite = null;
    private girl2: Phaser.Sprite = null;
    private girl3: Phaser.Sprite = null;
    private title: Phaser.Sprite = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        switch (GameConfig.SITE) {
            case Sites.MY_CUTE_GAMES:
            {
                this.gui = new GuiMcg(this, StateType.START_STATE);
                break;
            }
            case Sites.DRESSUP_MIX:
            {
                this.gui = new GuiDu(this, StateType.START_STATE);
                break;
            }
            case Sites.FREE_GAMES_CASUAL:
            {
                this.gui = new GuiFgc(this, StateType.START_STATE);
                break;
            }
        }
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg1').getName());

        this.girl3 = this.game.add.sprite(29 - 700, 51,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gr3);
        this.girl2 = this.game.add.sprite(466 + 700, 53,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gr2);
        this.girl1 = this.game.add.sprite(271 - 700, 34,
            ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Gr1);
	
	    this.particle = new FallParticles(.9, 1.1);
	    this.particle.init(
		    ImageUtils.getAtlasClass('AtlasesEffects').getName(),
		    [
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.GStar1,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.GStar2,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.GStar3,
		    ]);
	    this.particle.start();
     
	    this.title = this.game.add.sprite(155, 287,
		    ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Title);
	    GuiUtils.centrize(this.title);
	    this.title.scale.setTo(0);
	    this.title.alpha = 0;

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
        const playBtn = this.gui.addPlayBtn(this.nextState);
        playBtn.scale.setTo(0);
        playBtn.alpha = 0;

        // Try to retrieve Saver OR else fade effect will apply
        this.saver = GuiUtils.getSaver();

        if (this.saver) {
            this.saver.init(this, 479, 592);
            this.saver.fadeIn();
        } else {
            this.game.camera.flash(0x000000, 1000);
        }
        // ONLY FOR START STATE !!!!!!!!!!!!!!!!!
        if (!GameConfig.GAME_COMPLETED)
            this.game.camera.flash(0x000000, 1000);

        // Animations goes here
        TweenUtils.slideIn(this.girl1, 271, 1000, 1000);
        TweenUtils.slideIn(this.girl2, 466, 1000, 1500);
        TweenUtils.slideIn(this.girl3, 29, 1000, 2000)
        TweenUtils.fadeAndScaleIn(this.title, 750, 3000, () => {
            TweenUtils.customFadeAndScaleIn(playBtn, 1, 1.3, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0);
	        EffectUtils.makeLightRotateAnimation(this.title, 1000, 3);
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // Loads
            PreloaderUtils.preloadComixState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        if (this.bg) this.bg.destroy(true);
        if (this.particle) this.particle.dispose();
        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
        this.gui.dispose();
        if (this.saver !== null) this.saver.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
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

