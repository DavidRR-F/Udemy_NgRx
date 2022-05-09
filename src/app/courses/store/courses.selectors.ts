import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./course.reducers";
import * as fromCourses from './course.reducers';

// feature selector
export const selectCoursesState = createFeatureSelector<CoursesState>("courses");

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourses.selectAll
);

export const selectBeginnerCourse = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'BEGINNER')
);

export const selectAdvancedCourse = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'ADVANCED')
);

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.promo).length
);

export const areCoursesLoaded = createSelector(
    selectCoursesState,
    state => state.allCoursesLoaded
);