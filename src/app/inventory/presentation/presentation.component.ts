import { Component, OnInit, ViewChild } from '@angular/core';
import { Presentation } from '../../shared/models/presentation.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

const PRESENTATION_DATA: Presentation[] = [
  {id: 1, name: "Pieza", abbreviation: "pza", description: "Esta es una descripción de prueba para el UI."},
  {id: 2, name: "Caja", abbreviation: "cja", description: "Esta es una descripción de prueba para el UI."},
  {id: 3, name: "Litro", abbreviation: "lt", description: "Esta es una descripción de prueba para el UI."},
  {id: 4, name: "Metro", abbreviation: "mt", description: "Esta es una descripción de prueba para el UI."},
  {id: 5, name: "Bolsa", abbreviation: "bls", description: "Esta es una descripción de prueba para el UI."},
];

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  displayedColumns: string[] = [ 'id', 'name', 'abbreviation', 'description', 'action'];
  dataSource: MatTableDataSource <Presentation>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { 

    this.dataSource = new MatTableDataSource(PRESENTATION_DATA);
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
