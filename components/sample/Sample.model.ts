import {
    LOADING
} from "./Sample.actions";

// import {history} from 'react-router-guard';

class SampleModel {
    public static sampleAction(data: any) {
        return {
            type: LOADING,
            payload: data
        }
    }

    public static asyncSampleAction(data: any) {
        return async (dispatch: any, getState: any) => {
            dispatch({
                type: LOADING,
                payload: data
            });


        };
    }
}

export default SampleModel;
