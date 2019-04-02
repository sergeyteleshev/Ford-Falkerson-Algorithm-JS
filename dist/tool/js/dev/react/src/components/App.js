import React from 'react';
import '../styles.scss';
import {Link, Route, Switch} from "react-router-dom";


export default class App extends React.Component {
    render() {
        return  <div>
            <ul>
                <li>
                    <Link to="/">APP</Link>
                </li>
                <li>
                    <Link to="/test">TEST</Link>
                </li>
            </ul>
                <p>Result</p>
                <Switch>
                    <Route exact path="/" render={()=><h2>APP</h2>} />
                    <Route path="/test" render={()=><h2>TEST</h2>}/>
                </Switch>
        </div>
    }
}
