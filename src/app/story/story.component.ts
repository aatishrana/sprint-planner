import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/data.service';
import { Member } from '../model/member';
import { Story } from '../model/story';
import { Task } from '../model/task';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  expandedStoryIndex = -1;
  btnText = 'Add Story';
  showAddForm = false;
  tempTask: Task;
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
    if (this.developers.length == 0) {
      alert('Add members in team');
      return;
    }

    if (this.showAddForm) {
      this.saveFormData();
      this.clearFormData();
    }
    this.showAddForm = !this.showAddForm;
    this.btnText = this.showAddForm ? 'Save Story' : 'Add Story';
  }

  onAddTaskBtnClick(index) {
    if (this.expandedStoryIndex == index) {
      this.expandedStoryIndex = -1;
      return;
    }
    this.expandedStoryIndex = index;
  }

  onDoneTaskBtnClick() {
    this.dataService.addTask(this.tempTask, this.expandedStoryIndex);
    this.expandedStoryIndex = -1;
  }

  onTaskClick(storyIndex: number, taskIndex: number) {
    this.dataService.removeTask(storyIndex, taskIndex);
  }

  saveFormData() {
    this.dataService.addStory(this.tempStory);
  }

  onRemoveStoryClick(index) {
    this.dataService.removeStory(index);
  }

  getTotalHours(story: Story) {
    return story.tasks.reduce((total, value: Task) => {
      return total + +value.hours;
    }, 0)
  }

  getWidth(hour) {
    return hour * 5 + 'px';
  }

  getColor(taskFor) {
    if (taskFor == 'Developer')
      return '#0078cc';
    else if (taskFor == 'Tester')
      return '#ff9d00';
    else if (taskFor == 'Owner')
      return '#339933';
    else
      return '#000000';
  }

  clearFormData() {
    this.tempStory = new Story(0, '', '', '', '', []);
    this.tempTask = new Task('', 0, '', 0, '');
  }
}
