import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrl: './admin-create-user.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class AdminCreateUserComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['user', Validators.required]
  });

  message = '';
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSubmit() {
    if (this.form.invalid) return;

    this.authService.createUserByAdmin(this.form.value as {email: string, password: string, role:string}).subscribe({
      next: () => this.message = 'Utilisateur créé !',
      error: err => this.error = err?.error?.message || 'Erreur inconnue'
    });
  }
}
