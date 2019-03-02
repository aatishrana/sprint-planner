import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member'
import { DataService } from '../common/data.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  btnText = 'Add Member';
  showAddForm = false;

  team: Member[] = [];
  tempMember: Member;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.clearFormData();
    this.team = this.dataService.team.getValue();
    this.dataService.team.subscribe(members => this.team = members);
  }

  onAddClick() {
    if (this.showAddForm) {
      this.saveFormData();
      this.clearFormData();
    }
    this.showAddForm = !this.showAddForm;
    this.btnText = this.showAddForm ? 'Save Member' : 'Add Member';
  }

  saveFormData() {
    this.tempMember.color = this.getRandomColor();
    this.tempMember.id = this.tempMember.firstName + '-' + this.tempMember.lastName;
    this.dataService.addMember(this.tempMember);
  }

  onRemoveClick(index) {
    this.dataService.removeMember(index);
  }

  clearFormData() {
    this.tempMember = new Member('', '', '', 0, 0, '', '');
  }

  getInitials(firstName: string, lastName: string): string {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
