import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-aboutpage',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './aboutpage.component.html',
  styleUrls: ['./aboutpage.component.css','../../../styles.css']
})
export class AboutpageComponent {

}
