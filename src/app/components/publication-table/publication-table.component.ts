import { FormGroup } from "@angular/forms";
import { PublicationService } from "./../../services/publication.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-publication-table",
  templateUrl: "./publication-table.component.html",
  styleUrls: ["./publication-table.component.css"],
})
export class PublicationTableComponent implements OnInit {
  pub: any = {};
  publications: any = [];
  publication: any = {};
  // form Id
  publicationForm: FormGroup;
  id: any;
  pageOfItems: Array<any>;

  constructor(private publicationService: PublicationService) {}

  ngOnInit() {
    this.publicationService.getAllPublications().subscribe((data) => {
      this.publications = data.publications;
    });
  }

  goToDisplay(id: any) {
    this.publicationService.getPublicationByID(id).subscribe((data) => {
      this.publication = data.publication;
    });
  }
  confirmPublication() {
    this.publication.status = "confirm";
    this.publicationService
      .editPublicationById(this.publication)
      .subscribe((data) => {
        if (data.message == "Success") {
          this.publicationService.getAllPublications().subscribe((data) => {
            this.publications = data.publications;
          });
        }
      });
  }
  deletePublication(id: any) {
    this.publicationService.deletePublication(id).subscribe((data) => {
      this.publicationService.getAllPublications().subscribe((data) => {
        this.publications = data.publications;
      });
    });
  }
  statusColor(status: string) {
    if (status == "confirm") {
      return "green";
    } else {
      return "red";
    }
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
