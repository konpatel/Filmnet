import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isShow: boolean;
  topPosToStartShowing = 100;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private router: Router, private titleService: Title) {
    this.setTitle();
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt: any) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }


  setTitle() {
    this.titleService.setTitle('Filmnet');
  }

  @HostListener("window:resize")
  getScreenSize() {
    if (window.innerWidth >= 960) {
      this.onToggleClose();
    }
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isShow = scrollPosition >= this.topPosToStartShowing;
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onToggleClose() {
    this.sidenav.close();
  }

}
