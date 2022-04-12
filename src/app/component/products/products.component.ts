import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productList: any;

  public filterCategory: any;
  public searchKey: string = "";

  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProduct().subscribe(res => {
      this.productList = res;
      this.filterCategory = res;
      //add to quantity and total
      this.productList.forEach((a: any) => {

        // to chanage men's clothing & women's clothing category to fashion
        if (a.category === "women's clothing" || a.category === "men's clothing") {
          a.category = "fashion"
        }

        Object.assign(a, { quantity: 1, total: a.price })
      })

      console.log(this.productList)
    })
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val
    })
  }

  addtoCart(item: any) {
    this.cartService.addtoCart(item)
  }

  //for category

  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a
      }
    })
  }

}
