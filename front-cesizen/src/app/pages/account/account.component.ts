import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class AccountComponent {
  form = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  message = '';
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  onUpdatePassword() {
    if (this.form.invalid) return;


    console.log('Nouveau mot de passe:', this.form.value.newPassword);


    this.authService.updatePassword(this.form.value.newPassword!).subscribe({
      next: () => this.message = 'Mot de passe mis à jour',
      error: err => this.error = err?.error?.message || 'Erreur'
    });
  }

  onDeleteAccount() {
    if (!confirm('Es-tu sûr de vouloir supprimer ton compte ?')) return;

    this.authService.deleteAccount().subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/']);
      },
      error: err => this.error = err?.error?.message || 'Erreur'
    });
  }
}
