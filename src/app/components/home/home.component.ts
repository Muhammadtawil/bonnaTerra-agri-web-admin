import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { BlogComponent } from '../blog/blog.component';
import { CarouselMainComponent } from '../carousel/carousel.component';
import { ContactComponent } from '../contact/contact.component';
import { PartneshipComponent } from '../partneship/partneship.component';
import { ProductsMainComponent } from '../products-main/products-main.component';
import { ScrolltopComponent } from '../scrolltop/scrolltop.component';
import { ServicesComponent } from '../services/services.component';
import { SustainabilityComponent } from '../sustainability/sustainability.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { WellnessComponent } from '../wellness/wellness.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProgressComponent } from '../progress/progress.component';
import { FooterComponent } from '../footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    CarouselMainComponent,
    AboutComponent,
    NavbarComponent,
    ServicesComponent,
    SustainabilityComponent,
    TestimonialsComponent,
    WellnessComponent,
    ProgressComponent,
    ProductsMainComponent,
    FooterComponent,
    BlogComponent,
    PartneshipComponent,
    ContactComponent,
    ScrolltopComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    NavbarComponent,
    ProgressComponent,
    TranslateModule,
  ],
  
  
  providers: [
  TranslateService
  ],
  templateUrl: './home.component.html',
  styleUrl: '../../app.component.css'
})
export class HomeComponent {

  translate: TranslateService = inject(TranslateService);

  translateText(lang: string) {
    this.translate.use(lang)
  }

}
