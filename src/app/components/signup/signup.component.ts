import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { MustMatch } from 'src/app/confirmPwd';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  // Form Id
  signupForm: FormGroup;
  numberRegEx = /^[+0]{0,2}(91)?[0-9]{8}$/;
  path:string;
  imagePreview:string;
  constructor(private formBuilder: FormBuilder,
    private userService:UserService,
    private router:Router) {}

  ngOnInit() {
    this.path=this.router.url;    
    this.signupForm = this.formBuilder.group({
      firstName: ["",[Validators.required, Validators.minLength(3)]],
      lastName: ["",[Validators.required, Validators.minLength(5)]],
      email: ["",[Validators.email,Validators.required]],
      phoneNumber: ["",[Validators.required, Validators.pattern(this.numberRegEx)]],
      pwd: ["",[Validators.minLength(6), Validators.maxLength(12),Validators.required]],
      confirmPwd:[''],
      address: ["",[Validators.required, Validators.minLength(3)]],
      img:[''],
    },{
      validators:MustMatch('pwd','confirmPwd')
    });
  }
  // Method will be executed when btn is clicked
  signup() {
    if (this.path=="/subscription") {
      this.signupForm.value.role='client';
    }else{
      this.signupForm.value.role='admin';
    }
    console.log("here user object", this.signupForm.value);
    this.userService.signup(this.signupForm.value, this.signupForm.value.img).subscribe(
      (data)=>{
        console.log("here data after signup ", data.message);
        this.router.navigate(['login']);
      }
    );
  }

  onImageSelected(event: Event) {
    console.log("here event in to signup",event);
    
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }
}
