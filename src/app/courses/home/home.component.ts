import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {compareCourses, Course} from '../model/course';
import {Observable} from "rxjs";
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {map, shareReplay} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { selectAdvancedCourse, selectBeginnerCourse, selectPromoTotal } from '../store/courses.selectors';
import { CourseEntityService } from '../services/course-entity.service';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    // Only noticable in cases were there is a lot of data
    // needed to be displayed that optimizes UI interaction
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;


    constructor(
      private dialog: MatDialog,
      private store: Store<AppState>,
      private courseService: CourseEntityService
      ) {

    }

    ngOnInit() {
      this.reload();
    }

  reload() {
    // get data from store entity
    // this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourse));
    // this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourse));
    // this.promoTotal$ = this.store.pipe(select(selectPromoTotal));

    // with ngrx data
    // emits values when new entities are emitted to tore
    // this.courseService.entities$
    this.beginnerCourses$ = this.courseService.entities$
    .pipe(
      map(courses => courses.filter(course => course.category == 'BEGINNER'))
    );

    this.advancedCourses$ = this.courseService.entities$
    .pipe(
      map(courses => courses.filter(course => course.category == 'ADVANCED'))
    );

    this.promoTotal$ = this.courseService.entities$
    .pipe(
      map(courses => courses.filter(course => course.promo).length)
    );

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
