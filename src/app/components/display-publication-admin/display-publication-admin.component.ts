import { PublicationService } from './../../services/publication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-publication-admin',
  templateUrl: './display-publication-admin.component.html',
  styleUrls: ['./display-publication-admin.component.css']
})
export class DisplayPublicationAdminComponent implements OnInit {
 // object
 publication: any = {};
 // form Id
 publicationForm: FormGroup;
 publications:any=[];
 id:any;
 errorMsg:string;

  constructor(private activatedRoute:ActivatedRoute,
    private publicationService:PublicationService,
    private router:Router) { }

  ngOnInit() {
    this.id= this.activatedRoute.snapshot.paramMap.get('id');
this.publicationService.getPublicationByID(this.id).subscribe((data)=>{
  this.publication=data.publication;
});
  }
  confirmPublication() {
    this.publication.status="confirm";
    this.publicationService.editPublicationById(this.publication).subscribe((data)=>{
      if (data.message=="Success") {
        this.router.navigate(["admin"]);
      } else {
        this.errorMsg="Publication object is not Confirm";
      }
    });
  }

}
