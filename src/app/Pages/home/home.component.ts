import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html' ,
  styles: [
  ]
})
export class HomeComponent {
  product: Array<Product> | undefined
  sort = 'desc'
  count = '12'
  prductsubcription: Subscription | undefined
  constructor( private cartService:CartService, private Storeservice: StoreService ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProduct();
  }

  getProduct():void{
    this.Storeservice.getAllProducts(this.count,this.sort, this.category)
    .subscribe((_product)=>{
      this.product = _product
    })
  }
  cols = 3;
  category : string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols]

  onColumnsCountChange(colsNum: number): void {
    
      this.cols = colsNum;
      this.rowHeight = ROWS_HEIGHT[this.cols]
  }

  onShowcategory(newcategory : string):void{
    console.log(newcategory)
    this.category = newcategory
    this.getProduct()
  }

  onItemsCountChange(count:number):void {
    this.count = count.toString();
    this.getProduct();
  }
  onSortChange(Sort:string):void{
    this.sort = Sort
    this.getProduct();
  }

  onAddToCart(product:Product):void {
    this.cartService.addToCart({
      product:product.image,
      name:product.title,
      price: product.price,
      quantity: 1,
      id:product.id
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.prductsubcription){
      this.prductsubcription.unsubscribe();
    }
  }

}
