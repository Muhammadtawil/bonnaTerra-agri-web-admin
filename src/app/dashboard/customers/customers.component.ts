import { CustomerServices } from './../../services/customers.services';
import { CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { GetCustomerInteface } from '../../services/interfaces';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    NgIf,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
      CommonModule,
    MatIconModule,
  ],
  templateUrl: './customers.component.html',

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({
        height: '0px',
        minHeight: '0',
        visibility: 'hidden',
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        visibility: 'visible'
      })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],

  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  customerList: GetCustomerInteface[] = [];
  displayedColumns: string[] = [
    'customerName',
    'customerEmail',
    'customerPhone',
    'customerAge',
    'customerJob',
    'address',
    'info',
    'action',
  ];
  dataSource = new MatTableDataSource<GetCustomerInteface>(this.customerList);

  expandedElement!: GetCustomerInteface | null;
  // Expansion
  panelOpenState = false;
  isMoreInfo = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public themeService: CustomizerSettingsService,
    private customerServices: CustomerServices,
    private cdr: ChangeDetectorRef
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
    this.getAllCustomers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }





  // Search Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // isToggled
  isToggled = false;

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

  getAllCustomers() {
    return this.customerServices.getAllCustomers().subscribe({
      next: (data) => {
        console.log('Customers received:', data);
        this.customerList = data;
        this.dataSource.data = this.customerList;
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: err,
          icon: 'warning',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      },
    });
  }

  toggleRow(element: GetCustomerInteface) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }
    
    // Helper function to format preferred products
    getPreferredProductsList(products: any[]): string {
        return products.map(product => product.productName).join(', ');
    }
}
