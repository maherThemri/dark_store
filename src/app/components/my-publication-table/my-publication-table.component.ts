import { OrderService } from "./../../services/order.service";
import { PublicationService } from "./../../services/publication.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-publication-table",
  templateUrl: "./my-publication-table.component.html",
  styleUrls: ["./my-publication-table.component.css"],
})
export class MyPublicationTableComponent implements OnInit {
  pub: any = {};
  publication: any = [];
  order: any = {};
  orders: any = [];
  id: any;
  constructor(
    private router: Router,
    private publicationService: PublicationService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.id = localStorage.getItem("connectedUser");
    this.publicationService.getMyPublicationByID(this.id).subscribe((data) => {
     this.publication=data.publication;
    });
    

    this.orderService.getAllOrders().subscribe((data) => {
      let j = 0;
      for (let i = 0; i < data.orders.length; i++) {

        if (data.orders[i].idUserVendor == this.id) {
          this.orders[j] = data.orders[i];
          j++;
        }
      }

      return this.orders;
    });
  }
  goToDisplay(id: any) {
    this.router.navigate([`publicationInfo/${id}`]);
  }
  goToEdit(id: any) {
    this.router.navigate([`editPublication/${id}`]);
  }
  delete(id: any) {
    this.publicationService.deletePublication(id).subscribe((data) => {
      this.publicationService.getMyPublicationByID(this.id).subscribe((data) => {
        this.publication = data.publication;
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
  
}
