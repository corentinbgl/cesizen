import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StressService } from '../../services/stress.service';

@Component({
  selector: 'app-stress-config',
  templateUrl: './stress-config.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class StressConfigComponent implements OnInit {
  events: any[] = [];
  form: FormGroup;
  editingEvent?: any;
  message = '';
  error = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private StressService: StressService) {
    this.form = this.fb.group({
      label: ['', Validators.required],
      points: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.StressService.getEvents().subscribe(data => this.events = data);
  }

  submit() {
    const data = this.form.value;

      this.authService.createStressEvent(data).subscribe({
        next: () => {
          this.message = 'Événement ajouté';
          this.resetForm();
          this.loadEvents();
        },
        error: err => this.error = err?.error?.message || 'Erreur'
      });

  }

  edit(event: any) {
    this.editingEvent = event;
    this.form.patchValue(event);
  }

  delete(id: number) {
    if (!confirm('Confirmer la suppression ?')) return;
    this.authService.deleteStressEvent(id).subscribe(() => this.loadEvents());
  }

  resetForm() {
    this.editingEvent = undefined;
    this.form.reset({ label: '', points: 0 });
  }
}
