import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { User } from 'src/app/user';
// import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:any;
    password:any;
    email:any;
    // user:any;
    // user:any;
   user: User[] | undefined;
    // user:any=new User("","","");
register:any=FormGroup;
id:any=4;
data:any;
message:any;
  constructor(private fb:FormBuilder,private router:Router, private commServ:CommonService) { }

  ngOnInit(): void {
    this.register= this.fb.group({
      name:['',Validators.required],
      password:['',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z ]*')])],
      email:['',Validators.compose([Validators.required,Validators.email])]
    })
  }
  registerSubmit(data:any){
    console.log(data);
    let dataToPass={
      name:data.name,
      password:data.password,
      email:data.email,
      id:this.id++
    }
    this.commServ.addUser(dataToPass).subscribe((data:any)=>{
      console.log(data);
      
    })
  }

  gotToLogin(){
    this.router.navigate(['login']);
  }

  public registerNow(){
    
    let resp=this.commServ.doRegistration();
    
    resp.subscribe((data)=>this.message=data);
  }
  private getUser(){
    this.commServ.getUserList().subscribe(data => {
      this.user=data;
    });
  }
}
