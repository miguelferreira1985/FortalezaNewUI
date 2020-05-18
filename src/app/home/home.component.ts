import { Component, OnInit } from '@angular/core';

export interface Product {
  name: string;
  stock: number;
}

const ELEMENT_DATA: Product[] = [
  {name: 'Hydrogen', stock: 1.0079},
  {name: 'Helium', stock: 4.0026},
  {name: 'Lithium', stock: 6.941},
  {name: 'Beryllium', stock: 9.0122},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'stock'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {


  }

}
