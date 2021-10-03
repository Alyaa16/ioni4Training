import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivityVideoPage } from '../activity-video/activity-video.page';
import { Activity } from '../models/activity';
import { ActivityService } from '../services/Activity/activity.service';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {

  activityDetail: Observable<Activity>;
  activityID: string;

  constructor(
    activityService: ActivityService,
    activatedRoute: ActivatedRoute,
    private _modalController: ModalController) {
    const activityID = activatedRoute.snapshot.params["activityID"];
    this.activityDetail=activityService.getActivity(activityID);
   }

  ngOnInit() {
    
  }

  async openModal(){
    const videoModal= await this._modalController.create({
      component:ActivityVideoPage
    });

    return  await this.activityDetail.subscribe((activity)=>{
      videoModal.componentProps={
        videoURL: activity.video_url
      }
      return  videoModal.present();
    });
  }

  async share(){
    this.activityDetail.subscribe(async (activity)=>{
      await Share.share({
        title: 'Look what i found on this app called rana',
        text: activity.name,
        url: activity.cropped,
        dialogTitle: 'Share with buddies',
      });
    })
  
  }
}
