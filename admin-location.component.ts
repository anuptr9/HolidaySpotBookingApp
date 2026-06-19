import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationModel } from './adminlocation.model';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-admin-location',
  templateUrl: './admin-location.component.html',
  styleUrls: ['./admin-location.component.css']
})
export class AdminLocationComponent implements OnInit {
  location:any=[];
  formValue: any;
  showAdd!: boolean;
  locationModelObj : LocationModel = new LocationModel();
  locationData:any;
  
  showUpdate!: boolean;
  updateLocation: any;
  postLocation: any;
  userData: any;


  constructor(private formbuilder: FormBuilder,
    private api : LocationService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      location : ['']
    })
      this.getAllLocation();
  }
  clickAddLocation(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postLocationDetails() {
    this.locationModelObj.addlocation = this.formValue.value.location;

    this.api.postLocation(this.locationModelObj) //for posting data
    .subscribe(res=>{
        console.log(res);
        alert("Location Added Successfully")
        let ref=document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllLocation();
      },
    err=>{
      alert("Something Went Wrong");
    })
  }
    
  getAllLocation(){
    this.api.getLocation()
    .subscribe(res=>{
      this.userData=res;
    })
  }
  deleteLocation(row : any){
    this.api.deleteLocation(row.id)
    .subscribe(res=>{
      alert("Location Deleted");
      this.getAllLocation();
    })
  }
  onEdit(row: any){
    this.showAdd=false;
    this.showUpdate=true;
    this.locationModelObj.id=row.id;
    this.formValue.controls['location'].setValue(row.location);
    
  }
  updateLocationDetails(){
    this.locationModelObj.locationName = this.formValue.value.locationName;
   
    this.api.updateLocation(this.locationModelObj, this.locationModelObj.id)
    .subscribe(res=>{
      alert("Updated successfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllLocation();
    })
  }
  
}
