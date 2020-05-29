import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators, NgForm, FormBuilder} from '@angular/forms';
import { Color } from '../models/color.model';
import { ColorService } from '../../services/color.service';
import Swal from 'sweetalert2';
import { ColorComponent } from '../../inventory/color/color.component';

@Component({
  selector: 'app-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.css']
})
export class ColorFormComponent implements OnInit {

  color: Color = {
    ColorID:  this.data.colorId,
    Name: this.data.colorName,
    CreatedDate: null,
    ModifiedDate: null,
    IsActivated: null
  };

  constructor(
    public dialogRef: MatDialogRef<ColorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private colorService: ColorService) {}


    updateColor( form: NgForm ) {

      if ( form.invalid ){ return; }

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere un momento...'
      });
      Swal.showLoading();
      this.colorService.updateColor( this.color )
        .subscribe( (resp: any) => {
          Swal.fire({
            allowOutsideClick: false,
            icon: 'success',
            title: `El color ${ resp.Name } fue guardado con exito.`,
            timer: 2000
          });
          this.dialogRef.close();
        }, (err) => {
          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: err.error.Message,
          });
        });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

}
