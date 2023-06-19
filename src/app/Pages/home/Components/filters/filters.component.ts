import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: "filters.components.html"
})
export class FiltersComponent {
  categories :Array<string> | undefined;
  @Output() showCategory = new EventEmitter<string>()
  categoreisSubscription: Subscription | undefined;
  constructor(private storeService:StoreService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categoreisSubscription =  this.storeService.getAllCategory()
    .subscribe((res) =>{
      this.categories = res
    })
  }

  onShowcategory(category: string) :void{
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.categoreisSubscription){
      this.categoreisSubscription.unsubscribe();
    }
  }
}
