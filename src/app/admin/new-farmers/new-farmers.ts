import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

@Component({
  selector: 'app-new-farmers',
  standalone: false,
  templateUrl: './new-farmers.html',
  styleUrl: './new-farmers.scss',
})
export class NewFarmers {
    pendingUsers = [
    {
      id: 101,
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '+91 98765 43210',
      location: 'Solapur, Maharashtra',
      createdAt: new Date(),

      documents: [
        'assets/documents/aadhaar-rahul.jpg',
        'assets/documents/land-rahul.jpg'
      ]
    },

    {
      id: 102,
      name: 'Priya Patil',
      email: 'priya@example.com',
      phone: '+91 98765 12345',
      location: 'Pune, Maharashtra',
      createdAt: new Date(),

      documents: [
        'assets/logo.jpeg',
        'assets/documents/land-priya.jpg'
      ]
    }
  ];


  approveUser(user: any): void {

    console.log('Approving farmer:', user);

    this.pendingUsers = this.pendingUsers.filter(
      u => u.id !== user.id
    );
  }


  rejectUser(user: any): void {

    console.log('Rejecting farmer:', user);

    this.pendingUsers = this.pendingUsers.filter(
      u => u.id !== user.id
    );
  }


  viewDocument(documentUrl: string): void {

    window.open(documentUrl, '_blank');

  }

}
