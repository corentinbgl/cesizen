import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // adapte le chemin si besoin

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
     if (this.form.invalid) {
    console.error('Form invalide', this.form.errors); // ⬅️ requis par ton test
    return;
  }


    this.authService.registerAndLogin(this.form.value as {email: string , password: string}).subscribe({
      next: () => {
        this.message = 'Compte créé avec succès !';
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: err => {
        this.error = err?.error?.message || 'Erreur inconnue';
      }
    });
  }
}
