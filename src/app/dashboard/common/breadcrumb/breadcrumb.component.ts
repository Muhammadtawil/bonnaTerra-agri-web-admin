import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class AdminBreadcrumbComponent {
  @Input() title: string = 'Breadcrumb Title';
  @Input() homeLink: string = '/';
  @Input() breadcrumbItems: { label: string, link?: string }[] = [];
}
