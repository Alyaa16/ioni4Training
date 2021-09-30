import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity';
import { ActivityService } from '../services/Activity/activity.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {

  activityDetail: Observable<Activity>;
  activityID: string;

  constructor(activityService: ActivityService,activatedRoute: ActivatedRoute) {
    const activityID = activatedRoute.snapshot.params["activityID"];
    console.log(activityID);
    this.activityDetail=activityService.getActivity(activityID);
    console.log(this.activityDetail)
   }

  ngOnInit() {
    
  }

}
