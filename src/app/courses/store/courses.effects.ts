import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { CoursesHttpService } from "../services/courses-http.service";
import { CourseActions } from "./action-types";
import { allCoursesLoaded } from "./course.actions";

@Injectable()
export class CoursesEffects {

    loadCourses$ = createEffect(
        () => this.actions$.pipe(
            ofType(CourseActions.loadAllCourses),
            concatMap(action => this.coursesHttpService.findAllCourses()), // concatMap one request at a time to backend
            map(courses => allCoursesLoaded({courses})) // dispatch is true
        )
    );

    saveCourse$ = createEffect(
        () => this.actions$.pipe(
            ofType(CourseActions.courseUpdated),
            concatMap(action => this.coursesHttpService.saveCourse(
                action.update.id,
                action.update.changes
            ))
        ), {dispatch: false}
    );

    constructor(
        private actions$: Actions,
        private coursesHttpService: CoursesHttpService
    ){}
}