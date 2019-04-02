import {combineReducers} from 'redux';

let fordFalkersonInitialState = {
    isCompiledCodeDialogOpened: false,
};

function Tasks(state = fordFalkersonInitialState, action) {
   switch(action.type) {

       default:
           return state
    }
}

const storeApp = combineReducers({Tasks});
export default storeApp;