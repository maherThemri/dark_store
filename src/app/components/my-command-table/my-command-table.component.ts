import { Router } from "@angular/router";
import { OrderService } from "./../../services/order.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-my-command-table",
  templateUrl: "./my-command-table.component.html",
  styleUrls: ["./my-command-table.component.css"],
})
export class MyCommandTableComponent implements OnInit {
  order: any = {};
  orders: any = [];
  id: any;
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.id = localStorage.getItem("connectedUser");
    this.orderService.getAllOrders().subscribe((data) => {
      let j = 0;
      for (let i = 0; i < data.orders.length; i++) {
        if (data.orders[i].idUser == this.id) {
          this.orders[j] = data.orders[i];

          j = j + 1;
        }
      }

      return this.orders;
    });
  }
  deleteOrder(id: any) {
    this.orderService.deleteOrder(id).subscribe((data) => {
      this.orderService.getAllOrders().subscribe((data) => {
        this.id = localStorage.getItem("connectedUser");
        let j = 0;
        for (let i = 0; i < data.orders.length; i++) {
          if (data.orders[i].idUser == this.id) {
            this.orders[j] = data.orders[i];

            j++;
          }
        }

        return this.orders;
      });
      this.router.navigate(["products"]);
    });
  }

  statusColor(status: string) {
    if (status == "Confirm") {
      return "green";
    } else {
      return "red";
    }
  }
}
