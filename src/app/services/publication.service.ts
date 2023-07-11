import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PublicationService {
  // Adresse du serveur BE
  publicationURL: string = "http://localhost:3000/publications";
  // Livreur : http
  constructor(private http: HttpClient) {}
  // Reponse: String Message 
  addPublication(obj:any,img:File) {
    let formData= new FormData();
    formData.append('nameArticle',obj.nameArticle);
    formData.append('prix',obj.prix);
    formData.append('etat',obj.etat);
    formData.append('qty',obj.qty);
    formData.append('description',obj.description);
    formData.append('idUser',obj.idUser);
    formData.append('img',img);
return this.http.post<{message:string}>(this.publicationURL,formData);
  }
  // obj : nouvelles valeurs
  // Reponse:String message
  editPublicationById(obj:any) {
    return this.http.put<{message:string}>(this.publicationURL+"/editPublication",obj);
  }
  
  // Reponse: String Message
  deletePublication(id: any) {
    return this.http.delete<{message:string}>(`${this.publicationURL}/${id}`);
  }
  // Reponse: Tableau d'objets
  getAllPublications() {
    return this.http.get<{publications:any,message:string}>(this.publicationURL);
  }
  // Reponse: un Objet
  getPublicationByID(id: any) {
    return this.http.get<{publication:any}>(`${this.publicationURL}/${id}`);
  }
  // Reponse : My publication
  getMyPublicationByID(id:any){
    return this.http.get<{publication:any}>(`${this.publicationURL}/myPublication/${id}`);
  }
 
}
