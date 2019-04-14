import {combineReducers} from 'redux';
import graph from '../consts/variant_3';
import {ADD_TAB, CHANGE_STEP, DELETE_LAST_TAB, MIN_EDGE_WEIGHT_HANDLE_CHANGE, SELECT_NODES} from "../actions/index";

let fordFalkersonInitialState = {
    stepsVariantData: [{...graph}],
    selectedNodesVariantData: [[]],
    selectedEdgesVariantData: [[]],
    currentStep: 0,
    currentMinWeight: 0,
    currentMinWeightData: [""],
    graphSkeleton: [...graph.edges],
};

function Tasks(state = fordFalkersonInitialState, action) {
   switch(action.type) {
       case ADD_TAB:
           return {
               ...state,
               currentStep: state.currentStep + 1,
               stepsVariantData: [...state.stepsVariantData, action.payload],
               selectedNodesVariantData: [...state.selectedNodesVariantData, []],
               currentMinWeight: 0,
               currentMinWeightData: [...state.currentMinWeightData, ""],
           };

       case DELETE_LAST_TAB:
           let newStepsVariantData = [...state.stepsVariantData];
           let newSelectedNodesVariantData = [...state.selectedNodesVariantData];
           let newCurrentMinWeightData = [...state.currentMinWeightData];
           newStepsVariantData.pop();
           newSelectedNodesVariantData.pop();
           newCurrentMinWeightData.pop();

           return {
               ...state,
               currentStep: state.currentStep - 1,
               stepsVariantData: newStepsVariantData,
               selectedNodesVariantData: newSelectedNodesVariantData,
               currentMinWeight: 0,
               currentMinWeightData: newCurrentMinWeightData,
           };


       case MIN_EDGE_WEIGHT_HANDLE_CHANGE:
           let newHandleChangeCurrentMinWeightData = [...state.currentMinWeightData];
           newHandleChangeCurrentMinWeightData[state.currentStep] = action.payload;
           return {
               ...state,
               currentMinWeight: action.payload,
               currentMinWeightData: newHandleChangeCurrentMinWeightData,
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