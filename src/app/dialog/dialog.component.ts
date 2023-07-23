import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList =["Level1","Level2","Level3"];
  productForm !: FormGroup;


  constructor(private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
       productName:['',Validators.required],
       category:['',Validators.required],
       date:['',Validators.required],
       freshness:['',Validators.required],
       price:['',Validators.required],
       comments:['',Validators.required],
    });
  }

  addProduct(){
    console.log(this.productForm.value);
  }

}
