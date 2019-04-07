import {combineReducers} from 'redux';
import graph from '../consts/variant_1';
import {ADD_TAB, MIN_EDGE_WEIGHT_HANDLE_CHANGE, SELECT_NODES} from "../actions";

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
               stepsVariantData: [...state.stepsVariantData, graph],
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

       default:
           return state
    }
}

const storeApp = combineReducers({Tasks});
export default storeApp;