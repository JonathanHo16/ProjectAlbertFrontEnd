import {combineReducers} from "redux";

const emptyHomes = {homes: []};
const homes = (state = emptyHomes, action) => {
    switch (action.type) {
        case 'ADD_HOME':
            return {
                homes: homes.push(
                    {
                        homeID: action.data.homeID,
                        name: action.data.name,
                        address: action.data.address,
                        rent: action.data.rent,
                        latitude: action.data.latitude,
                        longitude: action.data.longitude,
                        numBed: action.data.numBed,
                        city: action.data.city
                        })
                    };
        case 'ADD_ALL_HOMES' :
        {
            return {homes :action.data.homes};
        }
        case 'DELETE_HOME' :
            return null; //TODO implement deletion reducer
        default :
            return state;
    }
};
const emptyWorks = {works: []};
const works = (state = emptyWorks, action) => {
    switch (action) {
        case 'ADD_WORK':
            return {
                works :
                works.push({
                    workID: action.workID,
                    name: action.name,
                    address: action.address,
                    latitude: action.latitude,
                    longitude: action.longitude,
                    city: action.city
                })}
            ;
        case 'DELETE_HOME' :
            return null; //TODO implement deletion reducer
        default :
            return state
    }
};
const initialUserState = { userID : "NOT_LOGGED_IN"};
const userID = (state = initialUserState, action ) => {
    switch (action) {
        case  "LOGGED_IN" : {
            return { userID : action.userID};

        }
        case "LOGGED_OUT" : {
            return {userID : "NOT_LOGGED_IN"}
        }
        default :
            return state
    }
};
export const rootReducer = combineReducers({homes, works, userID});
