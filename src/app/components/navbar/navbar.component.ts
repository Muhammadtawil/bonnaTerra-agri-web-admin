import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink, } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../app.component.css'],
  standalone: true,
  imports: [RouterLink,TranslateModule],

  
        providers: [
          TranslateService
        ],
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  isSmallScreen: boolean = false;
  lang: string;
  counter = 0;


  constructor(
    private translate: TranslateService,
    private router: Router,
  
  ) {
    this.translate.onLangChange.subscribe((event) => {
      this.lang = event.lang;
    });
    this.lang = this.translate.currentLang || 'en'; // Default language if none set
  }

  ngOnInit(): void {
    this.initializeMenu();
    this.onWindowScroll();  // Initialize scroll event
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const nTopBar = document.getElementById('top-bar')!;
    if (window.pageYOffset > 50) {
      nTopBar.classList.add('fixed');
    } else {
      nTopBar.classList.remove('fixed');
    }
  }

  initializeMenu(): void {
    const nTopBar = document.getElementById('top-bar')!;
    const nMenuToggler = document.getElementById('top-bar__navigation-toggler')!;
    const nNav = document.getElementById('top-bar__navigation')!;
    const jSubMenu = nNav.querySelectorAll('.submenu') as NodeListOf<HTMLElement>; 
    this.isSmallScreen = window.innerWidth <= 767;

    if (jSubMenu.length) {
      jSubMenu.forEach(submenu => submenu.closest('li')?.classList.add('has-children'));
    }

    this.attachLinkHandlers(nNav, nMenuToggler, nTopBar, jSubMenu);
    this.attachMenuTogglerHandler(nMenuToggler, nTopBar);
  }

  attachLinkHandlers(nNav: HTMLElement, nMenuToggler: HTMLElement, nTopBar: HTMLElement, jSubMenu: NodeListOf<HTMLElement>): void {
    const links = nNav.querySelectorAll('li a');
  
    links.forEach(link => {
      link.addEventListener('click', (e: Event) => {
        e.preventDefault();
  
        const hash = (link as HTMLAnchorElement).hash;
  
        if (hash) {
          const targetElement = document.querySelector(hash);
  
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - nTopBar.offsetHeight,
              behavior: 'smooth'
            });
          }
        }
  
        if (this.isSmallScreen) {
          this.isMenuOpen = false;
          nTopBar.classList.remove('expanded');
          nMenuToggler.classList.remove('active');
          document.documentElement.style.overflow = '';
        }
      });
    });
  
    links.forEach(link => {
      link.addEventListener('click', (e: Event) => {
        if (this.isSmallScreen && (link as HTMLElement).nextElementSibling?.classList.contains('submenu')) {
          e.preventDefault();
          const parentLi = (link as HTMLElement).parentElement;
  
          if ((link as HTMLElement).nextElementSibling?.classList.contains('submenu')) {
            if ((link as HTMLElement).nextElementSibling?.classList.contains('show')) {
              parentLi?.classList.remove('drop_active');
              (link as HTMLElement).nextElementSibling?.classList.remove('show');
            } else {
              nNav.querySelectorAll('li').forEach(li => li.classList.remove('drop_active'));
              jSubMenu.forEach(submenu => submenu.classList.remove('show'));
              parentLi?.classList.add('drop_active');
              (link as HTMLElement).nextElementSibling?.classList.add('show');
            }
          }
        }
      });
    });
  }
  

  attachMenuTogglerHandler(nMenuToggler: HTMLElement, nTopBar: HTMLElement): void {
    nMenuToggler.addEventListener('click', (e: Event) => {
      e.preventDefault();

      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        nTopBar.classList.add('expanded');
        nMenuToggler.classList.add('active');
        document.documentElement.style.overflow = 'hidden';
      } else {
        nTopBar.classList.remove('expanded');
        nMenuToggler.classList.remove('active');
        document.documentElement.style.overflow = '';
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isSmallScreen = window.innerWidth <= 767;

    if (!this.isSmallScreen) {
      const nTopBar = document.getElementById('top-bar')!;
      const nMenuToggler = document.getElementById('top-bar__navigation-toggler')!;
      const jSubMenu = document.querySelectorAll('.submenu');

      nTopBar.classList.remove('expanded');
      nMenuToggler.classList.remove('active');
      jSubMenu.forEach(submenu => submenu.removeAttribute('style'));
      document.documentElement.style.overflow = '';
      this.isMenuOpen = false;
    }
  }

  // translate: TranslateService = inject(TranslateService);

  translateText(): void {
    const lang = this.lang === 'ar' ? 'en' : 'ar'; // Toggle between 'en' and 'ar'
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    this.applyLanguageSettings();
  }

  applyLanguageSettings(): void {
    const lang = localStorage.getItem('lang') || this.lang;
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    const topBar = document.getElementById('top-bar');
    
    if (html && body && topBar) {
      html.setAttribute('lang', lang);
      html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      body.classList.remove(lang === 'ar' ? 'ltr' : 'rtl');
      body.classList.add(lang === 'ar' ? 'rtl' : 'ltr');
      
      // Dynamically adjust the order
      if (lang === 'ar') {
        topBar.style.flexDirection = 'row-reverse'; // Reverse the order
      } else {
        topBar.style.flexDirection = 'row'; // Default LTR order
      }
    }
    
    this.changeBtnGroupRadius(lang);
    this.changeNavDrawer(lang);
  }

  private changeBtnGroupRadius(lang: string | null): void {
    const labels = document.getElementsByTagName('label');
    const url = this.router.url;

    if (labels && url.includes('home')) {
      if (lang === 'ar') {
        labels[0].style.borderRadius = '0 3px 3px 0';
        labels[1].style.borderRadius = '3px 0 0 3px';
      } else {
        labels[0].style.borderRadius = '3px 0 0 3px';
        labels[1].style.borderRadius = '0 3px 3px 0';
      }
    }
    this.mirrorBackground(lang);
  }

  private mirrorBackground(lang: string | null): void {
    this.counter++;
    const styleElement = document.querySelector('style');
    const styleSheet = styleElement!.sheet;

    if (this.counter > 1 && styleSheet && styleSheet.cssRules.length > 0) {
      styleSheet.deleteRule(styleSheet.cssRules.length - 1);
    }

    if (styleSheet && lang === 'ar') {
      styleSheet.insertRule('#bg-shared::before { transform: scaleX(-1) !important; }', styleSheet.cssRules.length);
    } else if (styleSheet) {
      styleSheet.insertRule('#bg-shared::before { transform: scaleX(1) !important; }', styleSheet.cssRules.length);
    }
  }

  private changeNavDrawer(lang: string | null): void {
    const drawer = document.getElementById('offcanvasNavbar2');
    if (lang === 'ar') {
      drawer?.classList.remove('offcanvas-start');
      drawer?.classList.add('offcanvas-end');
    } else {
      drawer?.classList.remove('offcanvas-end');
      drawer?.classList.add('offcanvas-start');
    }
  }
}