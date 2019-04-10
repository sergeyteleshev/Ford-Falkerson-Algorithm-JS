import React from 'react';
import '../styles.scss';
import GraphContainer from "../containers/GraphContainer";

export default class MainComponent extends React.Component {
    render()
    {
        return (
            <div>
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
                        {this.props.selectedNodesVariantData.length > 1 && this.props.currentStep === this.props.stepsVariantData.length - 1 ? <input onClick={() => this.props.deleteLastTab()} type={"button"} value={"-"}/> : null}
                    </div>
                    <GraphContainer/>
                    <div className={"controlPanel"}>
                        <input type={"number"} onChange={(e) => this.props.minEdgeWeight(e)} value={this.props.currentMinWeightData[this.props.currentStep]} placeholder={"минимальный вес ребра потока"}/>
                        <input type={"button"} value={"Сбросить решение"}/>
                        <input type={"submit"} className={"btn btn-success"} value={"Отправить"}/>
                    </div>
                </div>
            </div>
        );
    }
}
