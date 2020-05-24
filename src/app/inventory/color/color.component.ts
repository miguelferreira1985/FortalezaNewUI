import { Component, OnInit, ViewChild } from '@angular/core';
import { Color } from '../../shared/models/color.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ColorFormComponent } from '../../shared/color-form/color-form.component';

const COLOR_DATA: Color[] = [
  {id: 1, name: 'Rojo'},
  {id: 2, name: 'Verde'},
  {id: 3, name: 'Lila'},
  {id: 4, name: 'Morado'},
  {id: 5, name: 'Dorado'},
  {id: 6, name: 'Amarillo'},
  {id: 7, name: 'Azul'},
  {id: 8, name: 'Vino'},
  {id: 9, name: 'Carmin'},
  {id: 10, name: 'Purpura'},
];

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  id: number;

  displayedColumns: string[] = [ 'id', 'name', 'action'];
  dataSource: MatTableDataSource <Color>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private dialog: MatDialog) {

    this.dataSource = new MatTableDataSource(COLOR_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  addColor(): void{
    const dialogRef = this.dialog.open(ColorFormComponent,{
      width: '480px',
      data: { action: 'Agregar', title: 'Color', button: 'Guardar'}
    });
  }

  editColor(): void{
    const dialogRef = this.dialog.open(ColorFormComponent, {
      width: '480px',
      data: { action: 'Editar', title: 'Color', button: 'Editar', id: this.id}
    });

    console.log( this.id);
  }

  ngOnInit(): void {

  }

  applyFilter( event: Event ) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if ( this.dataSource.paginator ) {
      this.dataSource.paginator.firstPage();
    }
  }

}
