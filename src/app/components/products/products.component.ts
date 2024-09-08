import { Component, OnInit, Renderer2, HostListener } from '@angular/core';

import { Product } from './product.model';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition, keyframes } from '@angular/animations';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../../../styles.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('productAnimation', [
      transition('void => *', [
        animate('0.6s ease-in-out', keyframes([
          style({ transform: 'scale(0.5)', offset: 0 }),
          style({ transform: 'scale(1.05)', offset: 0.7 }),
          style({ transform: 'scale(0.95)', offset: 0.9 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  visibleProducts: Product[] = [];
  initialItemCount = 4;
  loadMoreCount = 4;

  constructor(private productService: ProductService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
    this.updateVisibleProducts();
    this.adjustLayout();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.adjustLayout();
  }

  private adjustLayout(): void {
    if (window.innerWidth <= 768) {
      this.initialItemCount = 4;
      this.loadMoreCount = 4;
    } else {
      this.initialItemCount = 11;
      this.loadMoreCount = 6;
    }
    this.updateVisibleProducts();
  }

  private updateVisibleProducts(): void {
    this.visibleProducts = this.filteredProducts.slice(0, this.initialItemCount);
    this.updateShowMoreButton();
  }

  private updateShowMoreButton(): void {
    const showMoreButton = document.getElementById('show-more-btn');
    if (showMoreButton) {
      if (this.visibleProducts.length >= this.filteredProducts.length) {
        this.renderer.setStyle(showMoreButton, 'display', 'none');
      } else {
        this.renderer.setStyle(showMoreButton, 'display', 'block');
      }
    }
  }

  showMore(): void {
    const currentLength = this.visibleProducts.length;
    const nextBatch = this.filteredProducts.slice(currentLength, currentLength + this.loadMoreCount);
    this.visibleProducts = this.visibleProducts.concat(nextBatch);
    this.updateShowMoreButton();
  }

  onFilterClick(category: string): void {
    if (category === '*') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
    this.updateVisibleProducts();
  }
}
