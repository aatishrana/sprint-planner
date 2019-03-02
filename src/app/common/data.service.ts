import { Injectable } from '../../../node_modules/@angular/core';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { Member } from '../model/member'

@Injectable({
    providedIn: 'root',
})
export class DataService {

    public team = new BehaviorSubject<Member[]>([]);

    public addMember(member: Member) {
        this.team.value.push(Object.assign({}, member));
    }

    public removeMember(index: number) {
        const team = this.team.getValue();
        team.splice(index, 1);
        this.team.next(team);
    }
}