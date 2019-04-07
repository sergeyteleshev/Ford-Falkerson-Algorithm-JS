import {combineReducers} from 'redux';
import graph from '../consts/variant_2';
import {ADD_TAB, CHANGE_STEP, MIN_EDGE_WEIGHT_HANDLE_CHANGE, SELECT_NODES} from "../actions";

let fordFalkersonInitialState = {
    stepsVariantData: [graph],
    selectedNodesVariantData: [[]],
    selectedEdgesVariantData: [[]],
    currentStep: 0,
    currentMinWeight: 0,
};

function Tasks(state = fordFalkersonInitialState, action) {
   switch(action.type) {
       case ADD_TAB:
           return {
               ...state,
               currentStep: state.currentStep + 1,
               stepsVariantData: [...state.stepsVariantData, action.payload],
               selectedNodesVariantData: [...state.selectedNodesVariantData, []],
           };

       case MIN_EDGE_WEIGHT_HANDLE_CHANGE:
           return {
               ...state,
               currentMinWeight: action.payload,
           };

       case SELECT_NODES:
           let selectedNodes = [...state.selectedNodesVariantData];
           selectedNodes[state.currentStep] = action.payload;
           return {
               ...state,
               selectedNodesVariantData: selectedNodes
           };

       case CHANGE_STEP:
           return {
               ...state,
               currentStep: action.payload,
           };

       default:
           return state
    }
}

const storeApp = combineReducers({Tasks});
export default storeApp;