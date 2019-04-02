import {connect} from 'react-redux';
import GraphComponent from "../components/GraphComponent";

const mapStateToProps = (state) => {
    return {
        currentTask: state.Tasks.currentTask,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        //goAnotherTask: (taskId) => dispatch(goAnotherTask(taskId)),
    }
};

const GraphContainer = connect(mapStateToProps, mapDispatchToProps)(GraphComponent);

export default GraphContainer;