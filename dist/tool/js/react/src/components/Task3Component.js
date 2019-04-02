/* eslint-disable react/prop-types */
import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/twilight';

import task3InitialData from '../consts/Task3/InitialData';
import resultData from '../consts/Task3/Result';
import {check} from "../consts/Task3/Checker";
import TaskDesc from "../consts/Task3/TaskDesc";

import RibsTableVisible from '../containers/RibsTableVisible';
import GraphVisible from '../containers/GraphVisible';
import TaskDescriptionVisible from '../containers/TaskDescriptionVisible';

import AceEditor from 'react-ace';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class Task3Component extends React.Component
{
    executeCode()
    {
        let iDoc = this.ifr.contentWindow;
        let data = {
            initialRibsTable: Object.assign(task3InitialData.ribsTable),
            resultData: Object.assign(resultData),
        };

        let result = null;

        iDoc.postMessage(data, "*");
        iDoc.postMessage(result, "*");

        try {
            this.ifr.contentWindow.document.body.innerHTML = "<script class='task3Code' type='text/javascript'>" +
                eval(this.props.currentCodeTask3) +
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

    render()
    {
        let resultObject = Object.assign({}, task3InitialData);
        let snakeData = this.props.resultTask3;

        return(
            <div>
                <section className="mainBody">
                    <div className="mainBodyLeftPart">
                        <AceEditor
                            mode="javascript"
                            theme="twilight"
                            name="task3Editor"
                            onChange={this.props.editCodeTask3}
                            value={this.props.currentCodeTask3}
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
                                    value={this.props.currentTask3RibsTable}
                                    onChange={(value) => this.tabHandleChange(value)}
                                >
                                    <Tab label="Результат" value="source">
                                        <RibsTableVisible
                                            initialData={resultObject}
                                            highlightedCells={resultObject.highlightedData}
                                            snakeData={snakeData}
                                        />
                                    </Tab>
                                    <Tab label="Визуализация" value="graph">
                                        <GraphVisible
                                            nodes={resultObject.nodes}
                                            providers={resultObject.providers}
                                            ribsTable={resultObject.ribsTable}
                                            highlightedData={resultObject.highlightedData}
                                        />
                                    </Tab>
                                </Tabs>
                            </div>
                        </section>
                    </div>

                    <section className="userResult">
                        <iframe sandbox={"allow-same-origin"} ref={(f) => this.ifr = f} style={{display: "none"}} className="task3-iframe"/>
                    </section>
                </section>

                <TaskDescriptionVisible text={TaskDesc}/>
            </div>
        );
    }
}