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

export const compressedResult = "function solveTask1(n){for(let r=0;r<n.length;r++)for(let e=Number.MAX_VALUE,o=0;o<n.length;o++)n[o][r]<e&&(e=n[o][r]),o===n.length-1&&(n=deductMinFromColumn(n,e,r));return n}function deductMinFromColumn(n,r,e){for(let o=0;o<n.length;o++)n[o][e]-=r;return n}";

export default compressedResult;