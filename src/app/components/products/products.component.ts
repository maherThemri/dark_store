import { PublicationService } from './../../services/publication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products:any=[];
  constructor(private publicationService:PublicationService) { }

  ngOnInit() {
    this.publicationService.getAllPublications().subscribe((data)=>{
      let j=0;
      for (let i = 0; i < data.publications.length; i++) {
        if (data.publications[i].status=="confirm") {
          this.products[j]=data.publications[i];
          j++;
          
          
        }
      }
     return this.products;
    });
  }
 

}
