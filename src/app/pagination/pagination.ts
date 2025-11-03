import { Component, input, model, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PaginationComponent {
  totalPages = input.required<number>();
  currentPage = model.required<number>();
  rowsPerPage = model.required<number>();

  onRowsPerPageChange(rows_count: number) {
    this.currentPage.set(1);
    this.rowsPerPage.set(rows_count);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
