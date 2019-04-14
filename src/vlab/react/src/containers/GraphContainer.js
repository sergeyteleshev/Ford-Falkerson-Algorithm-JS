import {connect} from 'react-redux';
import {minEdgeWeight, selectNodes} from "../actions/index";
import GraphComponent from "../components/GraphComponent";

const mapStateToProps = (state) => {
    return {
        currentTask: state.Tasks.currentTask,
        stepsVariantData: state.Tasks.stepsVariantData,
        currentMinWeight: state.Tasks.currentMinWeight,
        currentStep: state.Tasks.currentStep,
        selectedNodesVariantData: state.Tasks.selectedNodesVariantData,
        graphSkeleton: state.Tasks.graphSkeleton,
        currentMinWeightData: state.Tasks.currentMinWeightData,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        minEdgeWeight: (e) => dispatch(minEdgeWeight(e)),
        selectNodes: (selectedNodes) => dispatch(selectNodes(selectedNodes))
    }
};

const GrapContainer = connect(mapStateToProps, mapDispatchToProps)(GraphComponent);

export default GrapContainer;