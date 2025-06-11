import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Information, InformationService } from '../../services/information.service';

@Component({
  selector: 'app-information-detail',
  standalone: true,
  imports: [],
  templateUrl: './information-detail.component.html',
  styleUrl: './information-detail.component.scss'
})
export class InformationDetailComponent  implements OnInit{
  constructor(private readonly route: ActivatedRoute, private infoService: InformationService){}

  info!: Information;

  ngOnInit():void {
  const slug = this.route.snapshot.paramMap.get('slug');
  if (slug) {
    this.infoService.getBySlug(slug).subscribe((data) => {
      this.info = data;
    });
  }

  }}
