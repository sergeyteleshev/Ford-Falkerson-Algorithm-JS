let graph = {
    nodes: [0, 1, 2, 3, 4, 5, 6],
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
    function bfs(rGraph, s, t, parent) {
        var visited = [];
        var queue = [];
        var V = rGraph.length;
        // Create a visited array and mark all vertices as not visited
        for (var i = 0; i < V; i++) {
            visited[i] = false;
        }
        // Create a queue, enqueue source vertex and mark source vertex as visited
        queue.push(s);
        visited[s] = true;
        parent[s] = -1;

        while (queue.length != 0) {
            var u = queue.shift();
            for (var v = 0; v < V; v++) {
                if (visited[v] == false && rGraph[u][v] > 0) {
                    queue.push(v);
                    parent[v] = u;
                    visited[v] = true;
                }
            }
        }
        //If we reached sink in BFS starting from source, then return true, else false
        return (visited[t] == true);
    }

    function fordFulkerson(graph, s, t) {
        /* Create a residual graph and fill the residual graph
         with given capacities in the original graph as
         residual capacities in residual graph
         Residual graph where rGraph[i][j] indicates
         residual capacity of edge from i to j (if there
         is an edge. If rGraph[i][j] is 0, then there is
         not)
        */
        if (s < 0 || t < 0 || s > graph.length - 1 || t > graph.length - 1) {
            throw new Error("Ford-Fulkerson-Maximum-Flow :: invalid sink or source");
        }
        if (graph.length === 0) {
            throw new Error("Ford-Fulkerson-Maximum-Flow :: invalid graph");
        }
        var rGraph = [];
        for (var u = 0; u < graph.length; u++) {
            var temp = [];
            if (graph[u].length !== graph.length) {
                throw new Error("Ford-Fulkerson-Maximum-Flow :: invalid graph. graph needs to be NxN");
            }
            for (v = 0; v < graph.length; v++) {
                temp.push(graph[u][v]);
            }
            rGraph.push(temp);
        }
        var parent = [];
        var maxFlow = 0;

        while (bfs(rGraph, s, t, parent)) {
            var pathFlow = Number.MAX_VALUE;
            for (var v = t; v != s; v = parent[v]) {
                u = parent[v];
                pathFlow = Math.min(pathFlow, rGraph[u][v]);
            }
            for (v = t; v != s; v = parent[v]) {
                u = parent[v];
                rGraph[u][v] -= pathFlow;
                rGraph[v][u] += pathFlow;
            }


            maxFlow += pathFlow;
        }
        // Return the overall flow
        return maxFlow;
    }

    function getHTML(templateData) {
        let tabs = "";
        for(let i = 0; i < templateData.currentStep + 1; i++) {
            tabs +="<div class=\"stepTab-element\">" + (i+1) + "</div>";
        }

        return `
        <div class="graph">
            <div class="steps">
                <div class="stepsTab">
                    ${tabs}
                </div>
                <input class="addStep" id="addStepId" type="button" value="+"/>
                <input type="button" class="minusStep" value="-">
                <input type="button" class="minusStep" value="${templateData.currentStep+1}">
            </div>
            <div class="graphComponent">
                <svg class="graphSvg" width=1000 height=500>
            </div>
            <div class="labBottom">
                <div class="info">
                    <div>
                        <span>Текущий путь: </span>
                        <span>${templateData.selectedNodesVariantData}</span>
                    </div>
                    <p>Максимальный поток данного графа: ${templateData.fordFulkerson}</p>
                </div>
                <div class="controlPanel">
                    <input type="number" class="textInputGray"/>
                    <input type="button" class="btnGray" value="Сбросить решение"/>
                    <input type="submit" class="btnGray" value="Отправить"/>
                </div>
            </div>
        </div>`
    }

    function renderTemplate(element, html) {
        element.innerHTML = html;
    }

    function initState(graph) {
        let _state = {
            stepsVariantData: [{...graph}],
            selectedNodesVariantData: [[]],
            selectedEdgesVariantData: [[]],
            currentStep: 0,
            currentMinWeight: 0,
            currentMinWeightData: [""],
            graphSkeleton: [...graph.edges]
        };

        return {
            getState: function () {
                return _state
            },
            updateState: function (callback) {
                _state = callback(_state);
                return _state;
            }
        }
    }

    function subscriber() {
        const events = {};

        return {
            subscribe: function (event, fn) {
                if (!events[event]) {
                    events[event] = [fn]
                } else {
                    events[event].push(fn)
                }

            },
            emit: function (event, data = undefined) {
                events[event].map(fn => data ? fn(data) : fn())
            }
        }
    }

    function App() {
        return {
            state: initState(graph),
            subscriber: subscriber(),
        }
    }

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
        setletiant: function (str) {
        },
        setPreviosSolution: function (str) {
        },
        setMode: function (str) {
        },

        //Инициализация ВЛ
        init: function () {
            const appInstance = App();
            const root = document.getElementById('jsLab');
            // основная функция для рендеринга
            const render = (state) => {
                console.log('state', state);
                const templateData = {
                    currentStep: state.currentStep,
                    selectedNodesVariantData: state.selectedNodesVariantData[state.currentStep],
                    fordFulkerson: fordFulkerson(
                        state.graphSkeleton,
                        state.stepsVariantData[state.currentStep].nodes[0],
                        state.stepsVariantData[state.currentStep].nodes[state.stepsVariantData[state.currentStep].nodes.length - 1]
                    )
                };

                renderTemplate(root, getHTML(templateData));
            };

            //this.div = document.getElementById("jsLab");
            // this.div.innerHTML = this.window;
            // document.getElementById("tool").innerHTML = this.tool;
            appInstance.subscriber.subscribe('render', render);
            // основная функция для рендеринга

            // $(document).click(function () {
            //     $(".addStep").click(function () {
            //         const state = appInstance.state.updateState((state) => {
            //             const currentStep = state.currentStep += 1;
            //             const stepsVariantData = JSON.parse(JSON.stringify(state.stepsVariantData[0]));
            //
            //             return  {
            //                 ...state,
            //                 currentStep,
            //                 stepsVariantData: [...state.stepsVariantData, stepsVariantData]
            //             }
            //         });
            //
            //         // перересовываем приложение
            //         appInstance.subscriber.emit('render', state)
            //     });
            //
            //     $(".minusStep").click(function () {
            //         const state = appInstance.state.updateState((state) => {
            //             if(state.currentStep > 0)
            //             {
            //                 const currentStep = state.currentStep -= 1;
            //                 let newStepsVariantData = [...state.stepsVariantData];
            //                 newStepsVariantData.pop();
            //                 return  {
            //                     ...state,
            //                     currentStep,
            //                     stepsVariantData: newStepsVariantData,
            //                 }
            //             }
            //             else
            //             {
            //                 return {
            //                     ...state
            //                 };
            //             }
            //         });
            //
            //         // перересовываем приложение
            //         appInstance.subscriber.emit('render', state)
            //     });
            //
            //     console.log(event);
            // });

            // подписки хуиски

            // инициализируем первую отрисовку
            appInstance.subscriber.emit('render', appInstance.state.getState());

            //получение варианта задания
            // let ins = document.getElementById("preGeneratedCode").value + " " + document.getElementById("calculatedCode").value +
            //     " " + document.getElementById("previousSolution").value;
            // this.div.innerHTML = window;
        },
        getCondition: function () {
        },
        getResults: function () {
            return "results"
        },
        calculateHandler: function (text, code) {
        },
    }
}

var Vlab_test = init_lab();

