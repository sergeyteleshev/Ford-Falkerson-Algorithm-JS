export const ADD_TAB = "ADD_TAB";
export const MIN_EDGE_WEIGHT_HANDLE_CHANGE = "MIN_EDGE_WEIGHT_HANDLE_CHANGE";
export const SELECT_NODES = "SELECT_NODES";
export const CHANGE_STEP = "CHANGE_STEP";
export const DELETE_LAST_TAB = "DELETE_LAST_TAB";

export function addTab()
{
    return {
        type: ADD_TAB,
    }
}

export function deleteLastTab()
{
    return {
        type: DELETE_LAST_TAB,
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