import { Component, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  
   // =====================================================
  // SIDEBAR
  // =====================================================

  isCollapsed: boolean = false;


  // =====================================================
  // MOBILE MORE MENU
  // =====================================================

  mobileMoreOpen: boolean = false;


  // =====================================================
  // COUNTS
  // Replace these values with your API/service values
  // =====================================================

  pendingFarmers: number = 0;

  pendingCustomers: number = 0;

  pendingProducts: number = 0;

  requestCount: number = 0;


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private router: Router
  ) {}


  // =====================================================
  // ON INIT
  // =====================================================

  ngOnInit(): void {

    this.loadCounts();

  }


  // =====================================================
  // SIDEBAR TOGGLE
  // =====================================================

  toggleSidebar(): void {

    /*
     * Desktop:
     *
     * Open:
     * 260px
     *
     * Collapsed:
     * 78px
     */

    this.isCollapsed = !this.isCollapsed;

  }


  // =====================================================
  // MOBILE MORE MENU
  // =====================================================

  toggleMobileMore(): void {

    this.mobileMoreOpen = !this.mobileMoreOpen;

  }


  // =====================================================
  // CLOSE MOBILE MORE MENU
  // =====================================================

  closeMobileMore(): void {

    this.mobileMoreOpen = false;

  }


  // =====================================================
  // LOAD COUNTS
  // =====================================================

  loadCounts(): void {

    /*
     * Connect your services here.
     *
     * Example:
     *
     * this.adminService.getPendingFarmers().subscribe(
     *   count => {
     *     this.pendingFarmers = count;
     *   }
     * );
     */

    this.pendingFarmers = 0;

    this.pendingCustomers = 0;

    this.pendingProducts = 0;

    this.requestCount = 0;

  }


  // =====================================================
  // LOGOUT
  // =====================================================

  logout(): void {

    /*
     * Clear authentication data.
     *
     * Change these keys according to your application.
     */

    localStorage.removeItem('token');

    localStorage.removeItem('adminToken');

    localStorage.removeItem('admin');

    localStorage.removeItem('user');

    sessionStorage.clear();


    // Close mobile menu

    this.mobileMoreOpen = false;


    // Redirect to login

    this.router.navigate(['/login']);

  }


  // =====================================================
  // CLOSE MORE MENU WHEN CLICKING ESC
  // =====================================================

  @HostListener('document:keydown.escape')
  onEscape(): void {

    this.mobileMoreOpen = false;

  }


  // =====================================================
  // CLOSE MORE MENU WHEN SCREEN BECOMES DESKTOP
  // =====================================================

  @HostListener('window:resize')
  onResize(): void {

    /*
     * When moving from mobile to desktop,
     * close the mobile More menu.
     */

    if (window.innerWidth > 767) {

      this.mobileMoreOpen = false;

    }

  }

}
