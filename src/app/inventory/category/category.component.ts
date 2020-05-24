import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

const CATEGORY_DATA: Category[] = [
  {id: 1, name: 'Hilos', description: 'Esta es una descripción de prueba para el UI.'},
  {id: 2, name: 'Refacciones Maquinas', description: 'Esta es una descripción de prueba para el UI.'},
  {id: 3, name: 'Agujas', description: 'Esta es una descripción de prueba para el UI.'},
  {id: 4, name: 'Resortes', description: 'Esta es una descripción de prueba para el UI.'},
  {id: 5, name: 'Tornillos', description: 'Esta es una descripción de prueba para el UI.'},
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = [ 'id', 'name', 'description', 'action'];
  dataSource: MatTableDataSource <Category>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {

    this.dataSource = new MatTableDataSource(CATEGORY_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit(): void {


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if ( this.dataSource.paginator ) {
      this.dataSource.paginator.firstPage();
    }
  }

}
