import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
@ViewChild('myForm') myForm:NgForm;
defEmail: string="sherif_hfm@yahoo.com";
fullname: string;
  constructor() { }

  ngOnInit() {
  }
onSubmit(myForm: NgForm)
{
console.log(myForm);
console.log(this.myForm);
}

emailOnChange()
{
  console.log("emailOnChange");
}
addData()
{
  console.log('addDate');
  //this.myForm.setValue({basicData:{fullName:'sherif',email:'sherif_hfm@yahoo.com'},isActive:true,gender:'Male',options:'1'});
  this.myForm.form.patchValue({basicData:{fullName:'sherif'}});
  
}

objectTojson(obj)
{
  return JSON.stringify(obj);
}

}
