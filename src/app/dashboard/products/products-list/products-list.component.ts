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
    'select',
    'productId',
    'product',
    'category',
    'price',
    'inStock',
    'date',
    'onWeb',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.product + 1
    }`;
  }

  // Search Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // isToggled
  isToggled = false;

  constructor(public themeService: CustomizerSettingsService) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    productId: '#134',
    product: {
      img: '../../../../assets/images/products/product6.png',
      name: 'Hand Watch',
    },
    category: 'Watch',
    price: '$80',
    inStock: true,
    date: 'Nov 10, 2024',
    sales: 120,
    revenue: '$9,600.00',
    rating: '5.00 (141 reviews)',
    onWeb:true,
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#240',
    product: {
      img: '../../../../assets/images/products/product3.png',
      name: 'Gaming Laptop',
    },
    category: 'Electronics',
    price: '$750',
    inStock: true,
    date: 'Nov 15, 2024',
    sales: 99,
    revenue: '$74,250.00',
    rating: '5.00 (69 reviews)',
    onWeb:true,
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#269',
    product: {
      img: '../../../../assets/../../../../assets/images/products/product8.png',
      name: 'Sports Shoes',
    },
    category: 'Sports',
    price: '$45',
    inStock: false,
    date: 'Nov 16, 2024',
    sales: 45,
    revenue: '$2,025',
    rating: '5.00 (99 reviews)',
    onWeb:true,
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#346',
    product: {
      img: '../../../../assets/images/products/product9.png',
      name: 'Woman Handbag',
    },
    category: 'Fashion',
    price: '$55',
    inStock: false,
    date: 'Nov 17, 2024',
    sales: 200,
    revenue: '$70,000.00',
    rating: '4.00 (75 reviews)',
    onWeb:true,
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#369',
    product: {
      img: '../../../../assets/images/products/product10.png',
      name: 'Luxury Rendering',
    },
    category: 'Jewellery',
    price: '$75',
    inStock: true,
    date: 'Nov 18, 2024',
    sales: 80,
    revenue: '$6,000.00',
    rating: '5.00 (158 reviews)',
    onWeb:true,
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#436',
    product: {
      img: '../../../../assets/images/products/product5.png',
      name: 'Wireless Headphone',
    },
    category: 'Electronics',
    price: '$25',
    inStock: true,
    date: 'Nov 19, 2024',
    sales: 450,
    revenue: '$11,250.00',
    rating: '4.00 (250 reviews)',
    onWeb:true,
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#536',
    product: {
      img: '../../../../assets/images/products/product11.png',
      name: 'Futuristic Bracelet',
    },
    category: 'Accessories',
    price: '$120',
    inStock: true,
    date: 'Nov 20, 2024',
    sales: 180,
    revenue: '$21,600.00',
    rating: '5.00 (42 reviews)',
    onWeb:true,
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#679',
    product: {
      img: '../../../../assets/images/products/product12.png',
      name: 'Mobile Device',
    },
    category: 'Electronics',
    price: '$150',
    inStock: false,
    date: 'Nov 21, 2024',
    sales: 320,
    revenue: '$48,000.00',
    rating: '5.00 (248 reviews)',
    onWeb:true,
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#751',
    product: {
      img: '../../../../assets/images/products/product13.png',
      name: 'Triblend T-shirt',
    },
    category: 'Fashion',
    price: '$15',
    inStock: true,
    date: 'Nov 22, 2024',
    sales: 1050,
    revenue: '$15,750.00',
    rating: '5.00(858 reviews)',
    onWeb:true,
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#854',
    product: {
      img: '../../../../assets/images/products/product14.png',
      name: 'Camera Lens',
    },
    category: 'Accessories',
    price: '$100',
    inStock: true,
    date: 'Nov 23, 2024',
    sales: 40,
    revenue: '$4,000.00',
    rating: '5.00 (30 reviews)',
    onWeb:true,
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#854',
    product: {
      img: '../../../../assets/images/products/product14.png',
      name: 'Camera Lens',
    },
    category: 'Accessories',
    price: '$100',
    inStock: false,
    date: 'Nov 23, 2024',
    sales: 40,
    revenue: '$4,000.00',
    rating: '5.00 (30 reviews)',
    onWeb:true,
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#751',
    product: {
      img: '../../../../assets/images/products/product13.png',
      name: 'Triblend T-shirt',
    },
    category: 'Fashion',
    price: '$15',
    inStock: true,
    date: 'Nov 22, 2024',
    sales: 1050,
    revenue: '$15,750.00',
    rating: '5.00(858 reviews)',
    onWeb:true,
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#679',
    product: {
      img: '../../../../assets/images/products/product12.png',
      name: 'Mobile Device',
    },
    category: 'Electronics',
    price: '$150',
    inStock: true,
    date: 'Nov 21, 2024',
    sales: 320,
    revenue: '$48,000.00',
    rating: '5.00 (248 reviews)',
    onWeb:true,

    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#536',
    product: {
      img: '../../../../assets/images/products/product11.png',
      name: 'Futuristic Bracelet',
    },
    category: 'Accessories',
    price: '$120',
    inStock: true,
    date: 'Nov 20, 2024',
    sales: 180,
    revenue: '$21,600.00',
    rating: '5.00 (42 reviews)',
    onWeb:true,

    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#436',
    product: {
      img: '../../../../assets/images/products/product5.png',
      name: 'Wireless Headphone',
    },
    category: 'Electronics',
    price: '$25',
    inStock: true,
    date: 'Nov 19, 2024',
    sales: 450,
    revenue: '$11,250.00',
    rating: '4.00 (250 reviews)',
    onWeb:true,

    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#369',
    product: {
      img: '../../../../assets/images/products/product10.png',
      name: 'Luxury Rendering',
    },
    category: 'Jewellery',
    price: '$75',
    inStock: true,
    date: 'Nov 18, 2024',
    sales: 80,
    revenue: '$6,000.00',
    rating: '5.00 (158 reviews)',
    onWeb:true,

    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#346',
    product: {
      img: '../../../../assets/images/products/product9.png',
      name: 'Woman Handbag',
    },
    category: 'Fashion',
    price: '$55',
    inStock: true,
    date: 'Nov 17, 2024',
    sales: 200,
    revenue: '$70,000.00',
    rating: '4.00 (75 reviews)',
    onWeb:true,

    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#269',
    product: {
      img: '../../../../assets/images/products/product8.png',
      name: 'Sports Shoes',
    },
    category: 'Sports',
    price: '$45',
    inStock: false,
    date: 'Nov 16, 2024',
    sales: 45,
    revenue: '$2,025',
    rating: '5.00 (99 reviews)',
    onWeb:true,

    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#240',
    product: {
      img: '../../../../assets/images/products/product3.png',
      name: 'Gaming Laptop',
    },
    category: 'Electronics',
    price: '$750',
    inStock: true,
    date: 'Nov 15, 2024',
    sales: 99,
    revenue: '$74,250.00',
    rating: '5.00 (69 reviews)',
    onWeb:true,

    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    productId: '#134',
    product: {
      img: '../../../../assets/images/products/product6.png',
      name: 'Hand Watch',
    },
    category: 'Watch',
    price: '$80',
    inStock: true,
    date: 'Nov 10, 2024',
    sales: 120,
    revenue: '$9,600.00',
    rating: '5.00 (141 reviews)',
    onWeb:true,
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
];
export interface PeriodicElement {
  productId: string;
  product: any;
  category: string;
  price: string;
  inStock: boolean;
  date: string;
  sales: number;
  onWeb: boolean;
  revenue: string;
  rating: string;
  action: any;
}
