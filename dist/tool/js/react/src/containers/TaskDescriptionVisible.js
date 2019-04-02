import {connect} from 'react-redux';
import TaskDescriptionComponent from '../components/TaskDescriptionComponent';
import {showTaskDescriptionDialog, closeTaskDescriptionDialog} from '../actions/index';

const mapStateToProps = (state) => {
    return {
        currentTask: state.Tasks.currentTask,
        isTaskDescDialogOpened: state.Tasks.isTaskDescDialogOpened,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        showTaskDescriptionDialog: () => dispatch(showTaskDescriptionDialog()),
        closeTaskDescriptionDialog: () => dispatch(closeTaskDescriptionDialog()),
    }
};

const TaskDescriptionVisible = connect(mapStateToProps, mapDispatchToProps)(TaskDescriptionComponent);

export default TaskDescriptionVisible;