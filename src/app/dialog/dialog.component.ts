import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import{MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList =["Level1","Level2","Level3"];
  actionBtn : string ="Save";
  productForm !: FormGroup;


  constructor(private formBuilder:FormBuilder ,
             private api :ApiService,
             @Inject(MAT_DIALOG_DATA) public editData :any,
             private dialogRef:MatDialogRef<DialogComponent>){}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
       productName:['',Validators.required],
       category:['',Validators.required],
       date:['',Validators.required],
       freshness:['',Validators.required],
       price:['',Validators.required],
       comments:['',Validators.required],
    });
    console.log(this.editData);

    if(this.editData)
    {
      this.actionBtn ="Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comments'].setValue(this.editData.comments);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid)
      {
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("Product added successfully");
            this.productForm.reset;
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Product not added");
          }
        
        })
        
      }
    }else
    {
      this.updateProduct();
    }
    
  }
  updateProduct()
  {
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{alert("Product updated successfully!");
       this.productForm.reset();
       this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the records!");
      }
    })
  }

}
