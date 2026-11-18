import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
interface Fertilizer {
  id: number;
  title: string;
  price: number;
  image: string;
  date: string;
}
@Component({
  selector: 'app-buy-fertilizers',
  standalone: false,
  templateUrl: './buy-fertilizers.html',
  styleUrl: './buy-fertilizers.scss',
})
export class BuyFertilizers implements OnInit {
  
  private cd=inject(ChangeDetectorRef);
  loading: boolean = true;

  constructor(private snackBar: MatSnackBar) {}

  fertilizers = [
    {
      id: 1,
      images: [
        'https://picsum.photos/id/292/600/400',
        'https://picsum.photos/id/433/600/400',
        'https://picsum.photos/id/102/600/400'
      ],
      name: 'Organic Fertilizer',
      type: 'Organic',
      quantity: '50 Kg',
      price: 899,
      rating: 4.8,
      description: 'High quality organic fertilizer.',
      date: ''
    },
    {
      id: 2,
      images: [
        'https://picsum.photos/id/104/600/400',
        'https://picsum.photos/id/105/600/400',
        'https://picsum.photos/id/106/600/400'
      ],
      name: 'NPK Fertilizer',
      type: 'NPK',
      quantity: '25 Kg',
      price: 1199,
      rating: 4.6,
      description: 'Balanced nutrients for all crops.',
      date: ''
    },
    {
      id: 3,
      images: [
        'https://picsum.photos/id/107/600/400',
        'https://picsum.photos/id/108/600/400',
        'https://picsum.photos/id/109/600/400'
      ],
      name: 'Bio Fertilizer',
      type: 'Bio',
      quantity: '10 Kg',
      price: 699,
      rating: 4.5,
      description: 'Eco-friendly fertilizer.',
      date: ''
    }
  ];
 ngOnInit(): void {
    setTimeout(() => {
      const now = new Date().toLocaleString();

      this.fertilizers.forEach(Fertilizer => {
        Fertilizer.date = now;

      });

      this.loading = false;

      console.log('Loading:', this.loading);
      console.log(this.fertilizers);
      this.cd.detectChanges();
    }, 2000);
  }

  buyNow(Fertilizer: any): void {

    this.snackBar.open(
      `${Fertilizer.name} added successfully.`,
      '✕',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      }
    );

  }

  showError(): void {

    this.snackBar.open(
      'Something went wrong.',
      '✕',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      }
    );

  }


}
