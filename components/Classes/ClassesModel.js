import axios from 'axios';
const CLASSES_LOADED = "CLASSES_LOADED"


export async function getALlClasses(dispatch,schoolId){
    console.log(schoolId,"schoolId");
    const schId = schoolId.schoolId+1
    const url = `http://[::1]:3000/schools?filter={%22include%22:[{%22relation%22:%22classEnrollmentRelationals%22,%22scope%22:{%22include%22:[{%22relation%22:%22students%22},{%22relation%22:%22classes%22}]}}]}`

    const pay = await axios.get(url).then(res => {
        const data = res.data.filter(sch=>sch.SchoolID == schId)
        dispatch({
            type: CLASSES_LOADED,
            payload: data[0]?.classEnrollmentRelationals
        })
    })
  }



export async function deleteClass(classId) {
    try {
        const url = `http://[::1]:3000/schools/class-enrollment-relationals/${classId}`
        axios.delete(url);
    } catch (e) {
        return {
            ok:true,
            error:e
        }
    }
}


export async function createClass(payload) {
    const schoolId = +payload.schoolId
    const params = {
        SchoolID: schoolId,
        ClassID: +payload.selectedClass
      }
    try {
        const url = `http://[::1]:3000/schools/${schoolId}/class-enrollment-relationals`
        axios.post(url, params).then(res=>{
            console.log(res);
        }
          )
          
    } catch (e) {
        return {
            ok:true,
            error:e
        }
    }
}

export async function fetchCreateData(dispatch) {
    const classesUrl = `http://[::1]:3000/classes`
    // const classesUrl = `http://[::1]:3000/classes`

    let classes = await axios.get(classesUrl)
    // let classes = await axios.get(classesUrl)
    return classes.data

}