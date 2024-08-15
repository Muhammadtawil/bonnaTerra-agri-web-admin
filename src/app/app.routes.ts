import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AboutpageComponent } from './components/aboutpage/aboutpage.component';
import { NewspageComponent } from './components/newspage/newspage.component';
import { SignInComponent } from './dashboard/authentication/sign-in/sign-in.component';
import { DashMainComponent } from './dashboard/main-page/main-page.component';
import { ProductsGridComponent } from './dashboard/products/products-grid/products-grid.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { ProductsListComponent } from './dashboard/products/products-list/products-list.component';
import { CreateProductsComponent } from './dashboard/products/create-products/create-products.component';
import { ProductDetailsComponent } from './dashboard/products/product-details/product-details.component';
import { EditProductComponent } from './dashboard/products/edit-product/edit-product.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  { path: 'about', component: AboutpageComponent },

  { path: 'category', component: ProductsComponent },

  { path: 'news', component: NewspageComponent},

  { path: 'dashboard/signin', component: SignInComponent },


  // { path: 'admin/main', component: DashMainComponent },
  // { path: 'admin/products-grid', component: ProductsGridComponent },

  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'main-page', pathMatch: 'full' },  // Set default child route
      { path: 'main-page', component: DashMainComponent },
      { path: 'products-grid', component: ProductsGridComponent },
      { path: 'products-list', component: ProductsListComponent },
      { path: 'create-product', component: CreateProductsComponent },
      { path: 'product-details', component: ProductDetailsComponent },
      { path: 'edit-product', component: EditProductComponent },

      

    ]
  },
  { path: '**', component: NotfoundComponent },

];
