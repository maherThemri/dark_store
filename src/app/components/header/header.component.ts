import { UserService } from "./../../services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit,OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit,OnDestroy {
  id: any;

  connectedUser: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  profile: any;
  username: string;
  profileisSet = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.id = localStorage.getItem("connectedUser");
    this.userService.getUserById(this.id).subscribe((data) => {
      console.log("here data to header", data.user.role);

      this.connectedUser = data.user.role;
      console.log("here connectedUser", this.connectedUser);
    });
    this.userIsAuthenticated = this.userService.getIsAuth();
    console.log("here auth", this.userIsAuthenticated);
    this.authListenerSubs = this.userService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        console.log("here is authenticated", isAuthenticated);
      });
  }
  //   logOut(){
  //     localStorage.removeItem("connectedUser");
  // this.router.navigate([""]);
  //   }
  onLogOut() {
    this.userService.logout();
  }
  ngOnDestroy() {
    console.log("here this.authListenerSubs", this.authListenerSubs);

    this.authListenerSubs.unsubscribe();
  }
}
