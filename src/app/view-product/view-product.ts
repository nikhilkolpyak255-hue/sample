import { Component } from '@angular/core';

@Component({
  selector: 'app-view-product',
  standalone: false,
  templateUrl: './view-product.html',
  styleUrl: './view-product.scss',
})
export class ViewProduct {
  product = {
    id: 1,
    name: 'Organic Wheat',
    category: 'Grains',
    price: 2500,
    unit: '50 Kg',
    quantity: 20,
    farmer: 'Ramesh Patil',
    location: 'Solapur, Maharashtra',
    description:
      'Fresh organic wheat harvested directly from the farm without chemicals.',
    image:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=900',
    specifications: [
      { name: 'Quality', value: 'Premium Grade A' },
      { name: 'Harvest', value: '2026' },
      { name: 'Organic', value: 'Yes' },
      { name: 'Moisture', value: '10%' }
    ]
  };

  quantity = 1;

  increase() {
    if (this.quantity < this.product.quantity) {
      this.quantity++;
    }
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  buyNow() {
    alert('Proceeding to Checkout');
  }

  addToCart() {
    alert('Added to Cart');
  }
}
