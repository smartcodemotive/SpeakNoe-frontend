import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [class]="statusClass">
      @if (status === 'Processed') {
        <svg class="icon" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="2,6 5,9 10,3"></polyline>
        </svg>
      }
      @if (status === 'Failed') {
        <svg class="icon" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="2" y1="2" x2="10" y2="10"></line>
          <line x1="10" y1="2" x2="2" y2="10"></line>
        </svg>
      }
      @if (status === 'Pending') {
        <svg class="icon" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="6" cy="6" r="5"></circle>
          <polyline points="6,3 6,6 8,8"></polyline>
        </svg>
      }
      {{ status }}
    </span>
  `,
  styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 500;
    }

    .badge.processed {
      background-color: rgba(34, 197, 94, 0.15);
      color: #22c55e;
    }

    .badge.failed {
      background-color: rgba(239, 68, 68, 0.15);
      color: #ef4444;
    }

    .badge.pending {
      background-color: rgba(14, 165, 233, 0.15);
      color: #0ea5e9;
    }

    .icon {
      flex-shrink: 0;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status!: TaskStatus;

  get statusClass(): string {
    return (this.status || '').toLowerCase();
  }
}
