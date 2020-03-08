import {combineReducers} from "redux";

let state = {
    userID: "NOT_LOGGED_IN",
    homes: [null],
    works: [null],
};
const homes = (state = state, action) => {
    switch (action.type) {
        case 'ADD_HOME':
            return { ...state,
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
            console.log("hi from reducer");
            console.log(action.data);
            return {...state, homes : action.data};
        }
        case 'DELETE_HOME' :
            return state; //TODO implement deletion reducer
        default :
            return state;
    }
};

const works = (state= state , action) => {
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
const userID = (state= state, action ) => {
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
