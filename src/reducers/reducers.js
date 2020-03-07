import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import '../actions/actions';
import C from '../constants';

const initialState = {
  onboarding: {
    name: '',
    userAddress: '',
    allCourses: [],
    courseList: {
      fetching: false,
      courseSuggestions: [],
    }
  },
};

const name = (state=initialState.onboarding.name, action) => 
  (action.type === C.SET_NAME) ?
    action.payload : state;

const userAddress = (state=initialState.onboarding.userAddress, action) =>
  (action.type === C.SET_USER_ADDRESS) ?
    action.payload : state;

const course = (state=null, action) =>
  (action.type === C.ADD_COURSE) ?
    action.payload : state;

const allCourses = (state=initialState.onboarding.allCourses, action) => {
  switch(action.type) {
    case C.ADD_COURSE:
      const hasCourse = state.some(course => course.courseId = action.payload.courseId);
      return hasCourse ?
        state :
        [
          ...state,
          course(null, action)
        ]

    case C.REMOVE_COURSE:
      return state.filter(course => course.courseId !== action.payload)

    default:
      return state
  }
}

const fetching = (state=initialState.onboarding.courseList.fetching, action) => {
  switch(action.type) {
    case C.FETCH_COURSE:
    case C.FETCH_SHUTTLE:
    case C.FETCH_GOOGLE_DIRECTIONS:
    case C.FETCH_PASSIO_DIRECTIONS:
      return true;
    case C.CANCEL_FETCHING:
    case C.CHANGE_COURSE_SUGGESTIONS:
    case C.CHANGE_SHUTTLE_LISTING:
    case C.LOAD_GOOGLE_DIRECTIONS:
    case C.LOAD_GOOGLE_DIRECTIONS:
      return false;
    default:
      return state;
  }
}

const courseSuggestions = (state=initialState.onboarding.allCourses, action) => {
  switch(action.type) {
    case C.FETCH_COURSE:
        return [];
    case C.CHANGE_COURSE_SUGGESTIONS:
        return action.payload;
    default:
      return state;
    }
}

export default combineReducers({
  onboardingReducer: combineReducers({
    name,
    userAddress,
    allCourses,
    courseList: combineReducers({
      fetching,
      courseSuggestions
    })
  }),
})