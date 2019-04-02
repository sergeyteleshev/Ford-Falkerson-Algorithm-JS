import React from 'react';
import '../styles.scss';
import GraphContainer from "../containers/GraphContainer";

export default class MainComponent extends React.Component {
    render()
    {
        return (
            <div>
                MAIN COMPONENT
                <GraphContainer/>
            </div>
        );
    }
}
