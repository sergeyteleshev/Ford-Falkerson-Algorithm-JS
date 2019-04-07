export const ADD_TAB = "ADD_TAB";
export const MIN_EDGE_WEIGHT_HANDLE_CHANGE = "MIN_EDGE_WEIGHT_HANDLE_CHANGE";
export const SELECT_NODES = "SELECT_NODES";
export const CHANGE_STEP = "CHANGE_STEP";

export function addTab(data, currentMinWeight, nodesPath)
{
    currentMinWeight = parseInt(currentMinWeight);
    for (let i = 0; i < nodesPath.length - 1; i++)
    {
        data.edges[nodesPath[i]][nodesPath[i+1]] -= currentMinWeight;
        data.edgesBack[nodesPath[i]][nodesPath[i+1]] += currentMinWeight;
    }

    return {
        type: ADD_TAB,
        payload: data,
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

export function changeStep(index)
{
    return {
        type: CHANGE_STEP,
        payload: index,
    }
}
