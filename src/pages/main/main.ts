import { Tabs3Page } from './../tabs3/tabs3';
import { Tabs2Page } from './../tabs2/tabs2';
import { TabsPage } from './../tabs/tabs';

import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';


import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';



@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage  implements OnInit {

  ngOnInit() {

    this.createBanner();

  }

  admobId: any;
  isTest : boolean = false;
  idBanner: string;
  idInterstitial: string;
  idReward: string;
  platformCheck: any;

  constructor(
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

  
  codeFunction() {
    this.navCtrl.push(TabsPage)
  }
  sceneFunction() {
    this.navCtrl.push(Tabs2Page)
  }

  shotFunction() {
    this.navCtrl.push(Tabs3Page)

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
