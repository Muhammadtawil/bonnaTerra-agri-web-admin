import { CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { GetUsersInfoInterface, TaskInterface} from '../../../services/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { deleteAlert, ErrorAlert, successAlert } from '../../common/alerts/alerts';
import { MatChipsModule } from '@angular/material/chips';
import { AuthServices } from '../../../services/auth.services';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


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
    FormsModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  tasks: TaskInterface[] = [];
  assignedTask: TaskInterface[] = [];
  assignedToMe: TaskInterface[] = []
  usersList:GetUsersInfoInterface[]=[]
  // Task types
  isAssigned = false;
  selectedView: 'regular' | 'assignedTo' | 'assignedBy' = 'regular';
  taskForm!: FormGroup;
  // Column definitions for each view
  regulardisplayedColumns = ['task Name', 'dueDate', 'priority', 'status', 'action'];
  assignedTodisplayedColumns = ['task Name', 'assigned By', 'dueDate', 'priority', 'status'];
  assignedBydisplayedColumns = ['task Name', 'assigned To', 'dueDate', 'priority', 'status', 'action'];
  
  displayedColumns: string[] = this.regulardisplayedColumns;
  
  dataSource = new MatTableDataSource<TaskInterface>(this.tasks);
  selection = new SelectionModel<TaskInterface>(true, []);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  isToggled = false;
  mode: 'create' | 'edit' = 'create';
  taskId: string | null = null;
  
  constructor(
    public themeService: CustomizerSettingsService,
    private taskService: TaskServices,
    private userService: AuthServices,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
    
    this.getAllTasks();
    this.getUsersInfo();
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskTitle: ['', Validators.required],
      taskStatus: [''],
      taskPriority: [''],
      taskDeadline: ['', Validators.required],
      assignedTo: [[]],
    });
    this.route.paramMap.subscribe((params) => {
      this.taskId = params.get('id');
      if (this.taskId) {
        this.mode = 'edit';
        this.loadTaskData(this.taskId); 
      }
    });

  }

  // Load Tasks data into the form for editing
  loadTaskData(taskID: string): void {
    this.taskService.getTaskByID(taskID).subscribe({
      next: (task: TaskInterface) => {
    
        this.taskForm.patchValue({
          taskTitle: task.taskTitle,
          taskStatus: task.taskStatus,
          taskPriority: task.taskPriority,
          taskDeadline: task.taskDeadline,
          assignedTo: task.assignedTo,
   
        });
      },
      error: (error: any) => {
        console.error('Error fetching task', error);
        this.router.navigate(['/dashboard/to-do-list']);
      },
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData =  this.taskForm.value;
  
      if (this.mode === 'create') {
        // Create a new task
        this.taskService.createTask(formData).subscribe({
          next: (response: any) => {
            successAlert('task Added Successfully');
            this.classApplied = false;
            this.getAllTasks();
            this.router.navigate(['/dashboard/to-do-list']);
          },
          error: (error: any) => {
            console.error('Error creating task', error);
          },
        });
      } else if (this.mode === 'edit' && this.taskId) {
        // Update the existing task
        this.taskService.updateTask(this.taskId, formData).subscribe({
          next: (response: any) => {
            successAlert('task Updated Successfully');
            this.classApplied = false;
            this.getAllTasks();
            this.router.navigate(['/dashboard/to-do-list']);
          },
          error: (error: any) => {
            console.error('Error updating task', error);
          },
        });
      }
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Get all tasks from the service
  getAllTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.filter(task => task.isAssigned === false);
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
        this.assignedToMe = data;
        this.dataSource.data = this.assignedToMe;
      },
      error: (err) => {
        ErrorAlert(err);
      }
    });
  }

  // Fetch tasks assigned by the user
  getTasksAssignedByUser() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.assignedTask = data.filter(task => task.isAssigned === true);
        this.dataSource.data = this.assignedTask;
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
        this.dataSource = new MatTableDataSource<TaskInterface>(this.assignedTask);
        break;
      case 'assignedBy':
        this.displayedColumns = this.assignedBydisplayedColumns;
        this.getTasksAssignedByUser(); // Fetch tasks assigned by the user
        this.dataSource = new MatTableDataSource<TaskInterface>(this.assignedToMe);
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


  // fetch USer Info 

  usersMap: { [key: string]: GetUsersInfoInterface } = {};

  getUsersInfo() {
    this.userService.getUsersInfo().subscribe({
      next: (data) => {
        this.usersList = data;
        this.usersMap = data.reduce((map:any, user:any) => {
          map[user.userId] = user;
          return map;
        }, {});
        console.log('Users map:', this.usersMap);  // For debugging
      },
      error: (err) => {
        ErrorAlert(err);
      }
    });
  }
  
  editTask(taskID: string): void {
    // Set the mode to 'edit' and store the task ID
    this.mode = 'edit';
    this.taskId = taskID;
    
    // Load the task data into the form
    this.loadTaskData(taskID);
    
    // Open the popup
    this.classApplied = true; // This assumes `classApplied` controls the popup visibility
  }
  
  async onDelete(id: string) {
    const deleteMethod = () => this.taskService.deleteTask(id).toPromise();

    const isDeleted = await deleteAlert(deleteMethod);

    if (isDeleted) {
      // Refresh the subscribers list if deletion was confirmed
      this.getAllTasks();
    }
  }
}