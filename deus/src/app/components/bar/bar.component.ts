import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class BarComponent implements OnInit {

  @Output() nameEvent = new EventEmitter<string>();

  name: string | null = localStorage.getItem('name');
  isAdmin: boolean = false;

  constructor(private router: Router) {
    const isAdminString: string = localStorage.getItem('isAdmin') || 'false';
    this.isAdmin = JSON.parse(isAdminString);
  }


  ngOnInit(): void {
  }

  onChangeRoute(): void {
    this.router.navigate(['/']);
  }

  onNameSubmit(e: any){
    const name = e.target.elements[0].value || '';
    this.nameEvent.emit(name);
  }

  onUserClick() {
    console.log(this.isAdmin)
    const route = this.isAdmin ? 'admin' : 'user';
    this.router.navigate([route]);
  }
}
