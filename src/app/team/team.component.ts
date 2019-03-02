import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member'

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

  constructor() { }

  ngOnInit() {
    this.clearFormData();
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
    this, this.tempMember.color = this.getRandomColor();
    this.team.push(Object.assign({}, this.tempMember));
  }

  clearFormData() {
    this.tempMember = new Member('', '', '', 0, 0, '');
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
