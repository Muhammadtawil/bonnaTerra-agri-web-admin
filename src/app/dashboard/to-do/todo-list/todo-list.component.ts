import { NgIf } from '@angular/common';
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
],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  tasks: TaskInterface[] = [];
  displayedColumns: string[] = ['taskName', 'assignedTo', 'dueDate', 'priority', 'status', 'action'];
  dataSource = new MatTableDataSource<TaskInterface>(this.tasks);
  selection = new SelectionModel<TaskInterface>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isToggled = false;
  mode: 'create' | 'edit' = 'create';
  constructor(
    public themeService: CustomizerSettingsService,
    private taskService:TaskServices,
  ) {
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
    this.getAllTasks()
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  getAllTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.dataSource.data = this.tasks;
      },
      error: (err) => {
    ErrorAlert(err)
      }
    });
  }

  // Search Filter
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // isToggled
    
    
  // Popup Trigger
  classApplied = false;

  toggleClass() {
    this.classApplied = !this.classApplied;
  }


    




  // RTL Mode
  toggleRTLEnabledTheme() {
      this.themeService.toggleRTLEnabledTheme();
  }

}

