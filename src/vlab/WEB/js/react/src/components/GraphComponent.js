import React from 'react';
import '../styles.scss';

export default class GraphComponent extends React.Component {
    componentDidMount()
    {
        // Create a new directed graph
        let dagreD3 = require('dagre-d3');
        let d3 = require('d3');

        // Create the input graph
        let g = new dagreD3.graphlib.Graph()
            .setGraph({rankdir: "LR"})
            .setDefaultEdgeLabel(function() { return {}; });

        this.props.stepsVariantData[this.props.currentStep].nodes.forEach((el, index) => {
            g.setNode(index, {shape: 'circle', label: el});
        });

        for(let i = 0; i < this.props.stepsVariantData[this.props.currentStep].edges.length; i++)
        {
            for(let j = 0; j < this.props.stepsVariantData[this.props.currentStep].edges.length; j++)
            {
                if(this.props.stepsVariantData[this.props.currentStep].edges[i][j] > 0)
                {
                    g.setEdge(i,j,{label: this.props.stepsVariantData[this.props.currentStep].edges[i][j] + "/" + this.props.stepsVariantData[this.props.currentStep].edgesBack[i][j], arrowhead: "undirected"});
                }
            }
        }

        // Create the renderer
        let render = new dagreD3.render();

        // Set up an SVG group so that we can translate the final graph.
        let svg = d3.select("svg"),
            svgGroup = svg.append("g");

        // Run the renderer. This is what draws the final graph.
        render(d3.select("svg g"), g);

        let nodesList = svg.selectAll("g.node")._groups[0];
        console.log(nodesList);

        nodesList.forEach((el, index) => {
           el.onclick = () => {
               let newNodeValue = +el.textContent;
               let selectedNodesCopy = this.props.selectedNodesVariantData[this.props.currentStep].slice();
               console.log(newNodeValue);

               //если точка уже в нашем пути, то удалить её, если она не разделяет наш путь на два и более несвязных путей
               //todo криво удаляет точки
               if(this.props.selectedNodesVariantData[this.props.currentStep].length > 0 && this.props.selectedNodesVariantData[this.props.currentStep].includes(newNodeValue))
               {
                   if(this.props.selectedNodesVariantData[this.props.currentStep][this.props.selectedNodesVariantData[this.props.currentStep].length - 1] === newNodeValue)
                   {
                       el.setAttribute("class", el.getAttribute("class").replace("selectedNode", ""));
                       selectedNodesCopy.splice(selectedNodesCopy.indexOf(newNodeValue), 1);
                   }
               }
               else if(this.props.selectedNodesVariantData[this.props.currentStep].length === 0 && newNodeValue === 0) // если это первый элемент, то начать новый путь
               {
                   el.setAttribute("class", el.getAttribute("class") + " selectedNode");
                   selectedNodesCopy.push(newNodeValue);
               }
               else if(newNodeValue !== 0) //проверить, есть ли из выбранной ноды ребро в любую ноду из нашего ПУТИ
               {
                   let isElementFound = false;
                   for(let i = 0; i < this.props.selectedNodesVariantData[this.props.currentStep].length; i++)
                   {
                       for(let j = 0; j < this.props.stepsVariantData[this.props.currentStep].edges[newNodeValue].length; j++)
                       {
                           if(this.props.stepsVariantData[this.props.currentStep].edges[j][newNodeValue] > 0 && j === this.props.selectedNodesVariantData[this.props.currentStep][i])
                           {
                               el.setAttribute("class", el.getAttribute("class") + " selectedNode");
                               selectedNodesCopy.push(newNodeValue);
                               isElementFound = true;
                               break;
                           }
                       }

                       if(isElementFound)
                           break;
                   }
               }

               this.props.selectNodes(selectedNodesCopy);
           }
        });

        // Center the graph
        let xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
        let yCenterOffset = (svg.attr("height") - g.graph().height) / 2;
        svgGroup.attr("transform", "translate(" + xCenterOffset + "," + yCenterOffset + ")");
    }

    render()
    {
        let fordFulkerson = require('graph-theory-ford-fulkerson');
        return (
            <div>
                <svg className={"graphSvg"} width={1000} height={500}/>
                <div>
                    <span>Текущий путь: </span>
                    <span>{this.props.selectedNodesVariantData[this.props.currentStep].toString()}</span>
            </div>

                    <p>Максимальный поток данного графа: {
                        fordFulkerson(
                            this.props.stepsVariantData[this.props.currentStep].edges,
                            this.props.stepsVariantData[this.props.currentStep].nodes[0],
                            this.props.stepsVariantData[this.props.currentStep].nodes[this.props.stepsVariantData[this.props.currentStep].nodes.length - 1]
                        )
                    }</p>
            </div>
        );
    }
}