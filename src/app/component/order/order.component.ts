import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interface/product';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ProductComponent, RouterOutlet, RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  @Input() orderedItem: Product[] = [];
  show: boolean = true;

  totalPerItem: number = 0;
  overall: number = 0;

  constructor(private router: Router, private activate: ActivatedRoute) {}

  ItemTotal = (index: number) => {
    if (this.orderedItem[index].quantity === undefined) {
      this.orderedItem[index].quantity = 1;
    } else if (this.orderedItem[index].quantity >= 1) {
      this.totalPerItem =
        this.orderedItem[index].quantity * this.orderedItem[index].price;
    }
    return this.totalPerItem;
  };

  overallPrice = () => {
    this.orderedItem.forEach((product) => {
      product.quantity = product.quantity ?? 1;
    });
    this.overall = this.orderedItem.reduce(
      (acc, item) => acc + item.price * (item.quantity ?? 1),
      0
    );
    return this.overall;
  };

  navigateToPage() {
    this.router.navigate(['/product']);
    this.show = false;
  }
}
