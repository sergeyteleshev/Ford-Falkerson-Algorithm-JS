import {connect} from 'react-redux';
import {minEdgeWeight, selectNodes} from "../actions";
import GraphComponent from "../components/GraphComponent";

const mapStateToProps = (state) => {
    return {
        currentTask: state.Tasks.currentTask,
        stepsVariantData: state.Tasks.stepsVariantData,
        currentMinWeight: state.Tasks.currentMinWeight,
        currentStep: state.Tasks.currentStep,
        selectedNodesVariantData: state.Tasks.selectedNodesVariantData,
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