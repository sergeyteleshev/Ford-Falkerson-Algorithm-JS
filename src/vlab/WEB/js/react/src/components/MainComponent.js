import React from 'react';
import '../styles.scss';
import taskData from '../consts/variant_1';
import GraphComponent from "./GraphComponent";

export default class MainComponent extends React.Component {
    render()
    {
        return (
            <div>
                <div className={"graph"}>
                    <div className={"steps"}>
                        <input type={"button"} value={"+"}/>
                    </div>
                    <GraphComponent data={taskData}/>
                    <div className={"controlPanel"}>
                        <input type={"button"} value={"Сбросить решение"}/>
                        <input type={"submit"} value={"Отправить"}/>
                    </div>
                </div>
            </div>
        );
    }
}
