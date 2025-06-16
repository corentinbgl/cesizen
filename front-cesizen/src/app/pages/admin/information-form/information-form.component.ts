import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationService, Information } from '../../../services/information.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-information-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './information-form.component.html',
  styleUrl: './information-form.component.scss'
})
export class InformationFormComponent implements OnInit {
  form = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    content: ['', Validators.required]
  });

  isEdit = false;
  infoId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private infoService: InformationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.infoId = +id;
      this.infoService.getById(this.infoId).subscribe((data) => {
        this.form.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.isEdit && this.infoId) {
      this.infoService.update(this.infoId, this.form.value as { title: string; slug: string; content: string }).subscribe(() => {
        this.router.navigate(['/admin/informations']);
      });
    } else {
      this.infoService.create(this.form.value as { title: string; slug: string; content: string }).subscribe(() => {
        this.router.navigate(['/admin/informations']);
      });
    }
  }
}
