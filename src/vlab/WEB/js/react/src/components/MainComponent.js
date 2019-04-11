import React from 'react';
import '../styles.scss';
import GraphContainer from "../containers/GraphContainer";

export default class MainComponent extends React.Component {
    render()
    {
        const fordFulkerson = require('graph-theory-ford-fulkerson');

        return (
                <div className={"graph"}>
                    <div className={"steps"}>
                        <div className={"stepsTab"}>
                            {
                                this.props.stepsVariantData.map((element, index) => {
                                    let selectTab = "";
                                    if(index === this.props.currentStep)
                                        selectTab = " selectTab";

                                    return <div onClick={() => this.props.changeStep(index)} className={"stepTab-element" + selectTab}>{index+1}</div>
                                })
                            }
                        </div>
                        {this.props.currentStep === this.props.stepsVariantData.length - 1 ? <input onClick={() => this.props.addTab(this.props.stepsVariantData[this.props.currentStep], this.props.currentMinWeightData[this.props.currentStep], this.props.selectedNodesVariantData[this.props.currentStep])} className={"addStep"} type={"button"} value={"+"}/> : null}
                        {this.props.selectedNodesVariantData.length > 1 && this.props.currentStep === this.props.stepsVariantData.length - 1 ? <input onClick={() => this.props.deleteLastTab()} type={"button"} className={"minusStep"} value={"-"}/> : null}
                    </div>
                    <GraphContainer/>

                    <div className={"labBottom"}>
                        <div className={"info"}>
                            <div>
                                <span>Текущий путь: </span>
                                <span>{this.props.selectedNodesVariantData[this.props.currentStep].toString()}</span>
                            </div>

                            <p>Максимальный поток данного графа: {
                                fordFulkerson(
                                    this.props.graphSkeleton,
                                    this.props.stepsVariantData[this.props.currentStep].nodes[0],
                                    this.props.stepsVariantData[this.props.currentStep].nodes[this.props.stepsVariantData[this.props.currentStep].nodes.length - 1]
                                )
                            }</p>
                        </div>

                        <div className={"controlPanel"}>
                            <input type={"number"} className={"textInputGray"} onChange={(e) => this.props.minEdgeWeight(e)} value={this.props.currentMinWeightData[this.props.currentStep]} placeholder={"минимальный вес ребра потока"}/>
                            <input type={"button"} className={"btnGray"} value={"Сбросить решение"}/>
                            <input type={"submit"} className={"btnGray"} value={"Отправить"}/>
                        </div>
                    </div>
                </div>
        );
    }
}
