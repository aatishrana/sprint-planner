import { Injectable } from '../../../node_modules/@angular/core';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { Member } from '../model/member'
import { Story } from '../model/story';
import { Task } from '../model/task';
import { CUSTOMJSON } from 'node_modules/circular-json';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    public team = new BehaviorSubject<Member[]>([
    ]);

    public stories = new BehaviorSubject<Story[]>([
    ]);

    public addMember(member: Member) {
        this.team.value.push(Object.assign({}, member));
    }

    public removeMember(index: number) {
        const team = this.team.getValue();
        team.splice(index, 1);
        this.team.next(team);
    }

    public addStory(story: Story) {
        this.stories.value.push(Object.assign({}, story));
    }

    public removeStory(index: number) {
        const stories = this.stories.getValue();
        stories.splice(index, 1);
        this.stories.next(stories);
    }

    public addTask(task: Task, index: number) {
        const stories = this.stories.getValue();
        stories[index].tasks.push(Object.assign({}, task));
        this.stories.next(stories);
    }

    public removeTask(storyIndex: number, taskIndex: number) {
        const stories = this.stories.getValue();
        stories[storyIndex].tasks.splice(taskIndex, 1);
        this.stories.next(stories);
    }

    public getAllTasksOf(memberId: string) {
        const team = this.team.getValue();
        const member = team[team.findIndex(member => member.id == memberId)];

        const role = member.role;
        const stories = this.stories.getValue();
        const tasks = stories
            .filter(story => {
                if (role == 'Developer')
                    return story.developer == member.firstName;
                if (role == 'Tester')
                    return story.tester == member.firstName;
                if (role == 'Owner')
                    return story.owner == member.firstName;
            })
            .map(story => story.tasks.filter(task => task.taskFor == role));
        console.log(member.firstName, tasks);
    }

    public saveData() {
        // const data = {
        //     'team': this.team,
        //     'stories': this.stories
        // };

        // const filename = 'data.json';
        // const blob = new Blob([CUSTOMJSON.stringify(data)], { type: 'text/json' });
        // let e = document.createEvent('MouseEvents');
        // let a = document.createElement('a');

        // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //     window.navigator.msSaveOrOpenBlob(blob, filename);
        // }
        // else {
        //     a.download = filename;
        //     a.href = window.URL.createObjectURL(blob);
        //     a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
        //     e.initEvent('click', true, false);
        //     a.dispatchEvent(e);
        // }
    }
}