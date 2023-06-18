import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl:"product-header.component.html" ,

})
export class ProductsHeaderComponent {
  @Output() columnCountChange = new EventEmitter<number>();
  @Output() itemCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sort="desc";
  itemshowCount = 12
  constructor(){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  onSortUpdated(newsort: string) : void{
    this.sort = newsort
    this.sortChange.emit(newsort)
  }

  onItemUpdated(count: number) : void{
    this.itemshowCount = count
    this.itemCountChange.emit(count)
  }

  onClickUpdated(colsnum: number) : void{
    this.columnCountChange.emit(colsnum);
  }
}
