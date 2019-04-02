import React from 'react';
import '../styles.scss';
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';

export default class GraphComponent extends React.Component {
    getNodesObject(nodes, providers)
    {
        let nodesObject = [];

        for (let i = 0; i < nodes.length; i++)
        {
            nodesObject.push({
                id: "n" + i, label: nodes[i],
                color: '#E91E63',
                x: i,
                y: 0,
            });
        }

        for (let i = nodes.length; i < nodes.length + providers.length; i++)
        {
            nodesObject.push({
                id: "n" + i, label: providers[i - nodes.length],
                color: '#4DD0E1',
                x: i - 8,
                y: 4
            });
        }

        return nodesObject;
    }

    //todo разобраться с рендером, когда подсвечиваются рёбра
    getEdgesObject(nodes, providers, ribsTable)
    {
        let edgesObject = [];

        for(let i = 0; i < ribsTable.length; i++)
        {
            for(let j = 0; j < ribsTable[i].length; j++)
            {
                if(!isNaN(parseFloat(ribsTable[i][j])) && isFinite(ribsTable[i][j])) // isNumeric?
                {
                    let color;

                    if(this.props.highlightedData && Array.isArray(this.props.highlightedData))
                    {
                        if(this.props.highlightedData[i][j] === 1)
                        {
                            color = "#000";
                        }
                        else
                        {
                            color = "#CACBD5";
                        }
                    }
                    else
                    {
                        color = "#CACBD5";
                    }

                    edgesObject.push({
                        id: "e" + (edgesObject.length + 1),
                        source: "n" + j,
                        target: "n" + (nodes.length + i),
                        color: color,
                    });
                }
            }
        }

        return edgesObject;
    }

    render()
    {
        if(this.props.nodes && this.props.providers && this.props.ribsTable)
        {
            try
            {
                return (
                    <div style={{background: '#EEEEEE', marginTop: '20px'}}>
                        <Sigma
                            graph={{
                                nodes: this.getNodesObject(this.props.nodes, this.props.providers),
                                edges: this.getEdgesObject(this.props.nodes, this.props.providers, this.props.ribsTable)
                            }}
                            settings={{
                                drawEdges: true,
                                font: 'Helvetica',
                            }}>
                            <RelativeSize initialSize={15}/>
                            {/*<RandomizeNodePositions/>*/}
                        </Sigma>
                    </div>
                );
            }
            catch (e)
            {
                console.log(e);
                return <div className="givenRebraTable"><h3>Ошибка исходных данных</h3></div>;
            }
        }
        else
        {
            return <div className="givenRebraTable"><h3>Ошибка исходных данных</h3></div>;
        }
    }
}
