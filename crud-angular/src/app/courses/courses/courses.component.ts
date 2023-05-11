import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { CoursesService } from '../services/courses.service';
import { Course } from './../model/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns = ['_id', 'name', 'category', 'actions'];

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos')
        return of([]);
      })
    );
  }

  ngOnInit(): void {

  }

  onAdd() {
    this.router.navigate(['new'])
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
