import {combineReducers } from 'redux';
import {TEST_ACTION} from "../actions/index";

function Hello(state = {test:'Hello World, bitch'}, action) {
   switch(action.type) {
       case TEST_ACTION: let content = state.test === 'Successful'? 'Hello World':'Successful'; return {test:content};
       default: return state
    }
}

const storeApp = combineReducers({Hello});
export default storeApp;