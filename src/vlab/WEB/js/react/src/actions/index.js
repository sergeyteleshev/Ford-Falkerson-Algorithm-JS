export const ADD_TAB = "ADD_TAB";
export const MIN_EDGE_WEIGHT_HANDLE_CHANGE = "MIN_EDGE_WEIGHT_HANDLE_CHANGE";
export const SELECT_NODES = "SELECT_NODES";

export function addTab(graph, currentPath)
{
    console.log("hello", graph, currentPath);

    return {
        type: ADD_TAB,
        payload: true,
    }
}

export function minEdgeWeight(e)
{
    return {
        type: MIN_EDGE_WEIGHT_HANDLE_CHANGE,
        payload: e.target.value,
    }
}

export function selectNodes(selectedNodes) {
    return {
        type: SELECT_NODES,
        payload: selectedNodes,
    }
}
