import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [];


  url = 'http://localhost:3000/tasks';
  async LoadTasks(): Promise<Task[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  // Add a new task to the server
  async addTask(newTask: Task): Promise<Task> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    return response.json();
  }

  // Delete a task from the server by ID
  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  }

  // Update a task on the server by ID
  async updateTask(updatedTask: Task): Promise<void> {
    const response = await fetch(`${this.url}/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
  }
}


/*    { id: 1, title: 'Learn Angular', status: 'pending', dateCreated: new Date('2025-10-01'), description: 'Familiarize with Angular basics and environment setup.' },
    { id: 2, title: 'Build Task Manager', status: 'completed', dateCreated: new Date('2025-10-02'), description: 'Develop a SPA task manager with detailed UI.' },
    { id: 3, title: 'Write unit tests', status: 'pending', dateCreated: new Date('2025-10-03'), description: 'Write tests for all components and services.' },
    { id: 4, title: 'Fix bugs', status: 'in progress', dateCreated: new Date('2025-10-04'), description: 'Fix UI bugs reported by QA team.' },
    { id: 5, title: 'Add login feature', status: 'pending', dateCreated: new Date('2025-10-05'), description: 'Implement user authentication and authorization.' },
    { id: 6, title: 'Improve performance', status: 'pending', dateCreated: new Date('2025-10-06'), description: 'Use lazy loading to optimize app startup.' },
    { id: 7, title: 'Design database schema', status: 'completed', dateCreated: new Date('2025-10-07'), description: 'Design tables and relationships for task data.' },
    { id: 8, title: 'Integrate REST API', status: 'in progress', dateCreated: new Date('2025-10-08'), description: 'Connect front-end with backend services.' },
    { id: 9, title: 'Create dashboard UI', status: 'pending', dateCreated: new Date('2025-10-09'), description: 'Develop dashboard showing user stats and tasks.' },
    { id: 10, title: 'Setup CI/CD pipeline', status: 'pending', dateCreated: new Date('2025-10-10'), description: 'Configure automated build and deployment.' },
    { id: 11, title: 'Deploy to production', status: 'pending', dateCreated: new Date('2025-10-11'), description: 'Deploy latest version of the app.' },
    { id: 12, title: 'Write documentation', status: 'pending', dateCreated: new Date('2025-10-12'), description: 'Document app features and API usage.' },
    { id: 13, title: 'User feedback review', status: 'in progress', dateCreated: new Date('2025-10-13'), description: 'Analyze feedback and plan improvements.' },
    { id: 14, title: 'Improve UI/UX', status: 'pending', dateCreated: new Date('2025-10-14'), description: 'Refine interface for better user experience.' },
    { id: 15, title: 'Backup data', status: 'pending', dateCreated: new Date('2025-10-15'), description: 'Setup regular database backup process.' }
  ];
*/