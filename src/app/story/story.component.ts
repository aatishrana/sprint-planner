import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/data.service';
import { Member } from '../model/member';
import { Story } from '../model/story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  btnText = 'Add Story';
  showAddForm = false;
  tempStory: Story;
  stories: Story[];

  developers: Member[] = [];
  testers: Member[] = [];
  owners: Member[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.clearFormData();

    this.developers = this.dataService.team.getValue().filter(member => member.role == 'Developer');
    this.testers = this.dataService.team.getValue().filter(member => member.role == 'Tester');
    this.owners = this.dataService.team.getValue().filter(member => member.role == 'Owner');

    this.stories = this.dataService.stories.getValue();
    this.dataService.stories.subscribe(stories => this.stories = stories);
  }

  onMainBtnClick() {
    if (this.showAddForm) {
      this.saveFormData();
      this.clearFormData();
    }
    this.showAddForm = !this.showAddForm;
    this.btnText = this.showAddForm ? 'Save Story' : 'Add Story';
  }

  saveFormData() {
    this.dataService.addStory(this.tempStory);
  }

  onRemoveStoryClick(index) {
    this.dataService.removeStory(index);
  }

  clearFormData() {
    this.tempStory = new Story(0, '', '', '', '');
  }
}
