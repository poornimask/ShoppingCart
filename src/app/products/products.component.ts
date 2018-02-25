import { Component, OnInit } from '@angular/core';
import { ProductService } from "app/product.service";
import { CategoryService } from "app/category.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "app/models/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{
 products: Product[];
 filteredProducts : Product[];
 categories$;
 category : string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService, categoryService: CategoryService) {
    productService.getAll().subscribe(products => this.products = products);
    this.categories$ = categoryService.getAll();
    
    route.queryParamMap.subscribe(params => {
    this.category = params.get('category');
    this.filteredProducts = (this.category) ? 
    this.products.filter( p => p.category === this.category) :
    this.products
    });
   }

}
