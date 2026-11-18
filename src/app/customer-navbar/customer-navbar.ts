import { Component,HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-customer-navbar',
  standalone: false,
  templateUrl: './customer-navbar.html',
  styleUrl: './customer-navbar.scss',
})
export class CustomerNavbar {
   sidebarOpen = false;
constructor(private elementRef: ElementRef) {}
toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}

closeSidebar() {
  this.sidebarOpen = false;
} 
@HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    // Close sidebar if click is outside the component
    if (!clickedInside && this.sidebarOpen) {
      this.closeSidebar();
    }
  }
}
