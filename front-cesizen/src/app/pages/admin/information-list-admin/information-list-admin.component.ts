import { Component } from '@angular/core';
import { Information, InformationService } from '../../../services/information.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-information-list-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './information-list-admin.component.html',
  styleUrl: './information-list-admin.component.scss'
})
export class InformationListAdminComponent {

  infos: Information[] = [];

  constructor(private infoService: InformationService) {}

  ngOnInit(): void {
    this.infoService.getAll().subscribe((data) => {
      this.infos = data;
    });
  }

  deleteInfo(id: number) {
    this.infoService.delete(id).subscribe(() => {
      this.infos = this.infos.filter(info => info.id !== id);
    });
  }

}
