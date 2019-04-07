import React from 'react';
import '../styles.scss';
import GraphComponent from "./GraphComponent";
import graph from "../consts/variant_1";
import GraphContainer from "../containers/GraphContainer";

export default class MainComponent extends React.Component {
    render()
    {
        let variants = [...this.props.stepsVariantData];

        return (
            <div>
                <div className={"graph"}>
                    <div className={"steps"}>
                        <div className={"stepsTab"}>
                            {
                                variants.map((element, index) => {
                                    return <div key={index} className={"stepTab-element"}>{index+1}</div>
                                })
                            }
                        </div>
                        <input onClick={() => {this.props.addTab(this.props.stepsVariantData[this.props.currentStep], this.props.selectedNodesVariantData[this.props.currentStep])}} className={"addStep"} type={"button"} value={"+"}/>
                    </div>
                    <GraphContainer/>
                    <div className={"controlPanel"}>
                        <input type={"number"} onChange={(e) => this.props.minEdgeWeight(e)} value={this.props.currentMinWeight} placeholder={"минимальный вес ребра потока"}/>
                        <input type={"button"} value={"Сбросить решение"}/>
                        <input type={"submit"} value={"Отправить"}/>
                    </div>
                </div>
            </div>
        );
    }
}
