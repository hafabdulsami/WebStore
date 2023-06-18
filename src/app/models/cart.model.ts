export interface Cart{
    item:Array<CartItem>;
}

export interface CartItem{
    product:string;
    name:string;
    price:number;
    quantity:number;
    id:number;
}