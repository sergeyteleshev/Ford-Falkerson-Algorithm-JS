import {connect} from 'react-redux';
import Hello from '../components/helloWorld';
import {testAction} from "../actions/index";

const mapStateToProps = (state) => {
    return {
        test:state.Hello.test
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        testAction:()=>dispatch(testAction())
    }
};

const HelloContainer = connect(mapStateToProps, mapDispatchToProps)(Hello);

export default HelloContainer;