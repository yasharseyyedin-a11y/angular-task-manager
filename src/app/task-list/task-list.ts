import { Component, inject, signal, model, ChangeDetectionStrategy } from '@angular/core';
import { TaskService } from '../task-service';
import { DatePipe, SlicePipe } from '@angular/common';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination';
import { AddTaskComponent } from '../add-task/add-task';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe, SlicePipe, CommonModule, PaginationComponent, AddTaskComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskList {

  taskService = inject(TaskService);

  // Signal to hold the loaded tasks array
  tasks = signal<Task[]>([]);

  constructor(private dialog: MatDialog) {
    this.loadTasks();
  }

  // Async method to load tasks and set the signal value when done
  async loadTasks() {
    const loadedTasks = await this.taskService.LoadTasks();
    this.tasks.set(loadedTasks);
  }

  async addTask(newTask: Task | null) {
    if (newTask === null) return;
    try {
      const loadedTask = await this.taskService.addTask(newTask);
      let previos_pageTotal = this.totalPages;
      this.tasks.set([...this.tasks(), loadedTask]); // create new array reference
      let new_pageTotal = this.totalPages;
      if (previos_pageTotal !== new_pageTotal)
        this.currentPage.set(new_pageTotal);
    } catch {
      console.log("Could not add Task!");
    }
  }

  editTask(task_id: number) {
    const task = this.tasks().find(t => t.id === task_id);
    const dialogRef = this.dialog.open(EditTaskModalComponent, {
      width: '600px',
      data: task
    });

    dialogRef.afterClosed().subscribe((updatedTask: Task | undefined) => {
      if (updatedTask) {
        this.taskService.updateTask(updatedTask);
        this.tasks.set(this.tasks().map(t =>
          t.id === updatedTask.id ? updatedTask : t
        ));
      }
    });
  }

  async deleteTask(task_id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;
    try {
      const loadedTask = await this.taskService.deleteTask(task_id);
      let previos_pageTotal = this.totalPages;
      // Remove the task from the local 'tasks' array
      this.tasks.set(this.tasks().filter(task => task.id !== task_id));
      let new_pageTotal = this.totalPages;
      if (previos_pageTotal !== new_pageTotal)
        this.currentPage.set(new_pageTotal);
    } catch {
      console.log("Could not delete Task!");
    }
  }

  viewDetails(task_id: number) {
    const task = this.tasks().find(t => t.id === task_id);
    const dialogRef = this.dialog.open(TaskDetailModalComponent, {
      width: '600px',
      data: task
    });
  }

  currentPage = model<number>(1);
  rowsPerPage = model<number>(5);

  get totalPages() {
    return Math.ceil(this.tasks().length / this.rowsPerPage());
  }

  // Get the paginated tasks slice synchronously from the signal's value
  get paginatedTasks(): Task[] {
    const startIndex = (this.currentPage() - 1) * this.rowsPerPage();
    return this.tasks().slice(startIndex, startIndex + this.rowsPerPage());
  }

  getCount() {
    return this.tasks().length + 1;
  }
}
