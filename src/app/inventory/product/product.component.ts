import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductDetailComponent } from '../../shared/product-detail/product-detail.component'

const PRODUCT_DATA: Product[] = [
  {id: 1, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 2, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 3, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 4, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 5, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 6, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 50, color: 'rojo'},
  {id: 7, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 8, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 9, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 10, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 11, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 12, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 13, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 14, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 15, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 16, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 17, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 18, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 19, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
  {id: 20, code: 'HI001', name: 'Hilo recta', description: 'Esta descripción es solo de ejemplo para poder mostrar como se ve la tabla.', stock: 109, color: 'rojo'},
];



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = [ 'id', 'code', 'name', 'stock', 'color', 'action'];
  dataSource: MatTableDataSource <Product>;

  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( public dialog: MatDialog) {

    this.dataSource = new MatTableDataSource (PRODUCT_DATA);

   }

   viewProductDetail(): void{
    const dialogRef = this.dialog.open(ProductDetailComponent,{
      width: '400px',
      data: { name: 'hola'}
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



