import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuProductsService } from 'src/app/menu-products.service';
//import { CoreService } from 'src/app/core.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-beveragedialog',
  templateUrl: './beveragedialog.component.html',
  styleUrls: ['./beveragedialog.component.css']
})
export class BeveragedialogComponent {
  bevmealForm: FormGroup;
  
  constructor(
    private _fb: FormBuilder,
    private _empService: MenuProductsService,
    private _dialogRef: MatDialogRef<BeveragedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
   // private _coreService: CoreService
  ) {
    this.bevmealForm = this._fb.group({
      id:'',
      itemUrl:'',
      itemName:'',
      itemValue:'',
      date:'',
      action:'',
    });
  }
  
    ngOnInit(): void {
      this.bevmealForm.patchValue(this.data);
    }
  
  
  /*
    Reactiveform = new FormGroup({
      staffname: new FormControl("", Validators.required),
      mobile: new FormControl("", Validators.required),
      department: new FormControl("", Validators.required),
      position: new FormControl("", Validators.required),
      staffimg: new FormControl("")
    });*/
  
    
    onFormSubmit() {
      if (this.bevmealForm.valid) {
        if (this.data) {
          this._empService.updateBeverage(this.data.id, this.bevmealForm.value).subscribe({
              next: (val: any) => {
                //this._coreService.openSnackBar('Employee details updated!');
                Swal.fire("Meal details updated successfully!", 'success');
                this._dialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err);
                //Swal.fire('Please Enter valid data)', 'error');
              },
            });
        } else {
          this._empService.addBeverage(this.bevmealForm.value).subscribe({
            next: (value: any) => {
              //this._coreService.openSnackBar('Employee added successfully');
              Swal.fire("Meal details added successfully!", 'success');
              this._dialogRef.close(true);
            },
            
            error: (err: any) => {
              console.error(err);
            // Swal.fire('Please Enter valid data)', 'error');
            },
          });
        }
      }
    }
}
