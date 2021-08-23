import axios from 'axios';
const STUDENTS_LOADED = "STUDENTS_LOADED"


export async function getALlStudents(dispatch,classid){
    console.log(classid.classid,"schoolIdschoolId");
    const url = `http://[::1]:3000/schools?filter={%22include%22:[{%22relation%22:%22classEnrollmentRelationals%22,%22scope%22:{%22include%22:[{%22relation%22:%22students%22},{%22relation%22:%22classes%22}]}}]}`

    const pay = await axios.get(url).then(res => {
        console.log(res.data[0].classEnrollmentRelationals);
        dispatch({
            type: STUDENTS_LOADED,
            // payload: res.data[schoolId.schoolId].classEnrollmentRelationals
            payload: res.data[0]
        })
    })
  }