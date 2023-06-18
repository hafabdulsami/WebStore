import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({item:[]});

  constructor(private _snackBar: MatSnackBar) { }


  addToCart(item: CartItem): void{
    const items = [...this.cart.value.item] 
    const itemsInCart = items.find((_items)=> _items.id === item.id)

    if(itemsInCart){
      itemsInCart.quantity += 1;
    }else{
      items.push(item)
    }

    this.cart.next({ item: items });
    this._snackBar.open("i item added to cart",'OK',{duration:3000})
  
  }

  getTotal(item: Array<CartItem>): number{
    return item.map((item) => item.price*item.quantity).reduce((prev,current) => prev + current , 0)
  }
  clearCart(): void {
    this.cart.next({ item: [] });
    this._snackBar.open("Cart is cleared", "OK", { duration: 3000 });
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem>{
   const filteredItem = this.cart.value.item.filter((_item)=> _item.id !== item.id)

   if(update){
    this.cart.next({ item : filteredItem});
    this._snackBar.open("1 Item removed from cart",'OK',{
     duration:3000
    })
   }
   return filteredItem
  }

  removeQuantity(item :CartItem):void{
    let ItemForRemoval: CartItem|undefined;
    let filteredItem =  this.cart.value.item.map((_item)=>{
      if(_item.id === item.id){
        _item.quantity--;
        if(_item.quantity === 0){
          ItemForRemoval = _item;
        }
      }
      return _item;
    })

    if(ItemForRemoval){
      filteredItem =  this.removeFromCart(ItemForRemoval,false)
    }

    this.cart.next({item: filteredItem})
    this._snackBar.open('1 item removed from cart','OK',{duration: 3000})
  }
}

