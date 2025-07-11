import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = '';
  authService: any;

  ngOnInit(): void {
    this.username = localStorage.getItem('loggedInUser') || '';

    if (!this.username) {
      this.router.navigate(['/login']);
    }
  }
  

  constructor(private router: Router) {}

  onSelectChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      this.router.navigate([`/home/${selectedValue}`]);
    }
  }

  logout(): void {
    // Optional: Clear token/session
    this.router.navigate(['/login']);
  }
}
