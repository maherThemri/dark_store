import { OrderService } from './../../services/order.service';
import { PublicationService } from './../../services/publication.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
id:any;
product:any={};
order:any={};
  constructor(private activatedRoute:ActivatedRoute,
    private router:Router,
    private publicationService:PublicationService,
    private orderService:OrderService) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    console.log("here id ",this.id);
    this.publicationService.getPublicationByID(this.id).subscribe((data)=>{
      this.product=data.publication;
    });
    
  }
  addOrder(id){
    this.order.idUser=localStorage.getItem('connectedUser');
    this.order.idPublication = id;
    this.order.idUserVendor=this.product.idUser
    console.log("hereeee add order",this.order);
    this.orderService.addOrder(this.order).subscribe((data)=>{
      console.log("here add order ",data.message);
      
    this.router.navigate(['myCommand']);
    });
      }

}
