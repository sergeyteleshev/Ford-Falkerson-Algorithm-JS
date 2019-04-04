import React from 'react';
import '../styles.scss';
import GraphComponent from "./GraphComponent";
import graph from "../consts/variant_2";

export default class MainComponent extends React.Component {
    render()
    {
        return (
            <div>
                <div className={"graph"}>
                    <div className={"steps"}>
                        <input type={"button"} value={"+"}/>
                    </div>
                    <GraphComponent data={graph}/>
                    <div className={"controlPanel"}>
                        <input type={"button"} value={"Сбросить решение"}/>
                        <input type={"submit"} value={"Отправить"}/>
                    </div>
                </div>
            </div>
        );
    }
}
