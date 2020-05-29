import { Component, OnInit, ViewChild } from '@angular/core';
import { Presentation } from '../../shared/models/presentation.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PresentationService } from '../../services/pesentation.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  presentations: Presentation[];

  displayedColumns: string[] = [ 'PresentationID', 'Name', 'Abbrevation', 'Descripton', 'ModifiedDate', 'Action'];
  dataSource: MatTableDataSource <Presentation>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private presentationService: PresentationService ) {

    this.getActivePresentations();

  }

  getActivePresentations(){
    this.presentationService.getActivePresentation()
    .subscribe((data: Presentation[]) => {
      this.presentations = data;
      this.dataSource = new MatTableDataSource(this.presentations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
