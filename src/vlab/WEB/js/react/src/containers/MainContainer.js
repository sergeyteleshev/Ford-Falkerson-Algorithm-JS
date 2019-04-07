import {connect} from 'react-redux';
import MainComponent from "../components/MainComponent";
import {addTab, minEdgeWeight} from "../actions";

const mapStateToProps = (state) => {
    return {
        currentTask: state.Tasks.currentTask,
        stepsVariantData: state.Tasks.stepsVariantData,
        currentMinWeight: state.Tasks.currentMinWeight,
        currentStep: state.Tasks.stepsVariantData,
        selectedNodes: state.Tasks.selectedNodes,
        selectedNodesVariantData: state.Tasks.selectedNodesVariantData,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        addTab: (variantData, variantSelectedNodes) => dispatch(addTab(variantData, variantSelectedNodes)),
        minEdgeWeight: (e) => dispatch(minEdgeWeight(e)),
    }
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default MainContainer;