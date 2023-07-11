import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { BannerComponent } from "./components/banner/banner.component";
import { BoxComponent } from "./components/box/box.component";
import { ProductsComponent } from "./components/products/products.component";
import { FashionComponent } from "./components/fashion/fashion.component";
import { NewsComponent } from "./components/news/news.component";
import { NewsLetterComponent } from "./components/news-letter/news-letter.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ArticlesComponent } from "./components/articles/articles.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { HomeComponent } from "./components/home/home.component";
import { MySpaceComponent } from "./components/my-space/my-space.component";
import { AdminComponent } from "./components/admin/admin.component";
import { ProductComponent } from "./components/product/product.component";
import { MyPublicationComponent } from "./components/my-publication/my-publication.component";
import { MyCommandComponent } from "./components/my-command/my-command.component";
import { AddPublicationComponent } from "./components/add-publication/add-publication.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersTableComponent } from "./components/users-table/users-table.component";
import { PublicationTableComponent } from "./components/publication-table/publication-table.component";
import { PublicationInfoComponent } from "./components/publication-info/publication-info.component";
import { MyPublicationTableComponent } from "./components/my-publication-table/my-publication-table.component";
import { EditPublicationComponent } from "./components/edit-publication/edit-publication.component";
import { HttpClientModule } from "@angular/common/http";
import { RemoveExtraSpacesPipe } from "./pipes/remove-extra-spaces.pipe";
import { DisplayPublicationAdminComponent } from "./components/display-publication-admin/display-publication-admin.component";
import { MyCommandTableComponent } from "./components/my-command-table/my-command-table.component";
import { MyPublicationCommanderTableComponent } from "./components/my-publication-commander-table/my-publication-commander-table.component";
import { MyFilterPipe } from "./pipes/my-filter.pipe";
import { JwPaginationModule } from "jw-angular-pagination";
import { ProfileComponent } from "./components/profile/profile.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ViewProductComponent } from "./components/view-product/view-product.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    BoxComponent,
    ProductsComponent,
    FashionComponent,
    NewsComponent,
    NewsLetterComponent,
    FooterComponent,
    ArticlesComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    MySpaceComponent,
    AdminComponent,
    ProductComponent,
    MyPublicationComponent,
    MyCommandComponent,
    AddPublicationComponent,
    UsersTableComponent,
    PublicationTableComponent,
    PublicationInfoComponent,
    MyPublicationTableComponent,
    EditPublicationComponent,
    RemoveExtraSpacesPipe,
    DisplayPublicationAdminComponent,
    MyCommandTableComponent,
    MyPublicationCommanderTableComponent,
    MyFilterPipe,
    ProfileComponent,
    EditProfileComponent,
    ViewProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwPaginationModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
