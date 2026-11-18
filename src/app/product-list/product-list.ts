import { Component, inject, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { WebClientService } from '../web-client-service';
import { Product } from '../Entities/Product';


@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {

  loading = true;
  products: Product[] = [];
  constructor(private cd: ChangeDetectorRef) { }
  private webclient = inject(WebClientService);
  ngOnInit(): void {
    this.Getproducts();
  }

  Getproducts() {
    this.webclient.getdata().subscribe({
      next: (data) => {
        console.log(data)
        this.products = data;
        this.cd.detectChanges();
        console.log("Products details", this.products)
      },
      error: (error) => {
        console.error('API error:', error);
        this.loading = false;
      }
    })
  }

}
