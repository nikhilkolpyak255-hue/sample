import { Component, ElementRef, HostListener,ViewChild  } from '@angular/core';

@Component({
  selector: 'app-farmer-navbar',
  standalone: false,
  templateUrl: './farmer-navbar.html',
  styleUrl: './farmer-navbar.scss',
})
export class FarmerNavbar {
   
  menuOpen = false;
  activeDropdown: string | null = null;

  @ViewChild('navbar', { static: true })
  navbar!: ElementRef;

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  toggleDropdown(name: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.activeDropdown === name) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = name;
    }
  }

  isOpen(name: string): boolean {
    return this.activeDropdown === name;
  }

  closeAll(): void {
    this.menuOpen = false;
    this.activeDropdown = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (
      this.navbar &&
      !this.navbar.nativeElement.contains(event.target)
    ) {
      this.closeAll();
    }
  }
}
