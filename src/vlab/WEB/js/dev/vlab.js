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
    let stepButtons = "";
    for(let i = 0; i < templateData.currentStep + 1; i++)
    {
        stepButtons += `<div class="stepTab-element">${i + 1}</div>`;
    }

    return `
        <div class="graph">
            <div class="steps">
                <div class="stepsTab">
                    ${stepButtons}
                </div>
                <input class="addStep" type="button" value="+"/>
                <input type="button" class="minusStep" value="-">                
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
                    <p>Максимальный поток данного графа: "${templateData.fordFulkerson}
                    </p>
                </div>
                <div class="controlPanel">
                    <input type="number" class="textInputGray"/>
                    <input type="button" class="btnGray" value="Сбросить решение"/>
                    <input type="submit" class="btnGray" value="Отправить"/>
                </div>
            </div>
        </div>`;
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
                events[event].push(fn);
            }

        },
        emit: function (event, data = undefined) {
            events[event].map(fn => data ? fn(data) : fn());
        }
    }
}

function App() {
    return {
        state: initState(graph),
        subscriber: subscriber(),
    }
}

function bindActionListeners(appInstance)
{
    document.getElementsByClassName("addStep")[0].addEventListener('click', () => {
        // обновляем стейт приложение
        const state = appInstance.state.updateState((state) => {
            const currentStep = state.currentStep += 1;
            const stepsVariantData = JSON.parse(JSON.stringify(state.stepsVariantData[0]));

            return  {
                ...state,
                currentStep,
                stepsVariantData: [...state.stepsVariantData, stepsVariantData]
            }
        });

        // перересовываем приложение
        appInstance.subscriber.emit('render', state);
    });

    document.getElementsByClassName("minusStep")[0].addEventListener('click', () => {
        // обновляем стейт приложение
        const state = appInstance.state.updateState((state) => {
            const currentStep = state.currentStep -= 1;
            let stepsVariantData = JSON.parse(JSON.stringify(state.stepsVariantData));
            stepsVariantData.pop();

            return  {
                ...state,
                currentStep,
                stepsVariantData: stepsVariantData,
            }
        });

        // перересовываем приложение
        appInstance.subscriber.emit('render', state);
    });
}

function init_lab() {
    return {
        setletiant: function (str) {
        },
        setPreviosSolution: function (str) {
        },
        setMode: function (str) {
        },

        //Инициализация ВЛ
        init: function () {
            // this.div = document.getElementById("jsLab");
            // this.div.innerHTML = this.window;
            // document.getElementById("tool").innerHTML = this.tool;
            //получение варианта задания
            // let ins = document.getElementById("preGeneratedCode").value + " " + document.getElementById("calculatedCode").value +
            //     " " + document.getElementById("previousSolution").value;
            // this.div.innerHTML = window;

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
                bindActionListeners(appInstance);
            };

            appInstance.subscriber.subscribe('render', render);

            // основная функция для рендеринга

            // инициализируем первую отрисовку
            appInstance.subscriber.emit('render', appInstance.state.getState());
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

var Vlab = init_lab();