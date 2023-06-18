import { Component } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl:"cart.component.html" 
})
export class CartComponent {


  cart:Cart = {item:[{ product:"https://via.placeholder.com/150",
    name:"Shoes",
    price:150,
    quantity:3,
    id:1,},
    { product:"https://via.placeholder.com/150",
    name:"Shoes",
    price:150,
    quantity:1,
    id:1,},
    { product:"https://via.placeholder.com/150",
    name:"Shoes",
    price:150,
    quantity:1,
    id:1,}
  ]}
    dataSource:Array<CartItem> = [];
    displayedColumn: Array<string> = [
      'product',
      'name',
      'price',
      'quantity',
      'total',
      'action'
    ]

    constructor(private cartService:CartService){

    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.dataSource = this.cart.item
      this.cartService.cart.subscribe((_cart:Cart)=>{
        this.cart = _cart
        this.dataSource = this.cart.item
      })
    }

    getTotal(item: Array<CartItem>): number{
     return this.cartService.getTotal(item)
    }


    onClearCart(): void{
      this.cartService.clearCart();
    }

    onRemoveFromCart(item:CartItem): void{
      this.cartService.removeFromCart(item);
    }

    onAddQuantity(item: CartItem):void{
      this.cartService.addToCart(item)
    }

    onRemoveQuantity(item: CartItem){
      this.cartService.removeQuantity(item)
    }
}
