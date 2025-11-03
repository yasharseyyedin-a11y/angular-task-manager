import { Component, signal, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../task';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.html',
  styleUrls: ['./add-task.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
})
export class AddTaskComponent {
  id = input<number>(-1);
  taskAdded = output<Task | null>();
  showForm = signal(false);

  taskForm = new FormGroup({
    title: new FormControl(''),
    dueDate: new FormControl(new Date()),
    description: new FormControl(''),
  });

  onAddNewTask() {
    this.showForm.set(true);
    // Set default values for form controls when form becomes visible
    this.taskForm.reset({
      title: 'Default Title',
      dueDate: new Date(),
      description: ''
    });
  }

  onConfirm() {
    if (this.id() == -1) return;
    const newTask: Task = {
      id: this.id(),
      title: this.taskForm.value.title ?? '',
      dateCreated: new Date(),
      dueDate: this.taskForm.value.dueDate?? new Date(),
      description: this.taskForm.value.description ?? ''
    }
    this.showForm.set(false);
    // Set default values for form controls when form becomes visible
    this.taskForm.reset({
      title: 'Default Title',
      dueDate: new Date(),
      description: ''
    });
    this.taskAdded.emit(newTask);
  }
  onCancel() {
    this.showForm.set(false);
    // Set default values for form controls when form becomes visible
    this.taskForm.reset({
      title: 'Default Title',
      dueDate: new Date(),
      description: ''
    });
    this.taskAdded.emit(null);
  }
}
