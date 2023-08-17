import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/common/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() currentUser!: User;

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('currentUser');

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['']);
  }
}
