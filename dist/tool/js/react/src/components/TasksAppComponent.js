/* eslint-disable react/prop-types,react/jsx-key */
import React from 'react';
import '../styles.scss';
import Task1Visible from '../containers/Task1Visible';
import Task2Visible from '../containers/Task2Visible';
import Task3Visible from '../containers/Task3Visible';
import Task4Visible from '../containers/Task4Visible';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Snackbar} from "material-ui";

export default class TasksAppComponent extends React.Component {
    openTaskErrorDialog()
    {
        this.props.openChosenTaskErrorDialog();
    }

    closeTaskErrorDialog()
    {
        this.props.closeChosenTaskErrorDialog();
    }

    openTaskDoneDialog()
    {
        this.props.closeTaskDoneDialog();
    }

    closeTaskDoneDialog()
    {
        this.props.closeTaskDoneDialog();
    }

    render()
    {
        let currentTaskVisible = '';
        let currentTaskBar = '';
        const taskErrorActions = [
            <FlatButton
                label="Закрыть"
                secondary={true}
                onClick={() => this.closeTaskErrorDialog()}
            />,
        ];

        const taskDoneActions = [
            <FlatButton
                label="Закрыть"
                secondary={true}
                onClick={() => this.closeTaskDoneDialog()}
            />,
        ];

        if(this.props.currentTask === 1)
        {
            currentTaskVisible = <Task1Visible/>;
            currentTaskBar = <section className="tasks-bar">
                <FlatButton onClick={() => this.props.goAnotherTask(1)} label="Задание 1" secondary={true}/>
                <FlatButton onClick={() => this.props.goAnotherTask(2)} label="Задание 2"/>
                <FlatButton onClick={() => this.props.goAnotherTask(3)} label="Задание 3"/>
                <FlatButton onClick={() => this.props.goAnotherTask(4)} label="Задание 4"/>
            </section>;

            if(!this.props.isTask1DescShown)
            {
                this.props.changeTaskShownStatus();
            }
        }
        else if(this.props.currentTask === 2 && this.props.isOpenedTask2)
        {
            currentTaskVisible = <Task2Visible/>;
            currentTaskBar = <section className="tasks-bar">
                <FlatButton onClick={() => this.props.goAnotherTask(1)} label="Задание 1"/>
                <FlatButton onClick={() => this.props.goAnotherTask(2)} label="Задание 2" secondary={true}/>
                <FlatButton onClick={() => this.props.goAnotherTask(3)} label="Задание 3"/>
                <FlatButton onClick={() => this.props.goAnotherTask(4)} label="Задание 4"/>
            </section>;

            if(!this.props.isTask2DescShown)
            {
                this.props.changeTaskShownStatus();
            }
        }
        else if(this.props.currentTask === 3 && this.props.isOpenedTask3)
        {
            currentTaskVisible = <Task3Visible/>;
            currentTaskBar = <section className="tasks-bar">
                <FlatButton onClick={() => this.props.goAnotherTask(1)} label="Задание 1"/>
                <FlatButton onClick={() => this.props.goAnotherTask(2)} label="Задание 2"/>
                <FlatButton onClick={() => this.props.goAnotherTask(3)} label="Задание 3" secondary={true}/>
                <FlatButton onClick={() => this.props.goAnotherTask(4)} label="Задание 4"/>
            </section>;

            if(!this.props.isTask3DescShown)
            {
                this.props.changeTaskShownStatus();
            }
        }
        else if(this.props.currentTask === 4 && this.props.isOpenedTask4)
        {
            currentTaskVisible = <Task4Visible/>;
            currentTaskBar = <section className="tasks-bar">
                <FlatButton onClick={() => this.props.goAnotherTask(1)} label="Задание 1"/>
                <FlatButton onClick={() => this.props.goAnotherTask(2)} label="Задание 2"/>
                <FlatButton onClick={() => this.props.goAnotherTask(3)} label="Задание 3"/>
                <FlatButton onClick={() => this.props.goAnotherTask(4)} label="Задание 4" secondary={true}/>
            </section>;

            if(!this.props.isTask4DescShown)
            {
                this.props.changeTaskShownStatus();
            }
        }

        return (
            <div>
                <div className="application-window">
                    {currentTaskBar}
                </div>

                <div className="TasksContainer">
                    {currentTaskVisible}
                </div>

                <div className={"taskErrorDialog"}>
                    <Dialog
                        actions={taskErrorActions}
                        modal={false}
                        open={this.props.isChosenTaskErrorDialogOpened}
                        onRequestClose={() => this.closeTaskErrorDialog()}
                    >
                        Алло, сначала нужно пройти все предыдущие задания!
                    </Dialog>
                </div>

                <div className={"taskDoneDialog"}>
                    <Dialog
                        actions={taskDoneActions}
                        modal={false}
                        open={this.props.isTaskDoneDialogOpened}
                        onRequestClose={() => this.closeTaskDoneDialog()}
                    >
                        Задаение пройдено. Красава!
                    </Dialog>
                </div>

                <Snackbar
                    open={this.props.isCompiledCodeDialogOpened}
                    message="ВЫПОЛНЕНО"
                    autoHideDuration={1500}
                    onRequestClose={() => this.props.changeCompiledCodeDialogStatus()}
                    contentStyle={{
                        color: 'white',
                    }}
                    bodyStyle={{
                        background: 'rgb(0, 151, 167)',
                    }}
                    style={{
                        textAlign: 'center',
                    }}
                />

                <Snackbar
                    open={this.props.isCodeErrorDialogOpened}
                    message="ОШИБКА"
                    autoHideDuration={1500}
                    onRequestClose={() => this.props.closeCodeErrorDialog()}
                    contentStyle={{
                        color: 'white',
                    }}
                    bodyStyle={{
                        background: 'rgb(244, 67, 54)',
                    }}
                    style={{
                        textAlign: 'center',
                    }}
                />
            </div>
        );
    }
}
