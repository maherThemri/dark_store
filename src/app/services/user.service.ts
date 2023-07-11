import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private connectedUser: string;
  private authStatusListener = new Subject<boolean>();
  public err = new BehaviorSubject<any>(null);

  userURL: string = "http://localhost:3000/users";
  constructor(private httpClient: HttpClient, private router: Router) {
    var currentUser = localStorage.getItem("connectedUser");
    if (currentUser === null) {
      this.isAuthenticated = false;
    } else {
      this.isAuthenticated = true;
    }
  }
  // Reponse: message Add user
  signup(obj: any, img: File) {
    let formData = new FormData();
    formData.append("firstName", obj.firstName);
    formData.append("lastName", obj.lastName);
    formData.append("email", obj.email);
    formData.append("pwd", obj.pwd);
    formData.append("phoneNumber", obj.phoneNumber);
    formData.append("address", obj.address);
    formData.append("role", obj.role);
    formData.append("img", img);
    return this.httpClient.post<{ message: string }>(
      this.userURL + "/signup",
      formData
    );
  }
  // Reponse: Tableau d'objets
  getAllUsers() {
    return this.httpClient.get<{ users: any; message: string }>(this.userURL);
  }
  // Reponse: String Message
  deleteUser(id: any) {
    return this.httpClient.delete<{ message: string }>(`${this.userURL}/${id}`);
  }
  // Reponse: String Message&& User
  // login(obj){
  //   return this.httpClient.post<{message:string, user:any}>(this.userURL +"/login", obj);
  // }
  // Reponse:Obj
  getUserById(id: any) {
    return this.httpClient.get<{ user: any }>(`${this.userURL}/profile/${id}`);
  }
  // Reponse: String Message
  editUser(obj: any) {
    return this.httpClient.put<{ message: string }>(
      `${this.userURL}/editProfile`,
      obj
    );
  }

  // ****************

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getconnectedUser() {
    return this.connectedUser;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  signIn(email: string, pwd: string) {
    const authData = { email: email, pwd: pwd };
    this.httpClient
      .post<{
        token: string;
        expiresIn: number;
        connectedUser: string;
        role: string;
      }>(`${this.userURL}/signin`, authData)
      .subscribe(
        (response) => {
          this.err.next(null);
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.connectedUser = response.connectedUser;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.connectedUser);
            if (response.role === "admin") {
              this.router.navigate(["/admin"]);
            } else {
              this.router.navigate(["/"]);
            }
          }
        },
        (err) => {
          this.err.next(err);
        }
      );
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["login"]);
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.connectedUser = authInformation.connectedUser;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const connectedUser = localStorage.getItem("connectedUser");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      connectedUser: connectedUser,
    };
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  private saveAuthData(token: string, expirationDate: Date, connectedUser: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("connectedUser", connectedUser);
  }
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("connectedUser");
  }
}
