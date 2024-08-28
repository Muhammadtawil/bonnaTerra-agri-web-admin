import { CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { SubscribersServices } from '../../services/subscribers.services';
import { SubscriberInterface } from '../../services/interfaces';
import Swal from 'sweetalert2';
import { deleteAlert } from '../common/alerts/alerts';


@Component({
  selector: 'app-subscribers',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    NgIf,
    MatCheckboxModule,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements AfterViewInit {
  subscribers: SubscriberInterface[] = [];
  displayedColumns: string[] = ['Name', 'Email', 'SubscribedAt', 'action'];
  dataSource = new MatTableDataSource<SubscriberInterface>(this.subscribers);
  selection = new SelectionModel<SubscriberInterface>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isToggled = false;
  mode: 'create' | 'edit' = 'create';

  constructor(
    public themeService: CustomizerSettingsService,
    private subscriberService: SubscribersServices,
    private router: Router,
  ) {
    this.getAllSubscribers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllSubscribers() {
    this.subscriberService.getAllSubscribers().subscribe({
      next: (data) => {
        this.subscribers = data;
        this.dataSource.data = this.subscribers;
      },
      error: (err) => {
        Swal.fire({
          title: "Error!",
          text: err,
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSubscriber(subscriber: SubscriberInterface) {
    // Implement your delete logic here
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

  async onDelete(id: string) {
    const deleteMethod = () => this.subscriberService.deleteSubscriber(id).toPromise();

    const isDeleted = await deleteAlert(deleteMethod);

    if (isDeleted) {
      // Refresh the subscribers list if deletion was confirmed
      this.getAllSubscribers();
    }
  }
}
