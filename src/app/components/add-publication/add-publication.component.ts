import { Router } from "@angular/router";
import { PublicationService } from "./../../services/publication.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-add-publication",
  templateUrl: "./add-publication.component.html",
  styleUrls: ["./add-publication.component.css"],
})
export class AddPublicationComponent implements OnInit {
  // object
  publication: any = {};
  // form Id
  publicationForm: FormGroup;
  imagePreview: string;
  id: string;
  myFile: File;
  constructor(
    private publicationService: PublicationService,
    private router: Router
  ) {}

  ngOnInit() {}
  // Called Method when btn is clicked
  sendPublication() {
    this.id = localStorage.getItem("connectedUser");
    this.publication.idUser = this.id;
    this.publicationService
      .addPublication(this.publication, this.myFile)
      .subscribe((data) => {
        console.log("here add publication with success", data.message);
        this.router.navigate(["myPublication"]);
      });
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    // this.publicationForm.patchValue({ img: file });
    // this.publicationForm.updateValueAndValidity();
    this.myFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
