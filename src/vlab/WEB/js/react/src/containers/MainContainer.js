import {connect} from 'react-redux';
import MainComponent from "../components/MainComponent";
import {addTab, changeStep, deleteLastTab, minEdgeWeight} from "../actions";

const mapStateToProps = (state) => {
    return {
        currentTask: state.Tasks.currentTask,
        stepsVariantData: state.Tasks.stepsVariantData,
        currentMinWeight: state.Tasks.currentMinWeight,
        currentStep: state.Tasks.currentStep,
        selectedNodes: state.Tasks.selectedNodes,
        selectedNodesVariantData: state.Tasks.selectedNodesVariantData,
        currentMinWeightData: state.Tasks.currentMinWeightData,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        minEdgeWeight: (e) => dispatch(minEdgeWeight(e)),
        addTab: (data, minEdgeWeight, nodesPath) => dispatch(addTab(data, minEdgeWeight, nodesPath)),
        changeStep: (index) => dispatch(changeStep(index)),
        deleteLastTab: () => dispatch(deleteLastTab()),
    }
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default MainContainer;