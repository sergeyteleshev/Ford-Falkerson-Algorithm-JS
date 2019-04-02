function solveTask1(data)
{
    for(let x = 0; x < data.length; x++)
    {
        let minElement = Number.MAX_VALUE;
        for(let y = 0; y < data.length; y++)
        {
            if(data[y][x] < minElement)
            {
                minElement = data[y][x];
            }

            if(y === data.length - 1)
            {
                data = deductMinFromColumn(data, minElement, x);
            }
        }
    }

    return data;
}

function deductMinFromColumn(data, minEl, column) {

    for(let y = 0; y < data.length; y++)
    {
        data[y][column] -= minEl;
    }

    return data;
}