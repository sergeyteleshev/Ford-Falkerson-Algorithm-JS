import {connect} from 'react-redux';
import {
    changeTab, closeTaskDoneDialog, editCodeTask2, makeTaskAvailable, openTaskDoneDialog, setTaskResult,
    showTaskDescriptionDialog, closeTaskDescriptionDialog, changeCompiledCodeDialogStatus, openCodeErrorDialog,
} from "../actions";
import Task2Component from "../components/Task2Component";

const mapStateToProps = (state) => {
    return {
        currentCodeTask2: state.Tasks.currentCodeTask2,
        currentTask: state.Tasks.currentTask,
        resultTask2: state.Tasks.resultTask2,
        currentTask2RibsTable: state.Tasks.currentTask2RibsTable,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        editCodeTask2: (taskId) => dispatch(editCodeTask2(taskId)),
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

const Task2Visible = connect(mapStateToProps, mapDispatchToProps)(Task2Component);

export default Task2Visible;