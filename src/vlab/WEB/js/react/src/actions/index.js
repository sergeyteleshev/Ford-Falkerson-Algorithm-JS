export const GO_ANOTHER_TASK = "GO_ANOTHER_TASK";

export function openChosenTaskErrorDialog()
{
    return {
        type: OPEN_CHOSEN_TASK_ERROR_DIALOG,
        payload: true,
    }
}