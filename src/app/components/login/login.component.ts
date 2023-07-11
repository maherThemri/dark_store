import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg:string;
  login:any={};
  constructor(private formBuilder: FormBuilder,
    private userService:UserService,
    private router:Router) { }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      email: ["",[Validators.email,Validators.required]],
      pwd: ["",[Validators.minLength(6), Validators.maxLength(12),Validators.required]]
    });
  }
   // Method will be executed when btn is clicked
   loginUser() {
//     console.log("here user object", this.loginForm.value);
//     this.userService.login(this.loginForm.value).subscribe((data)=>{
//       console.log("here data after login",data);
//       localStorage.setItem('connectedUser',data.user.id);
//       if (data.message=="2") {
//         if (data.user.role=="client") {
//           this.router.navigate([""]);
//         } else {
//           this.router.navigate(['admin']);
//         }
        
//       }else{
// this.errorMsg="please check Email/Pwd";
//       }
      
//     });


this.userService.signIn(this.loginForm.value.email, this.loginForm.value.pwd);

  }

}
