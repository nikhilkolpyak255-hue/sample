import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
    farmerCount = 0;
  customerCount = 0;
  productCount = 0;

  pendingFarmers = 0;
  pendingCustomers = 0;
  pendingProducts = 0;

  requestCount = 0;
  replyCount = 0;

  constructor() {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {

    /*
     * Put your existing API calls here.
     *
     * Example:
     *
     * this.farmerService.getAllFarmers().subscribe({
     *   next: (data) => {
     *     this.farmerCount = data.length;
     *   }
     * });
     */

    this.farmerCount = 0;
    this.customerCount = 0;
    this.productCount = 0;

    this.pendingFarmers = 0;
    this.pendingCustomers = 0;
    this.pendingProducts = 0;

    this.requestCount = 0;
    this.replyCount = 0;
  }
}
