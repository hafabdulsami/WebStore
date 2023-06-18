import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: "filters.components.html"
})
export class FiltersComponent {
  categories = ["shoes", 'sports'];
  @Output() showCategory = new EventEmitter<string>()
  
  constructor(){}


  onShowcategory(category: string) :void{
    this.showCategory.emit(category);
  }
}
