import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrl: './admin-user-management.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class AdminUserManagementComponent implements OnInit {
  users: any[] = [];
  message = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: data => this.users = data,
      error: err => this.error = err?.error?.message || 'Erreur'
    });
  }

  onCreateUser(){
    this.router.navigate(['/admin/create-users']);
  }
  onChangeRole(user: any) {
    const newRole = user.role.name === 'admin' ? 'user' : 'admin';
    this.authService.updateUserRole(user.id, newRole).subscribe({
      next: () => {
        user.role = newRole;
        this.message = `Rôle de ${user.email} mis à jour`;
      },
      error: err => this.error = err?.error?.message || 'Erreur'
    });
  }

  onDelete(userId: string) {
    if (!confirm('Confirmer la suppression de ce compte ?')) return;

    this.authService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== userId);
        this.message = 'Utilisateur supprimé';
      },
      error: err => this.error = err?.error?.message || 'Erreur'
    });
  }
}
