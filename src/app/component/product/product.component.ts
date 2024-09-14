import { Component, OnInit, signal, Signal } from '@angular/core';
import { Product } from '../../interface/product';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, CartComponent, RouterOutlet, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  cartItem: Product[] = [];

  constructor(private productservice: ProductService) {}

  ngOnInit(): void {
    this.productservice.getData().subscribe({
      next: (response: Product[]) => {
        this.products = response;

        this.products.forEach((element) => {
          element.quantity = 1;
        });
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  displayQuantityButton(index: number) {
    this.products[index].isactive = true;
    this.cartItem.push(this.products[index]);
  }

  // increment

  increment(index: number) {
    if (this.products[index].quantity === undefined) {
      this.products[index].quantity = 1;
    }
    this.products[index].isactive = true;
    this.products[index].quantity++;
  }
  decrement(index: number) {
    if (this.products[index].quantity === undefined) {
      this.products[index].quantity = 1;
    } else if (this.products[index].quantity > 0) {
      this.products[index].quantity--;
      if (this.products[index].quantity === 0) {
        this.products[index].isactive = false;
        let position = this.cartItem.indexOf(this.products[index]);
        this.cartItem.splice(position, 1);
      }
    }
  }
}
