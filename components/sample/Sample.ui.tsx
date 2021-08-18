import React, {Component} from 'react';
import './Sample.style.css';
import {connect} from "react-redux";
// import {default as SampleModel} from "./Sample.model";
import {
    Typography
} from "antd";

/*const styles: any = (theme: any) => ({
    container: {
        paddingTop: 30
    }
});*/

class SampleUi extends Component<any, any> {

    render() {
        // const {data}: any = this.props;
        return <Typography>
            Welcome to sample page!
        </Typography>;
    }
}

const mapStateToProps = (state: any, ownProps: any) => state.sample || {};

const mapDispatchToProps = (dispatch: any) => ({
    // setPageTitle: () => dispatch(SampleModel.sampleAction('Sample')),
});
export default (
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
    (
        SampleUi
    )
);
