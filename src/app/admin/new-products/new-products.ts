import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { WebClientService } from '../../web-client-service';
import { Product } from '../../Entities/Product';

@Component({
  selector: 'app-new-products',
  standalone: false,
  templateUrl: './new-products.html',
  styleUrl: './new-products.scss'
})
export class NewProducts implements OnInit {

  products: Product[] = [];

  private webclient = inject(WebClientService);
  private cdr = inject(ChangeDetectorRef);


  // ==============================
  // COMPONENT INITIALIZATION
  // ==============================

  ngOnInit(): void {

    console.log('NewProducts component loaded');

    this.getProducts();

  }


  // ==============================
  // GET ALL PRODUCTS
  // ==============================

  getProducts(): void {

    this.webclient.getdata().subscribe({

      next: (data: any) => {

        console.log('API RESPONSE:', data);

        console.log(
          'Is Array:',
          Array.isArray(data)
        );

        console.log(
          'API Length:',
          data?.length
        );


        // API directly returns array
        if (Array.isArray(data)) {

          this.products = [...data];

        }

        // API returns { data: [] }
        else if (Array.isArray(data?.data)) {

          this.products = [...data.data];

        }

        // API returns { products: [] }
        else if (Array.isArray(data?.products)) {

          this.products = [...data.products];

        }

        else {

          console.error(
            'Unexpected API response:',
            data
          );

          this.products = [];

        }


        console.log(
          'FINAL PRODUCTS:',
          this.products
        );

        console.log(
          'FINAL LENGTH:',
          this.products.length
        );


        // Refresh Angular UI
        this.cdr.detectChanges();

      },


      error: (error) => {

        console.error(
          'API ERROR:',
          error
        );

        this.products = [];

      }

    });

  }



  // ==============================
  // APPROVE ONE PRODUCT
  // ==============================

  approveProduct(product: Product): void {

    console.log(
      'Approving ONLY product:',
      product
    );

    console.log(
      'Product ID:',
      product.p_id
    );



    this.products = this.products.filter(
      p => p.p_id !== product.p_id
    );


    console.log(
      'Remaining products:',
      this.products
    );


    this.cdr.detectChanges();

  }



  // ==============================
  // REJECT ONE PRODUCT
  // ==============================

  rejectProduct(product: Product): void {

    console.log(
      'Rejecting ONLY product:',
      product
    );

    console.log(
      'Product ID:',
      product.p_id
    );


    /*
     * Remove ONLY the selected product
     */

    this.products = this.products.filter(
      p => p.p_id !== product.p_id
    );


    console.log(
      'Remaining products:',
      this.products
    );


    this.cdr.detectChanges();

  }



  // ==============================
  // VIEW IMAGE / DOCUMENT
  // ==============================

  viewDocument(url: string): void {

    if (!url) {

      console.error(
        'Image/document URL is empty'
      );

      return;

    }


    window.open(
      url,
      '_blank'
    );

  }



  // ==============================
  // GET IMAGE URL
  // ==============================

  getImage(image: any): string {

    if (!image) {

      return '';

    }


    // If API returns an array
    if (Array.isArray(image)) {

      if (image.length === 0) {

        return '';

      }

      return image[0] || '';

    }


    // If API returns a string
    if (typeof image === 'string') {

      return image;

    }


    return '';

  }

}