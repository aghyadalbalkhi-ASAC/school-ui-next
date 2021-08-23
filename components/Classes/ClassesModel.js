import axios from 'axios';
const CLASSES_LOADED = "CLASSES_LOADED"


export async function getALlClasses(dispatch,schoolId){
    const url = `http://[::1]:3000/schools?filter={%22include%22:[{%22relation%22:%22classEnrollmentRelationals%22,%22scope%22:{%22include%22:[{%22relation%22:%22students%22},{%22relation%22:%22classes%22}]}}]}`

    const pay = await axios.get(url).then(res => {
        console.log(res.data[0].classEnrollmentRelationals);
        dispatch({
            type: CLASSES_LOADED,
            payload: res.data[schoolId.schoolId].classEnrollmentRelationals
        })
    })
  }