import { PublicationService } from './../../services/publication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-edit-publication",
  templateUrl: "./edit-publication.component.html",
  styleUrls: ["./edit-publication.component.css"],
})
export class EditPublicationComponent implements OnInit {
  // object
  publication: any = {};
  // form Id
  publicationForm: FormGroup;
  publications:any=[];
  id:any;
  errorMsg:string;
  constructor(private activatedRoute:ActivatedRoute,
    private publicationService:PublicationService,
    private router:Router) {}

  ngOnInit() {
this.id= this.activatedRoute.snapshot.paramMap.get('id');
this.publicationService.getPublicationByID(this.id).subscribe((data)=>{
  this.publication=data.publication;
});
  }
  editPublication() {
    this.publicationService.editPublicationById(this.publication).subscribe((data)=>{
      if (data.message=="Success") {
        this.router.navigate(["myPublication"]);
      } else {
        this.errorMsg="Publication object is not updated";
      }
    });
  }
}
