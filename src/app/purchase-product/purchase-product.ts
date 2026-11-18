import { Component, inject, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebClientService } from '../web-client-service';
import { Product } from '../Entities/Product';
@Component({
  selector: 'app-purchase-product',
  standalone: false,
  templateUrl: './purchase-product.html',
  styleUrl: './purchase-product.scss',
})
export class PurchaseProduct implements OnInit {

  loading = true;
  private cd = inject(ChangeDetectorRef);
  private webclient = inject(WebClientService)
  constructor(private snackBar: MatSnackBar) { }
  // products = [
  //   {
  //     id: 1,
  //     title: 'iPhone 16 Pro',
  //     description: 'Latest Apple flagship smartphone.',
  //     image: 'https://picsum.photos/300/200?random=1',
  //     date: ''
  //   },
  //   {
  //     id: 2,
  //     title: 'Samsung Galaxy S25',
  //     description: 'Powerful Android smartphone.',
  //     image: 'https://picsum.photos/300/200?random=2',
  //     date: ''
  //   },
  //   {
  //     id: 3,
  //     title: 'MacBook Pro',
  //     description: 'Apple M4 powered laptop.',
  //     image: 'https://picsum.photos/300/200?random=3',
  //     date: ''
  //   },
  //   {
  //     id: 3,
  //     title: 'MacBook Pro',
  //     description: 'Apple M4 powered laptop.',
  //     image: 'https://picsum.photos/300/200?random=3',
  //     date: ''
  //   },
  //   {
  //     id: 3,
  //     title: 'MacBook Pro',
  //     description: 'Apple M4 powered laptop.',
  //     image: 'https://picsum.photos/300/200?random=3',
  //     date: ''
  //   },
  //   {
  //     id: 3,
  //     title: 'MacBook Pro',
  //     description: 'Apple M4 powered laptop.',
  //     image: 'https://picsum.photos/300/200?random=3',
  //     date: ''
  //   }
  // ];
  // ngOnInit(): void {
  //   setTimeout(() => {
  //     const now = new Date().toLocaleString();

  //     this.products.forEach(product => {
  //       product.date = now;

  //     });

  //     this.loading = false;

  //     console.log('Loading:', this.loading);
  //     console.log(this.products);
  //     this.cd.detectChanges();
  //   }, 2000);
  // }



  // buyNow(product: any): void {

  //   this.snackBar.open(
  //     `${product.title} added successfully!`,
  //     'Buy Now',
  //     {
  //       duration: 3000,
  //       horizontalPosition: 'right',
  //       verticalPosition: 'top',
  //       panelClass: ['success-snackbar']
  //     }
  //   );

  // }
  ngOnInit(): void {
    this.displayproducts();
  }
  product: Product[] = []
  searchterm = ''
  displayproducts() {
    this.webclient.getdata().subscribe({
      next: (data: any) => {
        this.product = data;
        console.log(this.product);
      }
    })
  }
}
