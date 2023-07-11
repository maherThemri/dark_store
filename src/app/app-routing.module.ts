import { ViewProductComponent } from "./components/view-product/view-product.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { DisplayPublicationAdminComponent } from "./components/display-publication-admin/display-publication-admin.component";
import { EditPublicationComponent } from "./components/edit-publication/edit-publication.component";
import { PublicationInfoComponent } from "./components/publication-info/publication-info.component";
import { AddPublicationComponent } from "./components/add-publication/add-publication.component";
import { MyCommandComponent } from "./components/my-command/my-command.component";
import { MyPublicationComponent } from "./components/my-publication/my-publication.component";
import { AdminComponent } from "./components/admin/admin.component";
import { MySpaceComponent } from "./components/my-space/my-space.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "subscription", component: SignupComponent },
  { path: "signupAdmin", component: SignupComponent },
  { path: "products", component: ProductsComponent },
  { path: "mySpace", component: MySpaceComponent },
  { path: "admin", component: AdminComponent },
  { path: "myPublication", component: MyPublicationComponent },
  { path: "myCommand", component: MyCommandComponent },
  { path: "addPublication", component: AddPublicationComponent },
  { path: "publicationInfo/:id", component: PublicationInfoComponent },
  { path: "editPublication/:id", component: EditPublicationComponent },
  {
    path: "displayPublicationAdmin/:id",
    component: DisplayPublicationAdminComponent,
  },
  { path: "profile", component: ProfileComponent },
  { path: "viewProduct/:id", component: ViewProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
