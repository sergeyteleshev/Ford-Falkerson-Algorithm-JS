import {connect} from 'react-redux';
import {
    changeCompiledCodeDialogStatus,
    changeTab, closeTaskDescriptionDialog,
    closeTaskDoneDialog,
    editCodeTask3,
    makeTaskAvailable, openCodeErrorDialog,
    openTaskDoneDialog,
    setTaskResult, showTaskDescriptionDialog
} from "../actions";
import Task3Component from "../components/Task3Component";

const mapStateToProps = (state) => {
    return {
        currentCodeTask3: state.Tasks.currentCodeTask3,
        currentTask: state.Tasks.currentTask,
        resultTask3: state.Tasks.resultTask3,
        currentTask3RibsTable: state.Tasks.currentTask3RibsTable,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        editCodeTask3: (taskId) => dispatch(editCodeTask3(taskId)),
        makeTaskAvailable: (taskId) => dispatch(makeTaskAvailable(taskId)),
        setTaskResult: (result) => dispatch(setTaskResult(result)),
        openTaskDoneDialog: () => dispatch(openTaskDoneDialog()),
        closeTaskDoneDialog: () => dispatch(closeTaskDoneDialog()),
        changeTab: (value) => dispatch(changeTab(value)),
        showTaskDescriptionDialog: () => dispatch(showTaskDescriptionDialog()),
        closeTaskDescriptionDialog: () => dispatch(closeTaskDescriptionDialog()),
        changeCompiledCodeDialogStatus: () => dispatch(changeCompiledCodeDialogStatus()),
        openCodeErrorDialog: () => dispatch(openCodeErrorDialog()),
    }
};

const Task3Visible = connect(mapStateToProps, mapDispatchToProps)(Task3Component);

export default Task3Visible;