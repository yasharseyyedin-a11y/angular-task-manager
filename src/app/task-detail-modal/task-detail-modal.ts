// task-detail-modal.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task'; // your Task interface path
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.html',
  styleUrls: ['./task-detail-modal.css'],
  imports: [DatePipe],
})
export class TaskDetailModalComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task // Task data passed in
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
