import resultArray from './Result';

export function check(resultData)
{
    let result = resultArray;

    let flag = true;

    for(let y = 0; y < result.length; y++)
    {
        for(let x = 0; x < result[y].length; x++)
        {
            try
            {
                if(result[y][x] === resultData[y][x] || result[x][y] === resultData[x][y])
                {
                    continue;
                }
                else
                {
                    flag = false;
                    break;
                }

                if(!flag)
                {
                    break;
                }
            }
            catch (e) {
                return false;
            }
        }
    }

    return flag;
}