import axios from 'axios';
const STUDENTS_LOADED = "STUDENTS_LOADED"


export async function getALlStudents(dispatch, classid) {
    const url = `http://[::1]:3000/students`

    let payload = await axios.get(url).then(res => {
        payload = (res.data).filter(std => std.SchoolClassID === +classid.classid)
        if (!payload.length > 0) {
            payload = null
        }
        dispatch({
            type: STUDENTS_LOADED,
            // payload: res.data[schoolId.schoolId].classEnrollmentRelationals
            payload: payload
        })
    })
}


export async function deleteStudent(studentsId) {
    try {
        const url = `http://[::1]:3000/students/${studentsId}`
        axios.delete(url);
    } catch (e) {
        return {
            ok:true,
            error:e
        }
    }
}


export async function createStudent(payload) {
    const params = {
        StudentFullName: payload.StudentFullName,
        SchoolClassID: payload.selectedclass,
        CreatedBy: +payload.CreatedBy
      }

    try {
        const url = `http://[::1]:3000/students/`
        axios.post(url, params).then(res=>{
            console.log(res);
        })
          
    } catch (e) {
        return {
            ok:true,
            error:e
        }
    }
}

export async function updateStudent(payload) {
    const params = {
        StudentID:payload.StudentID,
        StudentFullName: payload.StudentFullName,
        SchoolClassID: payload.selectedclass,
        CreatedBy: +payload.CreatedBy
      }
      console.log(payload,"update");
    try {
        const url = `http://[::1]:3000/students/${payload.StudentID}`
        axios.patch(url, params).then(res=>{
            console.log(res);
        })
          
    } catch (e) {
        return {
            ok:true,
            error:e
        }
    }
}


export async function fetchCreateData(dispatch) {
    const schoolsUrl = `http://[::1]:3000/schools?filter={%22include%22:[{%22relation%22:%22classEnrollmentRelationals%22,%22scope%22:{%22include%22:[{%22relation%22:%22classes%22}]}}]}`
    // const classesUrl = `http://[::1]:3000/classes`

    let schools = await axios.get(schoolsUrl)
    // let classes = await axios.get(classesUrl)

    return {
        schools:schools.data,
        // classes:classes.data
    }

}
