import { PublicationService } from './../../services/publication.service';
import { publicationData } from 'src/app/data/data';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publication-info',
  templateUrl: './publication-info.component.html',
  styleUrls: ['./publication-info.component.css']
})
export class PublicationInfoComponent implements OnInit {
p:any={};
id:any;
publication:any=[];
  constructor(private activatedRoute:ActivatedRoute,
    private publicationService:PublicationService) { }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.publicationService.getPublicationByID(this.id).subscribe(
      (data)=>{
        this.p=data.publication;
      });
  }

}
