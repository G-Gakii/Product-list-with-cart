import { Component, Input } from '@angular/core';
import { Product } from '../../interface/product';
import { CommonModule } from '@angular/common';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, OrderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  @Input() cartProduct: Product[] = [];

  totalPerItem!: number;
  itemQuantity: any = 0;
  overall!: number;
  displayOrder: boolean = false;

  ItemTotal = (index: number) => {
    if (this.cartProduct[index].quantity === undefined) {
      this.cartProduct[index].quantity = 1;
    } else if (this.cartProduct[index].quantity >= 1) {
      this.totalPerItem =
        this.cartProduct[index].quantity * this.cartProduct[index].price;
    }
    return this.totalPerItem;
  };
  Quantity(): void {
    this.cartProduct.forEach((product) => {
      product.quantity = product.quantity ?? 1;
    });
    this.itemQuantity = this.cartProduct.reduce(
      (acc, item) => acc + (item.quantity ?? 1),
      0
    );
    return this.itemQuantity;
  }

  overallPrice = () => {
    this.cartProduct.forEach((product) => {
      product.quantity = product.quantity ?? 1;
    });
    this.overall = this.cartProduct.reduce(
      (acc, item) => acc + item.price * (item.quantity ?? 1),
      0
    );
    return this.overall;
  };

  removeItem(index: number) {
    this.cartProduct.splice(index, 1);
  }
  confirmOrder() {
    this.displayOrder = true;
  }
}
