import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-role-management',
  templateUrl: './user-role-management.component.html',
  styleUrls: ['./user-role-management.component.css']
})
export class UserRoleManagementComponent implements OnInit {
  users: any[] = [];
  selectedRole: string = '';
  selectedUser: string = '';
  message = '';

  availableRoles = ['USER', 'RESONSABLE FRAIS'];

  constructor(private userService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  assignRole(): void {
    if (!this.selectedUser || !this.selectedRole) {
      this.message = 'Veuillez sélectionner un utilisateur et un rôle.';
      return;
    }

    this.userService.assignRole(this.selectedUser, this.selectedRole).subscribe(() => {
      this.message = `Rôle ${this.selectedRole} attribué à ${this.selectedUser}.`;
      this.loadUsers(); // recharger les rôles mis à jour
    });
  }
}
