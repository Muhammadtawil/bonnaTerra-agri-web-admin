import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-aboutpage',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './aboutpage.component.html',
  styleUrl: './aboutpage.component.css'
})
export class AboutpageComponent {

}
