import { Component, OnInit } from '@angular/core';
import { InformationService, Information } from '../../services/information.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-information-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './information-list.component.html',
  styleUrl: './information-list.component.scss',
})
export class InformationListComponent implements OnInit {
  infos: Information[] = [];

  constructor(private infoService: InformationService) {}

  ngOnInit(): void {
    this.infoService.getAll().subscribe((data) => {
      this.infos = data;
    });
  }
}
