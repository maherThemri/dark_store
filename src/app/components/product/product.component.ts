import { PublicationService } from './../../services/publication.service';
import { Router } from '@angular/router';
import { OrderService } from './../../services/order.service';
import { Component, Input, OnInit } from "@angular/core";


@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  @Input() productInput: any;

  order:any={};
 
  constructor(private orderService:OrderService,
    private router:Router,
    ) {}

  ngOnInit() {}
  addOrder(id){
    this.order.idUser=localStorage.getItem('connectedUser');
    this.order.idPublication = id;
    this.order.idUserVendor=this.productInput.idUser
    console.log("hereeee add order",this.order);
    this.orderService.addOrder(this.order).subscribe((data)=>{
      console.log("here add order ",data.message);
      
    this.router.navigate(['myCommand']);
    });
      }
      viewProduct(id){
        this.router.navigate([`viewProduct/${id}`]);
      }
  prixColor(prix: number) {
    if (prix <= 500) {
      return "green";
    } else {
      return "red";
    }
  }
  qtyColor(q:number){
    if (q <= 2) {
      return "green";
    } else {
      return "red";
    }
  }
}
