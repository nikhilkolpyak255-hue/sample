import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-wild-card-page',
  standalone: false,
  templateUrl: './wild-card-page.html',
  styleUrl: './wild-card-page.scss',
})
export class WildCardPage { constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }}
