import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  datas: any;

  ionViewDidLoad() {
    this.datas = this.dataProvider.PhoneticAlphabets;
  }
  ionViewDidLeave(){
    this.createBanner();
    setInterval(this.showVideoRewardAd(), 150000);
  }

  admobId: any;
  isTest : boolean = false;
  idBanner: string;
  idInterstitial: string;
  idReward: string;
  platformCheck: any;

  constructor(
    private dataProvider: DataProvider,
    private navCtrl: NavController,
    private adMobFree: AdMobFree,
    private platForm: Platform
  ) {
    if (this.platForm.is('ios')) {
      this.idBanner = 'ca-app-pub-9309829064818731/6982635895'
      this.idInterstitial = 'ca-app-pub-9309829064818731/5288380469'
      this.idReward = 'ca-app-pub-9309829064818731/4685745234'
    } else if (this.platForm.is('android')) {
      this.idBanner = 'ca-app-pub-9309829064818731/4071092595'
      this.idInterstitial = 'ca-app-pub-9309829064818731/3894164476'
      this.idReward = 'ca-app-pub-9309829064818731/2773488644'
    }
    this.platformCheck = this.platForm._platforms;
  }

  // ---------------------------------------------

  createBanner() {

    const bannerConfig: AdMobFreeBannerConfig = {
      id: this.idBanner,
      isTesting: this.isTest,
      autoShow: true
    };
    this.adMobFree.banner.config(bannerConfig);
    this.adMobFree.banner.prepare()
      .then(() => {
        this.adMobFree.banner.show();
      })
      .catch(e => console.log(e));
  }

  showInterstitial() {

    const interstitialConfig: AdMobFreeBannerConfig = {
      id: this.idInterstitial,
      isTesting: this.isTest,
      autoShow: true
    };
    this.adMobFree.interstitial.config(interstitialConfig);

    this.adMobFree.interstitial.prepare()
      .then(() => {
        this.adMobFree.interstitial.show();
      })
      .catch(e => console.log(e));
  }

  showVideoRewardAd() {

    const rewardConfig: AdMobFreeBannerConfig = {
      id: this.idReward,
      isTesting: this.isTest,
      autoShow: true
    };
    this.adMobFree.rewardVideo.config(rewardConfig);
    this.adMobFree.rewardVideo.prepare()
      .then(() => {
        this.adMobFree.rewardVideo.show();
      })
      .catch(e => console.log(e));
  }

}
