import React from 'react';
import '../styles.scss';

export default class GraphComponent extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            selectedNodes: [],
            selectedEdges: [],
        };
    }

    componentDidMount()
    {
        // Create a new directed graph
        let dagreD3 = require('dagre-d3');
        let d3 = require('d3');

        // Create the input graph
        let g = new dagreD3.graphlib.Graph()
            .setGraph({rankdir: "LR"})
            .setDefaultEdgeLabel(function() { return {}; });

        this.props.data.nodes.forEach((el, index) => {
            g.setNode(index, {shape: 'circle', label: el});
        });

        this.props.data.edges.forEach((el, index) => {
            el.forEach((ed, ed_index) => {
                if(index < ed - 1)
                    g.setEdge(index, ed - 1, {arrowhead: "undirected", label: this.props.data.bandwidth_up[index][ed_index] + "/" + this.props.data.bandwidth_down[index][ed_index]});
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
        nodesList.forEach((el, index) => {
           el.onclick = () => {
               let nodeValue = +el.textContent;
               let selectedNodesCopy = this.state.selectedNodes.slice();
               console.log(nodeValue);

               //если точка уже в нашем пути, то удалить её, если она не разделяет наш путь на два и более несвязных путей
               //todo криво удаляет точки
               if(this.state.selectedNodes.length > 0 && this.state.selectedNodes.includes(nodeValue) && nodeValue !== 1)
               {
                   if(this.state.selectedNodes[this.state.selectedNodes.length - 1] === nodeValue)
                   {
                       el.setAttribute("class", el.getAttribute("class").replace("selectedNode", ""));
                       selectedNodesCopy.splice(selectedNodesCopy.indexOf(nodeValue), 1);
                   }
               }
               else if(this.state.selectedNodes.length === 0 && nodeValue === 1) // если это первый элемент, то начать новый путь
               {
                   el.setAttribute("class", el.getAttribute("class") + " selectedNode");
                   selectedNodesCopy.push(nodeValue);
               }
               else if(nodeValue !== 1) //проверить, есть ли из выбранной ноды ребро в любую ноду из нашего ПУТИ
               {
                   let isElementFound = false;
                   for(let i = 0; i < this.state.selectedNodes.length; i++)
                   {
                       for(let j = 0; j < this.props.data.edges[nodeValue-1].length; j++)
                       {
                           if(this.props.data.edges[nodeValue-1][j] === this.state.selectedNodes[i])
                           {
                               el.setAttribute("class", el.getAttribute("class") + " selectedNode");
                               selectedNodesCopy.push(nodeValue);
                               isElementFound = true;
                               break;
                           }
                       }

                       if(isElementFound)
                           break;
                   }
               }

               this.setState({
                   selectedNodes: selectedNodesCopy,
               });

               console.log(this.state);
           }
        });

        // Center the graph
        let xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
        let yCenterOffset = (svg.attr("height") - g.graph().height) / 2;
        svgGroup.attr("transform", "translate(" + xCenterOffset + "," + yCenterOffset + ")");
    }

    render()
    {
        return (
            <svg className={"graphSvg"} width={1000} height={500}/>
        );
    }
}