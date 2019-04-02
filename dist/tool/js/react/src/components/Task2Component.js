import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/twilight';

import task2InitialData from '../consts/Task2/InitialData';
import {check} from '../consts/Task2/Checker';
import resultData from '../consts/Task2/Result';

import AceEditor from 'react-ace';

import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import GraphVisible from "../containers/GraphVisible";
import TaskDesc from "../consts/Task2/TaskDesc";

import RibsTableVisible from '../containers/RibsTableVisible';
import TaskDescriptionVisible from '../containers/TaskDescriptionVisible';

export default class Task2Component extends React.Component
{
    executeCode()
    {
        let iDoc = this.ifr.contentWindow;
        let data = {
            initialRibsTable: Object.assign(task2InitialData.ribsTable),
            resultData: Object.assign(resultData),
        };

        let result = null;

        iDoc.postMessage(data, "*");
        iDoc.postMessage(result, "*");

        try {
            this.ifr.contentWindow.document.body.innerHTML = "<script class='task2Code' type='text/javascript'>" +
                eval(this.props.currentCodeTask2) +
                "</script>";
        }
        catch (e) {
            this.props.openCodeErrorDialog();
            console.log(e);
        }

        this.props.setTaskResult(result);
        this.forceUpdate();

        if(check(result) === true)
        {
            this.props.openTaskDoneDialog();
            this.props.makeTaskAvailable(this.props.currentTask + 1);
        }

        this.props.changeCompiledCodeDialogStatus();
    }

    tabHandleChange(value)
    {
        this.props.changeTab(value);
    }

    componentWillMount()
    {

    }

    render()
    {
        let resultObject = Object.assign({}, task2InitialData);
        resultObject.ribsTable = this.props.resultTask2;

        return(
            <div>
                <section className="mainBody">
                    <div className="mainBodyLeftPart">
                        <AceEditor
                            mode="javascript"
                            theme="twilight"
                            name="task2Editor"
                            onChange={this.props.editCodeTask2}
                            value={this.props.currentCodeTask2}
                            fontSize={14}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            width={"100%"}
                            setOptions={{
                                showLineNumbers: true,
                                tabSize: 2,
                            }}
                            editorProps={{
                                $blockScrolling: Infinity
                            }}
                        />
                        <div className="editorButtons">
                            <RaisedButton className={"executeButton editorButton"} type={"button"} label="Выполнить код" onClick={() => this.executeCode()}/>
                            <RaisedButton className={"showTaskButton editorButton"} type={"button"} label="Показать задание" onClick={() => this.props.showTaskDescriptionDialog()}/>
                        </div>
                    </div>

                    <div className={"mainBodyRightPart"}>
                        <section className={"ribTables"}>
                            <div className={"tabs"}>
                                <Tabs
                                    value={this.props.currentTask2RibsTable}
                                    onChange={(value) => this.tabHandleChange(value)}
                                >
                                    <Tab label="Результат" value="source">
                                        {this.props.resultTask2 ? <RibsTableVisible highlightedCells={this.props.resultTask2} initialData={task2InitialData}/> : <RibsTableVisible initialData={task2InitialData}/>}
                                    </Tab>
                                    <Tab label="Визуализация" value="graph">
                                        {
                                            this.props.resultTask2 ?
                                            <GraphVisible
                                            nodes={task2InitialData.nodes}
                                            providers={task2InitialData.providers}
                                            ribsTable={task2InitialData.ribsTable}
                                            highlightedData={this.props.resultTask2}
                                            />
                                            :
                                            <GraphVisible
                                                nodes={task2InitialData.nodes}
                                                providers={task2InitialData.providers}
                                                ribsTable={task2InitialData.ribsTable}
                                            />
                                        }
                                    </Tab>
                                </Tabs>
                            </div>
                        </section>
                    </div>

                    <section className="userResult">
                        <iframe sandbox={"allow-same-origin"} ref={(f) => this.ifr = f} style={{display: "none"}} className="task2-iframe"/>
                    </section>
                </section>

                <TaskDescriptionVisible text={TaskDesc}/>
            </div>
        );
    }
}