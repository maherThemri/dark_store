import { PublicationService } from './../../services/publication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  products:any=[];
  constructor(private publicationService:PublicationService) { }

  ngOnInit() {
    this.publicationService.getAllPublications().subscribe((data)=>{
      let j=0;
      for (let i = 0; i < data.publications.length; i++) {
        if (data.publications[i].status=="confirm") {
          this.products[j]=data.publications[i];
          j++;
          console.log('products',this.products);
          
        }
      }
     return this.products;
    });
  }

}
