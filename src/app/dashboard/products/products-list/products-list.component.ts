import { CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { GetProductInterface } from '../../../services/interfaces';
import { ProductsServices } from '../../../services/products.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-products-list',
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
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  displayedColumns: string[] = [
    'productName',
    'category',
    'price',
    'inStock',
    'date',
    'onWeb',
    'action',
  ];
  productList: GetProductInterface[] = [];
  dataSource = new MatTableDataSource<GetProductInterface>(this.productList);
  selection = new SelectionModel<GetProductInterface>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  isToggled = false;
  mode: 'create' | 'edit' = 'create';

  constructor(
    public themeService: CustomizerSettingsService,
    private productServices: ProductsServices
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
      this.getAllProducts();
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

    // get prouducts

    getAllProducts() {
      return this.productServices.getProducts().subscribe({
        next: (data) => {
          console.log('Products received:', data);
          this.productList = data;
          this.dataSource.data = this.productList; 
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
  
    // Search Filter
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
      this.selection.select(...this.dataSource.data);
    }
  
  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }


}
