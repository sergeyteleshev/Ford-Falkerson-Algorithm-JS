let graph = {
    nodes: [0,1,2,3,4,5,6],
    edges: [
        [0, 3, 0, 0, 0, 5, 0],
        [0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 4],
        [0, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 5, 0, 0, 4],
        [0, 0, 0, 0, 0, 0, 4],
        [0, 0, 0, 0, 0, 0, 0],
    ],
    edgesBack: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ],
};

function init_lab() {
    var stepsVariantData = [{...graph}],
        selectedNodesVariantData = [[]],
        selectedEdgesVariantData = [[]],
        currentStep = 0,
        currentMinWeight = 0,
        currentMinWeightData = [""],
        graphSkeleton = [...graph.edges],
        aue = "<div class=\"graph\">\n" +
            "                    <div class=\"steps\">\n" +
            "                        <div class=\"stepsTab\">\n" +
            "                            <div class=\"stepTab-element\">1</div>" +
            "                        </div>\n" +
            "                        <input class=\"addStep\" type=\"button\" value=\"+\"/>" +
            "                        <input type=\"button\" class=\"minusStep\" value=\"-\">\n" +
            "                    </div>\n" +
            "<div class=\"graphComponent\">\n" +
            "<svg class=\"graphSvg\" width=1000 height=500>\n" +
            "</div>" +
            "\n" +
            "                    <div class=\"labBottom\">\n" +
            "                        <div class=\"info\">\n" +
            "                            <div>\n" +
            "                                <span>Текущий путь: </span>\n" +
            "                                <span>1,2,3,4,5</span>\n" +
            "                            </div>\n" +
            "\n" +
            "                            <p>Максимальный поток данного графа: 2\n" +
            "                            </p>\n" +
            "                        </div>\n" +
            "\n" +
            "                        <div class=\"controlPanel\">\n" +
            "                            <input type=\"number\" class=\"textInputGray\"/>\n" +
            "                            <input type=\"button\" class=\"btnGray\" value=\"Сбросить решение\"/>\n" +
            "                            <input type=\"submit\" class=\"btnGray\" value=\"Отправить\"/>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>";

    function renderDag()
    {
        // Create a new directed graph
        // let dagreD3 = require('../lib/dagre.min');
        // let d3 = require('../lib/d3.v5.min');

        // Create the input graph
        let g = new dagreD3.graphlib.Graph()
            .setGraph({rankdir: "LR"})
            .setDefaultEdgeLabel(function() { return {}; });

        stepsVariantData[currentStep].nodes.forEach((el, index) => {
            g.setNode(index, {shape: 'circle', label: el});
        });

        for(let i = 0; i < stepsVariantData[currentStep].edges.length; i++)
        {
            for(let j = 0; j < stepsVariantData[currentStep].edges.length; j++)
            {
                if(graphSkeleton[i][j] > 0)
                {
                    g.setEdge(i,j,{label: stepsVariantData[currentStep].edges[i][j] + "/" + stepsVariantData[currentStep].edgesBack[i][j], arrowhead: "normal"});
                    console.log(stepsVariantData[currentStep].edges[i][j]);
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

        //очистка всех выделенных точек
        nodesList.forEach((el, index) => {
            el.setAttribute("class", el.getAttribute("class").replace("selectedNode", null));
        });

        nodesList.forEach((el, index) => {
            el.onclick = () => {
                let newNodeValue = +el.textContent;
                let selectedNodesCopy = selectedNodesVariantData[currentStep].slice();

                //если точка уже в нашем пути, то удалить её, если она не разделяет наш путь на два и более несвязных путей
                if(selectedNodesVariantData[currentStep].length > 0 && selectedNodesVariantData[currentStep].includes(newNodeValue))
                {
                    if(selectedNodesVariantData[currentStep][selectedNodesVariantData[currentStep].length - 1] === newNodeValue)
                    {
                        selectedNodesCopy.splice(selectedNodesCopy.indexOf(newNodeValue), 1);
                    }
                }
                else if(selectedNodesVariantData[currentStep].length === 0 && newNodeValue === 0) // если это первый элемент, то начать новый путь
                {
                    selectedNodesCopy.push(newNodeValue);
                }
                else if(newNodeValue !== 0) //проверить, есть ли из выбранной ноды ребро в любую ноду из нашего ПУТИ
                {
                    for(let j = 0; j < stepsVariantData[currentStep].edges[newNodeValue].length; j++)
                    {
                        if((stepsVariantData[currentStep].edges[j][newNodeValue] > 0 && j === selectedNodesVariantData[currentStep][selectedNodesVariantData[currentStep].length - 1]))
                        {
                            selectedNodesCopy.push(newNodeValue);
                            break;
                        }
                        else if((stepsVariantData[currentStep].edgesBack[newNodeValue][j] > 0 && j === selectedNodesVariantData[currentStep][selectedNodesVariantData[currentStep].length - 1]))
                        {
                            selectedNodesCopy.push(newNodeValue);
                            break;
                        }
                    }
                }

                // selectNodes(selectedNodesCopy);
                // this.forceUpdate();
            }
        });

        //выделение всех нод попавших выделенные ноды
        nodesList.forEach((node, i) => {
            selectedNodesVariantData[currentStep].map((selected_node, j) => {
                if(selected_node === i)
                {
                    node.setAttribute("class", node.getAttribute("class") + " selectedNode");
                }
            });
        });

        // Center the graph
        let xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
        let yCenterOffset = (svg.attr("height") - g.graph().height) / 2;
        svgGroup.attr("transform", "translate(" + xCenterOffset + "," + yCenterOffset + ")");
    }


    return {
        setletiant : function(str){},
        setPreviosSolution: function(str){},
        setMode: function(str){},

        //Инициализация ВЛ
        init : function(){
            this.div = document.getElementById("jsLab");
            // this.div.innerHTML = this.window;
            // document.getElementById("tool").innerHTML = this.tool;

            //получение варианта задания
            // let ins = document.getElementById("preGeneratedCode").value + " " + document.getElementById("calculatedCode").value +
            //     " " + document.getElementById("previousSolution").value;
            this.div.innerHTML = aue;
            renderDag();
        },

        getCondition: function(){},
        getResults: function(){ return "results"},
        calculateHandler: function(text, code){},
    }
}

var Vlab = init_lab();