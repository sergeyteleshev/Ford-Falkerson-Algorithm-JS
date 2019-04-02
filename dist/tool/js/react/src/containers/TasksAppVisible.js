import {connect} from 'react-redux';
import TasksAppComponent from '../components/TasksAppComponent';
import {goAnotherTask, openChosenTaskErrorDialog, closeChosenTaskErrorDialog, openTaskDoneDialog,
    closeTaskDoneDialog, changeTaskShownStatus, changeCompiledCodeDialogStatus, closeCodeErrorDialog
} from '../actions/index';

const mapStateToProps = (state) => {
    return {
        currentTask: state.Tasks.currentTask,
        isOpenedTask1: state.Tasks.isOpenedTask1,
        isOpenedTask2: state.Tasks.isOpenedTask2,
        isOpenedTask3: state.Tasks.isOpenedTask3,
        isOpenedTask4: state.Tasks.isOpenedTask4,
        isChosenTaskErrorDialogOpened: state.Tasks.isChosenTaskErrorDialogOpened,
        isTaskDoneDialogOpened: state.Tasks.isTaskDoneDialogOpened,
        isTask1DescShown: state.Tasks.isTask1DescShown,
        isTask2DescShown: state.Tasks.isTask2DescShown,
        isTask3DescShown: state.Tasks.isTask3DescShown,
        isTask4DescShown: state.Tasks.isTask4DescShown,
        isCompiledCodeDialogOpened: state.Tasks.isCompiledCodeDialogOpened,
        isCodeErrorDialogOpened: state.Tasks.isCodeErrorDialogOpened,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        goAnotherTask: (taskId) => dispatch(goAnotherTask(taskId)),
        openChosenTaskErrorDialog: () => dispatch(openChosenTaskErrorDialog()),
        closeChosenTaskErrorDialog: () => dispatch(closeChosenTaskErrorDialog()),
        openTaskDoneDialog: () => dispatch(openTaskDoneDialog()),
        closeTaskDoneDialog: () => dispatch(closeTaskDoneDialog()),
        changeTaskShownStatus: () => dispatch(changeTaskShownStatus()),
        changeCompiledCodeDialogStatus: () => dispatch(changeCompiledCodeDialogStatus()),
        closeCodeErrorDialog: () => dispatch(closeCodeErrorDialog()),
    }
};

const TasksAppVisible = connect(mapStateToProps, mapDispatchToProps)(TasksAppComponent);

export default TasksAppVisible;