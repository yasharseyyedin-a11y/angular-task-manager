import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task'; // your Task interface
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';  // For dropdown/select

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.html',
  styleUrls: ['./edit-task-modal.css'],
  imports: [ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    MatSelectModule,],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class EditTaskModalComponent {

  taskForm: FormGroup;
  statusOptions = ['pending', 'completed'];
  constructor(
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.taskForm = new FormGroup({
      title: new FormControl(this.data.title ?? 'title'),
      description: new FormControl(this.data?.description ?? 'description'),
      dueDate: new FormControl(this.data?.dueDate ?? new Date()),
    });

  }

  onSave() {
    // Get the updated form values
    const updatedTask = {
      ...this.data,
      ...this.taskForm.value,  // Override with the form values
    };

    this.dialogRef.close(updatedTask);
  }

  onCancel() {
    this.dialogRef.close(null); // Close without emitting
  }
}
