import axios from 'axios';

import C from '../constants';


export const addCourse = (courseName, courseTime, courseLocation) => ({
  type: C.ADD_COURSE,
  payload: courseName
})
export const removeCourse = (courseName) => ({
    type: C.ADD_COURSE,
    payload: courseName
})

export const addError = (errorMessage) => ({
    type: C.ADD_ERROR,
    payload: errorMessage
})

export const clearError = () => ({
    type: C.CLEAR_ERROR,
})

export const addAlert = (alertMessage) => ({
    type: C.ADD_ALERT,
    payload: alertMessage
})

export const clearAlert = (alertMessage) => ({
    type: C.CLEAR_ALERT,
    payload: alertMessage
})

export const cancelFetch = () => ({
    type: C.CANCEL_FETCHING
})

export const fetchCourse = (value) => (dispatch) => {
  dispatch({
    type: C.FETCH_COURSE
  })
}

  // fetch course data and dispatch suggestions


export const fetchCitiBikeStations = () => (dispatch) => {
  dispatch({
    type: C.FETCH_CITIBIKE_STATION
  })
    
  const url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json';

  fetch(url)
    .then(response => {
      return {
        type: C.CHANGE_CITIBIKE_STATIONS,
        payload: response.json()
      }
    }).catch(err => {
      dispatch(addError(err));

      dispatch({
        type: C.CANCEL_FETCHING
      })
    })
}

 // fetch citi bike station and dispatch suggestions
 export const fetchShuttle = async (...shuttleIds) => (dispatch) => {
   dispatch({
     type: C.FETCH_SHUTTLE
   })
  
  const https = require('https');

  const data = JSON.stringify({"s0":"1007","sA":1,"rA":0});
  const options = {
    hostname: 'passio3.com',
    port: 443,
    path: '/www/mapGetData.php?getBuses=1&deviceId=0',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    let body = '';
    res.on('data', d => {
      body += d;
    });

    res.on('end', () => {
      let data = JSON.parse(body);
      return {
        type: C.CHANGE_SHUTTLE_LISTING,
        payload: data
      }
    })
  })
  req.on('error', error => {
    dispatch(addError(err));
  })
  req.write(data);
  req.end();
 }

       