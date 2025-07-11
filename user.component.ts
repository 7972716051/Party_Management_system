import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../model/user'; 

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  newUser: User = {
    username: '', password: '',
  };
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Failed to load users', err)
    });
  }
  saveUser(): void {
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.newUser = { username: '', password: '' };
        this.loadUsers();
      },
      error: (err) => console.error('Failed to save user', err)
    });
  }
  deleteUser(id: number): void {
    if (confirm('Are you sure to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Failed to delete user', err)
      });
    }
  }

  validateUser(username: string, password: string): void {
    this.userService.validateUser(username, password).subscribe({
      next: (user) => alert(`User validated: ${user.username}`),
      error: () => alert('Invalid credentials')
    });
  }
}















