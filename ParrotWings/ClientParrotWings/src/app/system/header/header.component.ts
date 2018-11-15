import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  Name: string = ""; 

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.Name = localStorage.getItem('Name');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
