import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MenuProductsService } from 'src/app/menu-products.service';


@Component({
  selector: 'app-stepperorderdialog.',
  templateUrl: './stepperorderdialog.component.html',
  styleUrls: ['./stepperorderdialog.component.css']
})
export class StepperorderdialogComponent implements OnInit{
  displayedColumns = [
    'beveragename',
    'beverageprice',
    'iconfield',
  ]

  displayedColumns1 = [
    'singlemealname',
    'singlemealprice',
    'iconfield2',
  ]
  displayedColumns2 = [
    'comboname',
    'value',
    'iconfield3',
  ]

  dataSource!: MatTableDataSource<any>;
  

//////
  firstFormGroup = this._formBuilder.group({
    beveragename: ['', Validators.required],
    beverageprice: ['', Validators.required],
    iconfield: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    singlemealname: ['', Validators.required],
    beverageprice: ['', Validators.required],
    iconfield2: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    comboname: ['', Validators.required],
    value: ['', Validators.required],
    iconfield3: ['', Validators.required],
    
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder,
              private _empService: MenuProductsService
              ) {}

  quantity:number=0;
  i=0;
  plus(){
    if(this.i !=5){
      this.i++;
      this.quantity=this.i;
    }
  }

  minus(){
    if(this.i !=0){
      this.i--;
      this.quantity=this.i;
    }
  }


  /////
  ngOnInit(): void {
    this.getBeverageList();
    this.getSinglemealList();
    //this.getcomboList();
    
  }
  getBeverageList() {
    this._empService.getBeverageList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }
  /////
  getSinglemealList() {
    this._empService.getSinglemealList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }
/*
  getcomboList() {
    this._empService.getcomboList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }*/

}
