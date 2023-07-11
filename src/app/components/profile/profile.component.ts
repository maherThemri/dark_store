import { FormGroup } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
id:any;
user:any={};
// myFile:any;
// imagePreview:any;
profileForm:FormGroup;
  constructor(private userService:UserService) { }

  ngOnInit() {
this.id=localStorage.getItem("connectedUser");
    this.userService.getUserById(this.id).subscribe((data)=>{
      this.user=data.user;
    });
  }
  goToEdit(id: any) {
    
    this.userService.getUserById(id).subscribe((data) => {

     this.user=data.user;
    });
  }
  editProfile(){
    
this.userService.editUser(this.user).subscribe((data)=>{
  console.log("here data message edit",data.message);
  
});

  }
  // onImageSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   // this.publicationForm.patchValue({ img: file });
  //   // this.publicationForm.updateValueAndValidity();
  //   this.myFile = file;
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

}
