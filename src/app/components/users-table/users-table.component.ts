import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.css"],
})
export class UsersTableComponent implements OnInit {
  user: any = {};
  users: any = [];
  pageOfItems: Array<any>;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data.users;
    });
  }
  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe((data) => {
      this.userService.getAllUsers().subscribe((data) => {
        for (let i = 0; i < data.users.length; i++) {
          if (data.users[i].role == "client") {
            this.users[i] = data.users[i];
          }
        }
        return this.users;
      });
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
