import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ProductsServices } from '../../../services/products.services';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CategoriesServices } from '../../../services/categoris.services';
import { CategoryInetrface, GetProductInterface } from '../../../services/interfaces';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'admin-products-grid',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatCheckboxModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
      RouterOutlet,
      MatMenuModule
  ],
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
})
export class ProductsGridComponent implements OnInit {
  productList: GetProductInterface[] = [];
  categoriesList: CategoryInetrface[] = [];
  filteredProducts: GetProductInterface[] = [];
  selectedCategory: string = 'all';
  startValue = 0;
  endValue = 100;

  constructor(
    public themeService: CustomizerSettingsService,
    private productService: ProductsServices,
    private categoryService: CategoriesServices
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.getCategories();
  }

  getCategories() {
    return this.categoryService.getCategories().subscribe({
      next: (data) => {
        console.log('Categories received:', data);
        this.categoriesList = data;
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

  getAllProducts() {
    return this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Products received:', data);
            this.productList = data;
            this.filteredProducts = this.productList;
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
  
  
  filterByCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.filterProducts();
  }

  filterByPrice() {
    this.filterProducts();
  }
  filterProducts() {
    console.log('Filtering with category:', this.selectedCategory);
    this.filteredProducts = this.productList.filter((product) => {
      console.log('Product categoryId:', product.category.id);
      const matchesCategory =
        this.selectedCategory === 'all' ||
        (product.category.id && product.category.id.toString() === this.selectedCategory.toString());
      const matchesPrice = product.price >= this.startValue && product.price <= this.endValue;
      return matchesCategory && matchesPrice;
    });
    console.log('Filtered products:', this.filteredProducts);
  }
  
  trackByCategoryId(index: number, category: CategoryInetrface) {
    return category.id;
  }
}
