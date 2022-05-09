import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { compareCourses, Course } from "../model/course";
import { CourseActions } from "./action-types";

// Entity format reducer
// extends entityState
// Defines entities dictionary and ids array
// entities dictionary: dictionary of entry parameter
// ids array: defines the order of the entities
export interface CoursesState extends EntityState<Course>{
    // data loaded flag
    allCoursesLoaded: boolean
}

// Defines crud operations and other important methods to the entity state
export const adapter = createEntityAdapter<Course>({
    // sorts data based on function in model
    sortComparer: compareCourses
});

// set initial state
export const initialCourseState = adapter.getInitialState({
    allCoursesLoaded: false
});

// courses reducer
export const coursesReducer = createReducer(
    initialCourseState,
    on(CourseActions.allCoursesLoaded,
        // addAll params (New entries, current store state)
        (state, action) => adapter.addAll(action.courses, {...state, allCoursesLoaded: true})
    ),
    on(CourseActions.courseUpdated,
        (state, action) => adapter.updateOne(action.update, state)
    )
);

// define default entity course selectors
export const {
    selectAll
} = adapter.getSelectors();



