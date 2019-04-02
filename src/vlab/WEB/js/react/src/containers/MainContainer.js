import {connect} from 'react-redux';
import MainComponent from "../components/MainComponent";

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

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default MainContainer;