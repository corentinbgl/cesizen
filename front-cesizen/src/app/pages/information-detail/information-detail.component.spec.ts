import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Information, InformationService } from '../../services/information.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-information-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './information-detail.component.html',
  styleUrl: './information-detail.component.scss'
})
export class InformationDetailComponent implements OnInit {
  info: Information | null = null; // Initialize to null
  loading = true;
  error = '';

  constructor(
    private readonly route: ActivatedRoute,
    private infoService: InformationService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.infoService.getBySlug(slug).subscribe({
        next: (data) => {
          this.info = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load information';
          this.loading = false;
          console.error('Error loading information:', err);
        }
      });
    } else {
      this.loading = false;
      this.error = 'No slug provided';
    }
  }
}
