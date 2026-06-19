import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { CommonService } from 'src/app/service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials={
    userName:'',
    passWord:''
  }
  users:any=[];
  // credentials: any;
  constructor(private fb: FormBuilder, private router:Router, private loginService:LoginService) { }

  ngOnInit(): void {
    // this.login=this.fb.group({
    //   email:['',Validators.compose([Validators.required,Validators.email])],
    //   password:['',Validators.required]
    // })    
    // this.commserv.getUser().subscribe((data:any)=>{
    //   this.users=data;
      
    // })
  }
// loginSubmit(data:any){
//   if(data.email){
//     this.users.forEach((item:any)=>{
//       if(item.email === data.email && item.password === data.password){
//         localStorage.setItem("isLoggedIn","true");
//         this.router.navigate(['home']);
//         }
//         else{
//           localStorage.clear();
//         }
//     });
//   }
// }
gotToSignup(){
  this.router.navigate(['register']);
}
onSubmit(){
  console.log("form is submit");
  if((this.credentials.userName!=''&& this.credentials.passWord!='') && (this.credentials.userName!=null && this.credentials.passWord!=null)){
    console.log("we submit the form");
      this.loginService.generateToken(this.credentials).subscribe(
        (response:any)=>{
          console.log(response.token);
          this.loginService.loginUser(response.token)
          window.location.href="/home";
        },
        error=>{
          console.log("error");
        }
      )
    //token generator
  }
  else{
    console.log("please fill")
  }
}

}
