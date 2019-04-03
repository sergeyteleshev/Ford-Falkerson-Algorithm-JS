import React from 'react';
import '../styles.scss';

export default class GraphComponent extends React.Component {
    componentDidMount()
    {
        let taskData = {
            nodes: [1, 2, 3, 4, 5],
            edges: [
                [2,3,4],
                [1,3,5],
                [1,2,4,5],
                [1,3,5],
                [2,3,4],
            ],
            bandwidth_up: [
                [20,30,10],
                [20,40,30],
                [30,40,10,20],
                [10,10,20],
                [30,20,20],
            ],
            bandwidth_down: [
                [0,0,0],
                [0,0,0],
                [0,0,0,0],
                [0,0,0],
                [0,0,0],
            ],
        };

        // Create a new directed graph
        let dagreD3 = require('dagre-d3');
        let d3 = require('d3');

        // Create the input graph
        let g = new dagreD3.graphlib.Graph()
            .setGraph({rankdir: "LR"})
            .setDefaultEdgeLabel(function() { return {}; });

        taskData.nodes.forEach((el, index) => {
            g.setNode(index, {shape: 'circle', label: el});
        });

        taskData.edges.forEach((el, index) => {
            el.forEach((ed, ed_index) => {
                if(index < ed - 1)
                    g.setEdge(index, ed - 1, {arrowhead: "undirected", label: taskData.bandwidth_up[index][ed_index] + "/" + taskData.bandwidth_down[index][ed_index]});
            });
        });

        // Create the renderer
        let render = new dagreD3.render();

        // Set up an SVG group so that we can translate the final graph.
        let svg = d3.select("svg"),
            svgGroup = svg.append("g");

        // Run the renderer. This is what draws the final graph.
        render(d3.select("svg g"), g);

        let nodesList = svg.selectAll("g.node")._groups[0];
        console.log(nodesList);
        nodesList.forEach((el) => {
            // el.innerHTML.circle.x = 20;
            // el.innerHTML.circle.y = 30;

           el.onclick = () => {console.log(el.textContent)}
        });

        // Center the graph
        let xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
        let yCenterOffset = (svg.attr("height") - g.graph().height) / 2;
        svgGroup.attr("transform", "translate(" + xCenterOffset + "," + yCenterOffset + ")");
    }

    render()
    {
        return (
            <div className={"graph"}>
                <div className={"steps"}>
                    <input type={"button"} value={"+"}/>
                </div>
                <svg className={"graphSvg"} width={1000} height={500}/>
                <div className={"controlPanel"}>
                    <input type={"button"} value={"Сбросить решение"}/>
                    <input type={"submit"} value={"Отправить"}/>
                </div>
            </div>
        );
    }
}
