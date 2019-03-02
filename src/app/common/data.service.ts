import { Injectable } from '../../../node_modules/@angular/core';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { Member } from '../model/member'
import { Story } from '../model/story';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    public team = new BehaviorSubject<Member[]>([]);

    public stories = new BehaviorSubject<Story[]>([]);

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
}