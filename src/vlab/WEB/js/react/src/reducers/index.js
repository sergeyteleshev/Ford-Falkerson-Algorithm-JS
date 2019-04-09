import {combineReducers} from 'redux';
import graph from '../consts/variant_2';
import {ADD_TAB, CHANGE_STEP, DELETE_LAST_TAB, MIN_EDGE_WEIGHT_HANDLE_CHANGE, SELECT_NODES} from "../actions";

let fordFalkersonInitialState = {
    stepsVariantData: [{...graph}],
    selectedNodesVariantData: [[]],
    selectedEdgesVariantData: [[]],
    currentStep: 0,
    currentMinWeight: 0,
};

function Tasks(state = fordFalkersonInitialState, action) {
   switch(action.type) {
       case ADD_TAB:
           let addTabData = JSON.parse(JSON.stringify(state.stepsVariantData[state.currentStep]))   ;
           for (let i = 0; i < state.selectedNodesVariantData[state.currentStep].length - 1; i++)
           {
               addTabData.edges[state.selectedNodesVariantData[state.currentStep][i]][state.selectedNodesVariantData[state.currentStep][i+1]] -= +state.currentMinWeight;
               addTabData.edgesBack[state.selectedNodesVariantData[state.currentStep][i]][state.selectedNodesVariantData[state.currentStep][i+1]] += +state.currentMinWeight;
           }

           return {
               ...state,
               currentStep: state.currentStep + 1,
               stepsVariantData: [...state.stepsVariantData, addTabData],
               selectedNodesVariantData: [...state.selectedNodesVariantData, []],
               currentMinWeight: 0,
           };

       case DELETE_LAST_TAB:
           let newStepsVariantData = [...state.stepsVariantData];
           let newSelectedNodesVariantData = [...state.selectedNodesVariantData];
           newStepsVariantData.pop();
           newSelectedNodesVariantData.pop();
           return {
               ...state,
               currentStep: state.currentStep - 1,
               stepsVariantData: newStepsVariantData,
               selectedNodesVariantData: newSelectedNodesVariantData,
               currentMinWeight: 0,
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