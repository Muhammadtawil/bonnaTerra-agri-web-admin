import { CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AdminBreadcrumbComponent } from '../../common/breadcrumb/breadcrumb.component';
import { CreateTaskComponent } from "../create-task/create-task.component";
import { TaskServices } from '../../../services/tasks.services';
import { TaskInterface } from '../../../services/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorAlert } from '../../common/alerts/alerts';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatTableModule,
    NgIf,
    MatCheckboxModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AdminBreadcrumbComponent,
    CreateTaskComponent,
    CommonModule,
    MatChipsModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  tasks: TaskInterface[] = [];
  // Task types
  isAssigned = false;
  selectedView: 'regular' | 'assignedTo' | 'assignedBy' = 'regular';
  
  // Column definitions for each view
  regulardisplayedColumns = ['taskName', 'dueDate', 'priority', 'status', 'action'];
  assignedTodisplayedColumns = ['taskName', 'assigned To', 'dueDate', 'priority', 'status', 'action'];
  assignedBydisplayedColumns = ['taskName', 'assigned By', 'dueDate', 'priority', 'status', 'action'];
  
  displayedColumns: string[] = this.regulardisplayedColumns;
  
  dataSource = new MatTableDataSource<TaskInterface>(this.tasks);
  selection = new SelectionModel<TaskInterface>(true, []);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  isToggled = false;
  mode: 'create' | 'edit' = 'create';
  
  constructor(
    public themeService: CustomizerSettingsService,
    private taskService: TaskServices,
  ) {
    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
    
    this.getAllTasks();
    this.getTasksAssignedByUser();
    this.getTasksAssignedToUser();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Get all tasks from the service
  getAllTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.dataSource.data = this.tasks;
      },
      error: (err) => {
        ErrorAlert(err);
      }
    });
  }

  // Fetch tasks assigned to the user
  getTasksAssignedToUser() {
    this.taskService.getTasksAssignedToUser().subscribe({
      next: (data) => {
        this.tasks = data;
        this.dataSource.data = this.tasks;
      },
      error: (err) => {
        ErrorAlert(err);
      }
    });
  }

  // Fetch tasks assigned by the user
  getTasksAssignedByUser() {
    this.taskService.getTasksAssignedByUser().subscribe({
      next: (data) => {
        this.tasks = data;
        this.dataSource.data = this.tasks;
      },
      error: (err) => {
        ErrorAlert(err);
      }
    });
  }

  
  // Method to switch between views: Regular, Assigned To, and Assigned By
  switchTaskView(view: 'regular' | 'assignedTo' | 'assignedBy') {
    this.selectedView = view;
  
    switch (view) {
      case 'regular':
        this.displayedColumns = this.regulardisplayedColumns;
        this.dataSource = new MatTableDataSource<TaskInterface>(this.tasks);
        break;
      case 'assignedTo':
        this.displayedColumns = this.assignedTodisplayedColumns;
        this.getTasksAssignedToUser(); // Fetch tasks assigned to the user
        break;
      case 'assignedBy':
        this.displayedColumns = this.assignedBydisplayedColumns;
        this.getTasksAssignedByUser(); // Fetch tasks assigned by the user
        break;
    }
  }
  
  // Apply search filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  // Toggle class for popup
  classApplied = false;
  
  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  // Toggle RTL mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }


}