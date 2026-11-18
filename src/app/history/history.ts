import { Component ,OnInit} from '@angular/core';
interface Purchase {
  purchaseDate: Date;
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  supplier: string;
}
@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
   searchText = '';
  selectedCategory = '';

  purchases: Purchase[] = [
    {
      purchaseDate: new Date('2026-07-01'),
      productName: 'Hybrid Wheat Seed',
      category: 'Seed',
      quantity: 25,
      unit: 'Kg',
      price: 90,
      supplier: 'Green Agro'
    },
    {
      purchaseDate: new Date('2026-07-05'),
      productName: 'DAP Fertilizer',
      category: 'Fertilizer',
      quantity: 10,
      unit: 'Bag',
      price: 1450,
      supplier: 'Agri Supplies'
    },
    {
      purchaseDate: new Date('2026-07-12'),
      productName: 'Cotton Seed',
      category: 'Seed',
      quantity: 15,
      unit: 'Packet',
      price: 850,
      supplier: 'Kisan Seeds'
    },
    {
      purchaseDate: new Date('2026-07-20'),
      productName: 'Urea',
      category: 'Fertilizer',
      quantity: 20,
      unit: 'Bag',
      price: 300,
      supplier: 'National Fertilizers'
    }
  ];

  filteredPurchases(): Purchase[] {
    return this.purchases.filter(item =>
      item.productName.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedCategory === '' || item.category === this.selectedCategory)
    );
  }

}
