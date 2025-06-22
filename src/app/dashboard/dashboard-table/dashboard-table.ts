import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-table',
  imports: [CommonModule],
  templateUrl: './dashboard-table.html',
  styleUrl: './dashboard-table.css'
})
export class DashboardTable {
  @Input() columns: { key: string; label: string }[] = [];
  @Input() data: any[] = [];
  
}
