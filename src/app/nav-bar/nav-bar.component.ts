import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, AfterViewInit {
  @ViewChild('navBarWrapper', {static: true}) navBarWrapper: ElementRef;
  @ViewChild('navBar', {static: true}) navBar: ElementRef;
  @ViewChild('more', {static: true}) more: ElementRef;
  public isMenuCollapsed = true;
  public orientation: 'horizontal' | 'vertical';

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.setNavBarPosition(window.innerWidth);
  }

  ngOnInit(): void {
    this.setNavBarPosition(window.innerWidth);
  }

  ngAfterViewInit(): void {
    let i = this.navBar.nativeElement.childNodes.length;
    if (i < 8) {
      this.navBar.nativeElement.childNodes[i - 1].remove();
    } else {
      while (i > 6) {
        this.more.nativeElement.appendChild(this.navBar.nativeElement.childNodes[5]);
        --i;
      }
    }
  }

  private setNavBarPosition(deviceWidth: number): void {
    if (deviceWidth > 767) {
      this.orientation = 'horizontal';
      this.navBarWrapper.nativeElement.classList.remove('d-flex');
      this.navBar.nativeElement.classList.remove('nav-pills');
      this.navBar.nativeElement.classList.add('nav-tabs');
      this.navBar.nativeElement.classList.add('justify-content-center');
    } else {
      this.orientation = 'vertical';
      this.navBarWrapper.nativeElement.classList.add('d-flex');
      this.navBar.nativeElement.classList.remove('nav-tabs');
      this.navBar.nativeElement.classList.remove('justify-content-center');
      this.navBar.nativeElement.classList.add('nav-pills');
    }
  }

}
