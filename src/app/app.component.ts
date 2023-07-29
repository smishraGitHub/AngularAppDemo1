import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularAppDemo1';
  displayedColumns: string[] = ['productName', 'category', 'freshness', 'date','price','comments','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog,private api:ApiService) {}
  ngOnInit(): void{
     this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width : '30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllProducts();
      }
    })
  }

  getAllProducts(){
      this.api.getProduct()
       .subscribe({
        next:(res)=>{ 
          this.dataSource =new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
         },
        error:(err)=>{ console.log(err) }
      })
    }
    editButtonClick(row :any){
      this.dialog.open(DialogComponent,{
        width:'30%',
        data:row
      }).afterClosed().subscribe(val=>{
        if(val==='update'){ this.getAllProducts();}
       
      })
    }
    deleteButtonClick(id:number)
    {
       this.api.deleteProduct(id).subscribe({
        next:(res)=>{alert("Product deleted successfully");
         this.getAllProducts();
      },
        error:()=>{alert("Error while deleting the product!");}
       })
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}

