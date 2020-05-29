import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Color } from '../../shared/models/color.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';
import {MatDialog } from '@angular/material/dialog';
import { ColorFormComponent } from '../../shared/color-form/color-form.component';
import { ColorService } from '../../services/color.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  color: Color[];

  displayedColumns: string[] = [ 'ColorID', 'Name', 'ModifiedDate', 'Actions'];
  dataSource: MatTableDataSource<Color>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private dialog: MatDialog,
               private colorService: ColorService,
               private changeDetectorRefs: ChangeDetectorRef ) {
    this.getActiveColors();
  }

  getActiveColors() {
    this.colorService.getActiveColor()
    .subscribe((data: Color[]) => {
      this.color = data;
      this.dataSource = new MatTableDataSource(this.color);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  refreshOnTab($event) {
    this.getActiveColors();
  }

  addColor(): void{
    const dialogRef = this.dialog.open(ColorFormComponent, {
      width: '480px',
      data: { action: 'Agregar', title: 'Color', button: 'Guardar'}
    }).afterClosed().subscribe(result => {
      this.refresh();
    });
  }

  editColor(id: number, name: string) {
    const dialogRef = this.dialog.open(ColorFormComponent, {
      width: '480px',
      data: {
        action: 'Editar',
        title: 'Color',
        button: 'Editar',
        colorId: id,
        colorName: name }
    });
  }

  deleteColor( id: number, name: string ) {
    console.log(name);
    Swal.fire({
      title: `¿Seguro que desea borrar el color ${ name }?`,
      text: '!Esta acción no se puede deshacer!',
      icon:  'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo borrarlo'
    }).then((result) => {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere un momento...'
      });
      Swal.showLoading();
      if ( result.value ) {
        this.colorService.deleteColor(id).subscribe( (resp: any) => {
          Swal.fire(
            '!Borrado¡',
            `El color ${ name } fue borrado con exito`,
            'success'
          );
        }, (err) => {
          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: err.error.Message,
          });
        });
      }
    });
  }

  // this is not working yet, I am trying to refresh the table after add some data
  refresh() {
    console.log("refresh");
    this.colorService.getActiveColor()
    .subscribe((data: Color[]) => {
      this.color = data;
      this.dataSource = new MatTableDataSource(this.color);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.changeDetectorRefs.detectChanges();
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
