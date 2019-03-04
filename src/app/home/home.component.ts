import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/data.service';
import { Member } from '../model/member';
import { Story } from '../model/story';
import { Task } from '../model/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showStoryDashboard = false;
  showMemberDashboard = false;
  showDetails = false;
  startDate = new Date();
  reviewDate = new Date();
  workWeek = 0;
  team: Member[] = [];
  stories: Story[] = [];
  workDays: string[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.stories = this.dataService.stories.getValue();
    this.team = this.dataService.team.getValue();

    if (this.stories.length > 0 && this.team.length > 0)
      this.showDetails = true;
  }

  onBtnClick(value: string) {
    this.findNoOfDays();
    if (value == 'story') {
      this.showStoryDashboard = true;
      this.showMemberDashboard = false;
    } else if (value == 'member') {
      this.showMemberDashboard = true;
      this.showStoryDashboard = false;
    } else {
      this.showStoryDashboard = false;
      this.showMemberDashboard = false;
    }
  }

  getRole(member) {
    this.dataService.getAllTasksOf(member.id);
  }

  findNoOfDays() {
    this.workDays = this.getDateArray(this.startDate, this.reviewDate);
  }

  getDateArray(start, end) {
    const dt = new Date(start);
    const dtt = new Date(end);

    let arr = new Array();
    while (dt <= dtt) {
      const day = dt.getDay();
      if (day == 0) { // sunday
        dt.setDate(dt.getDate() + 1);
        continue;
      }
      if (day == 6 && this.workWeek == 0) {// saturday
        dt.setDate(dt.getDate() + 1);
        continue;
      }

      arr.push((new Date(dt)).toString().substring(4, 15)); //save only the Day MMM DD YYYY part
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  }

  getDayOfWeek() {
    const dayOfWeek = new Date(this.startDate).getDay();
    return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }

  getTotalHours() {
    return this.stories.reduce((totals, story: Story) => {
      return totals + +story.tasks.reduce((totalt, task: Task) => {
        return totalt + +task.hours;
      }, 0);
    }, 0);
  }

}
