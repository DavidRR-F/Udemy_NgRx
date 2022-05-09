import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, map, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { CourseEntityService } from "./services/course-entity.service";
import { loadAllCourses } from "./store/course.actions";
import { areCoursesLoaded } from "./store/courses.selectors";

// Loading Entity Data using a Resolver
// Responsible for requesting entity data from the backend


// Router Resolver
// Target screen is only shown if the data is available
// cancels router navigation if backend fetch fails
@Injectable()
// Revlove has param any for normal entity
export class CoursesResolver implements Resolve<boolean> { // takes parametric type of the fetched data from store

    // loading = false;

    constructor(
        private store: Store<AppState>,
        private coursesService: CourseEntityService
        ){}
    //Observable param is any for normal entity 
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        /*
        return this.store
        .pipe(
            // side effects
            select(areCoursesLoaded),
            tap((coursesLoaded) => {
                    if(!this.loading && !coursesLoaded){ // make sure action is only dispatched once if theres no data in the store
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }
            ),
            filter(coursesLoaded => coursesLoaded), // bool for only emits value if courses are not already loaded
            first(), // wait for observable to emit one value then complete
            finalize(() => this.loading = false) // side effect after completion
        ); */

//////////////////////////////////////////// With NGRX DATA ///////////////////////////////////////////
        // return loaded flag whenever the data has been loaded
        return this.coursesService.loaded$
        .pipe(
            //side effect load data
            tap(loaded => {
                if(!loaded) {
                    this.coursesService.getAll();
                }
            }),
            filter(loaded => !!loaded), // wait for data to be loaded
            first() // completing observable
        );

    }
}