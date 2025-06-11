import { Component, OnInit } from '@angular/core';
import { StressService, StressEvent } from '../../services/stress.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-diagnostic-stress',
  imports: [CommonModule, FormsModule],
  templateUrl: './diagnostic-stress.component.html'
})
export class DiagnosticStressComponent implements OnInit {
  events: StressEvent[] = [];
  selectedIds: number[] = [];
  result?: { score: number; level: string };

  constructor(private stressService: StressService) {}

  ngOnInit(): void {
    this.stressService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  toggle(id: number) {
    if (this.selectedIds.includes(id)) {
      this.selectedIds = this.selectedIds.filter(i => i !== id);
    } else {
      this.selectedIds.push(id);
    }
  }

  submit() {
    this.stressService.calculateScore(this.selectedIds).subscribe(data => {
      this.result = data;
    });
  }
}
