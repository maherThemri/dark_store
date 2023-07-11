import { OrderService } from "./../../services/order.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-my-publication-commander-table",
  templateUrl: "./my-publication-commander-table.component.html",
  styleUrls: ["./my-publication-commander-table.component.css"],
})
export class MyPublicationCommanderTableComponent implements OnInit {
  order: any = {};
  orders: any = [];
  id: any;
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.id = localStorage.getItem("connectedUser");
    this.orderService.getAllOrders().subscribe((data) => {
      let j = 0;
      for (let i = 0; i < data.orders.length; i++) {
        console.log("here data", data.orders[i].idUserVendor);
        console.log("here data", data.orders);
        console.log("id connectedUser", this.id);
        if (data.orders[i].idUserVendor == this.id) {
          this.orders[j] = data.orders[i];

          j++;
        }
      }
      console.log(this.orders);

      return this.orders;
    });
  }
  confirmOrder(obj) {
    obj.status = "Confirm";

    this.orderService.editOrderById(obj).subscribe((data) => {
      if (data.message == "Success") {
        this.id = localStorage.getItem("connectedUser");

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
    });
  }
  refuseOrder(id: any) {
    this.orderService.deleteOrder(id).subscribe((data) => {
      this.orderService.getAllOrders().subscribe((data) => {
        this.id = localStorage.getItem("connectedUser");

        let j = 0;
        for (let i = 0; i < data.orders.length; i++) {
          if (data.orders[i].idUserVendor == this.id) {
            this.orders[j] = data.orders[i];
            j++;
          }
        }

        return this.orders;
      });
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
