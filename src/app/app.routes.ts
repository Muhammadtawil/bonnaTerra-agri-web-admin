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
import { CategoriesListComponent } from './dashboard/categories/categories-list/categories-list.component';
import { CreateCategoryComponent } from './dashboard/categories/create-category/create-category.component';
import { EditCategoryComponent } from './dashboard/categories/edit-category/edit-category.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateContactComponent } from './dashboard/contacts/create-contact/create-contact.component';
import { AdminContactListComponent } from './dashboard/contacts/contact-list/contact-list.component';
import { UsersListComponent } from './dashboard/users/users-list/users-list.component';
import { CreateUserComponent } from './dashboard/users/create-user/create-user.component';
import { TeamMembersComponent } from './dashboard/users/team-members/team-members.component';
import { TodoListComponent } from './dashboard/to-do/todo-list/todo-list.component';
import { CalendarComponent } from './dashboard/calendar/calendar.component';
import { ReviewsComponent } from './dashboard/products/reviews/reviews.component';
import { SellersComponent } from './dashboard/sellers/sellers.component';
import { CreateSellerComponent } from './dashboard/sellers/create-seller/create-seller.component';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { AccountSettingsComponent } from './dashboard/settings/account-settings/account-settings.component';
import { ChangePasswordComponent } from './dashboard/settings/change-password/change-password.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ProfileAboutComponent } from './dashboard/profile/about/about.component';
import { SubscribersComponent } from './dashboard/subscribers/subscribers.component';
import { EventsComponent } from './dashboard/events/events.component';
import { NotificationsPageComponent } from './dashboard/notifications-page/notifications-page.component';
import { SignUpComponent } from './dashboard/authentication/sign-up/sign-up.component';
import { AdminNewsComponent } from './dashboard/news/news.component';
import { ForgotPasswordComponent } from './dashboard/authentication/forgot-password/forgot-password.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  { path: 'about', component: AboutpageComponent },

  { path: 'category', component: ProductsComponent },

  { path: 'news', component: NewspageComponent},

  { path: 'dashboard/auth/signin', component: SignInComponent },
  { path: 'dashboard/auth/logout', component: SignUpComponent },
  { path: 'dashboard/auth/forgot-password', component: ForgotPasswordComponent },



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

      { path: 'categories', component: CategoriesListComponent },
      { path: 'create-category', component: CreateCategoryComponent },
      { path: 'edit-category', component: EditCategoryComponent },
      
      { path: 'contacts-list', component: AdminContactListComponent },
      { path: 'create-contact', component: CreateContactComponent },
      { path: 'edit-contact/:id', component: CreateContactComponent },

      { path: 'users-list', component: UsersListComponent },
      { path: 'create-user', component: CreateUserComponent },
      { path: 'team-members', component: TeamMembersComponent },

      { path: 'to-do-list', component: TodoListComponent },

      { path: 'calendar', component: CalendarComponent },

      { path: 'products-reviews', component: ReviewsComponent },

      { path: 'sellers', component: SellersComponent },
      { path: 'create-seller', component: CreateSellerComponent },


      { path: 'customers', component: CustomersComponent },
      { path: 'create-customer', component: ReviewsComponent },

      {
        path: 'settings',
        component: SettingsComponent,
        children: [
            {path: '', component: AccountSettingsComponent},
            {path: 'change-password', component: ChangePasswordComponent},
        ]
    },

    {
      path: 'user-profile',
      component: ProfileComponent,
      children: [
          {
              path: '',
              component: ProfileAboutComponent,
              children: [
                  {path: '', component: ProfileAboutComponent},
                  {path: 'about', component: ProfileAboutComponent},
             
              ]
          }, ]},


      { path: 'subscribers', component: SubscribersComponent },
      { path: 'events', component: EventsComponent },
      { path: 'notifications', component: NotificationsPageComponent },
      { path: 'admin-news', component: AdminNewsComponent },
      

          


    ]
  },


  { path: '**', component: NotfoundComponent },

];
