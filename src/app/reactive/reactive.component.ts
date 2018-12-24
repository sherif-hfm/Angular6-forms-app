import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators, FormArray, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { promise } from 'protractor';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  myForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.myForm=new FormGroup({
      'basicData':new FormGroup({
        'fullName':new FormControl(null,[Validators.required,this.invalidName]),
        'email':new FormControl(null,[Validators.required,Validators.email],[this.emailExist2]),
      }),
      'isActive':new FormControl(null),
      'gender':new FormControl('male'),
      'options':new FormControl(null),
      'hobbies':new FormArray([])
    });
    this.myForm.valueChanges.subscribe((value)=>{
        console.log(value);
    });

    this.myForm.statusChanges.subscribe((status)=>{
      console.log(status);
  });

  }

 onSubmit()
{
console.log(this.myForm);

}

addData()
{
  this.myForm.get('basicData.fullName').setValue('Sherif Mohamed');
  this.myForm.get('basicData.email').setValue('sherif_hfm@yahoo.com');
}
addHobby()
{
  let control=new FormControl(null,Validators.required);
  (<FormArray>this.myForm.get('hobbies')).push(control);
}

invalidName(control: FormControl):ValidationErrors|null 
{
  if( control.value && control.value != 'Sherif Mohamed' )
  {
    return {'invalidName':true}
  }
  return null;
}

emailExist1(control: FormControl):Observable<any> | Promise<any>
{
  let promise=new Promise<any>((res,rej)=>{
      setTimeout(()=>{
        if( control.value && control.value == 'sherif_hfm@yahoo.com' )
        {
          res({'emailExist':true});
        }
        else{
          res(null);  
        }
      },2000);
  });
  return promise;
}
emailExist2(control: FormControl):Observable<any> | Promise<any>
{
  let myobs=Observable.create((observer: Observer<any>)=>{
    setTimeout(()=>{
      if( control.value && control.value == 'sherif_hfm@yahoo.com' )
      {
        observer.next({'emailExist':true});
        observer.complete();
      }
      else{
        observer.next(null);
        observer.complete();  
      }
    },2000);
  })
  return myobs;
}
}
