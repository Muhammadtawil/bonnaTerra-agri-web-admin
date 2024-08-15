import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../../app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  visibleProducts: Product[] = [];  // Products currently visible
  initialItemCount = 4;  // Default number of items to display initially for small screens
  loadMoreCount = 4;  // Default number of items to display on each "Show more" click for small screens

  constructor(private productService: ProductService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
    this.updateVisibleProducts(); // Set initial visible products
    this.adjustLayout(); // Adjust layout based on screen size
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
      this.initialItemCount = 11; // Default for larger screens
      this.loadMoreCount = 6; // Default for larger screens
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
    // Filter products
    if (category === '*') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
    
    // Reset visible products and update
    this.updateVisibleProducts();

    // Optional: Reset the "Show More" button if needed
    this.updateShowMoreButton();
  }
}
