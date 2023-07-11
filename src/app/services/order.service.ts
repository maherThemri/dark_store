import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  // Adresse du serveur BE
  orderURL: string = "http://localhost:3000/orders";
  // Livreur : http
  constructor(private http: HttpClient) {}
  // Reponse: String Message 
  addOrder(obj:any) {
    console.log("here object with services",obj);
    
return this.http.post<{message:string}>(this.orderURL,obj);
  }
  // obj : nouvelles valeurs
  // Reponse:String message
  editOrderById(obj:any) {
    console.log("here order status with service",obj);
    
    return this.http.put<{message:string}>(this.orderURL,obj);
  }
  
  // Reponse: String Message
  deleteOrder(id: any) {
    return this.http.delete<{message:string}>(`${this.orderURL}/${id}`);
  }
  // Reponse: Tableau d'objets all orders
  getAllOrders() {
    return this.http.get<{orders:any,message:string}>(this.orderURL);
  }
  // Reponse: tableau d'objet My orders
  // getMyOrders(id) {
  //   console.log("here my orders",`${this.orderURL}/myOrders/${id}`);
    
  //   return this.http.get<{orders:any}>(`${this.orderURL}/myOrders/${id}`);
  // }
  // Reponse: un Objet
  getOrderByID(id: any) {
    return this.http.get<{order:any}>(`${this.orderURL}/${id}`);
  }
}

