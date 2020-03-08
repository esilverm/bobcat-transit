import fetch from 'cross-fetch';
import C from '../constants';
import key from '../../app.json';

export const setName = name => 
  ({
    type: C.SET_NAME,
    payload: name
  })

export const setArrivalTime = arrivalTime =>
({
  time: C.SET_ARRIVAL_TIME,
  payload: arrivalTime
})

export const setUserAddress = address => 
  ({
    type: C.SET_USER_ADDRESS ,
    payload: address
  })

export const addCourse = (courseName, courseTimes='', courseLocation='') => ({
  type: C.ADD_COURSE,
  payload: { courseName, courseTimes, courseLocation }
})

export const removeCourse = (courseId) => ({
    type: C.ADD_COURSE,
    payload: courseId
})

export const addFavoritePlace = (placeName) => ({
  type: C.ADD_FAVORITE_PLACE,
  payload: placeName
})

export const removeFavoritePlace = (placeName) => ({
  type: C.REMOVE_FAVORITE_PLACE,
  payload: placeName
})


export const addError = (errorMessage) => ({
    type: C.ADD_ERROR,
    payload: errorMessage
})

export const clearError = () => ({
    type: C.CLEAR_ERROR,
})

export const cancelFetch = () => ({
    type: C.CANCEL_FETCHING
})

export const fetchShuttleDirections = (origin, destination) => (dispatch) => {
  dispatch({
    type: C.FETCH_PASSIO_DIRECTIONS
  })

  // const data = JSON.stringify
}

export const fetchShuttle = async () => (dispatch) => {
  dispatch({
    type: C.FETCH_SHUTTLE
  })
  const data = JSON.stringify({"s0":"1007","sA":1,"rA":0});
  fetch('https://passio3.com/www/mapGetData.php?getBuses=1&deviceId=0', {
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    },
    method: "POST",
    body: data,
  }).then(res => res.json())
    .then(data => {
      return {
        type: C.CHANGE_SHUTTLE_LISTING,
        payload: data
      }
    })
    .catch(err => {
      dispatch({
        type: C.ADD_ERROR,
        payload: err,
      })
      dispatch({
        type: C.CANCEL_FETCHING
      })
    })
 }

 export const fetchCourse = async (year, semester, queryText) => (dispatch) => {
  dispatch({
    type: C.FETCH_COURSE
  })
  fetch(`schedge.torchnyu.com/${year}/${semester}/search?query${queryText.replace(' ', '+')}&limit=4`)
    .then(res => res.json())
    .then(json => {
      return json.map((course) => {
        return {
          courseId: course.deptCourseId,
          courseName: course.name,
          courseTimes: course.sections[0].meetings,
          courseLocation: course.location
        }
      })
    })
    .then(courseList => {
      return {
        type: C.CHANGE_COURSE_SUGGESTIONS,
        payload: courseList
      }
    })
    .catch(err => {
      dispatch({
        type: C.ADD_ERROR,
        payload: err,
      })
      dispatch({
        type: C.CANCEL_FETCHING
      })
    })
  
 }
//  export const fetchCarbonFootprint = (distance, transporation) =>  {
//   //  dispatch fetching action
//   fetch(`api.triptocarbon.xyz/v1/footprint?activity=${distance}/&activityType=miles&country=usa&mode=${transportation}`)
//   .then(res => res.json())
//   .then(json => ({
//     type: C.FETCH_CARBON_FOOTPRINT,
//     payload: carbonFootprint
//   }))
// }

export const fetchDistance = (origin, destination) =>  {
  //  dispatch fetching action
  fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${key.expo.ios.config.googleMapsApiKey}`)
  .then(res => res.json())
  .then(json => ({
    type: C.FETCH_GOOGLE_DISTANCE,
    payload: distance
  }))
}

