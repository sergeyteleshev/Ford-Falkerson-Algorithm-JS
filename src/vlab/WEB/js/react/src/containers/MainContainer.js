import {connect} from 'react-redux';
import MainComponent from "../components/MainComponent";
import {addTab, changeStep, minEdgeWeight} from "../actions";

const mapStateToProps = (state) => {
    return {
        currentTask: state.Tasks.currentTask,
        stepsVariantData: state.Tasks.stepsVariantData,
        currentMinWeight: state.Tasks.currentMinWeight,
        currentStep: state.Tasks.currentStep,
        selectedNodes: state.Tasks.selectedNodes,
        selectedNodesVariantData: state.Tasks.selectedNodesVariantData,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        addTab: (data, currentMinWeight, nodesPath) => dispatch(addTab(data, currentMinWeight, nodesPath)),
        minEdgeWeight: (e) => dispatch(minEdgeWeight(e)),
        changeStep: (index) => dispatch(changeStep(index)),
    }
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default MainContainer;