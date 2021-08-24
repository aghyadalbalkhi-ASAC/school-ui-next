import axios from 'axios';

export async function deleteSchool(schoolId) {
    try {
        const url = `http://[::1]:3000/schools/${schoolId}`
        axios.delete(url);
    } catch (e) {
        return {
            ok:true,
            error:e
        }
    }
}


export async function createSchool(payload) {
    console.log();
    const params = {
        SchoolName: payload.SchoolName,
        CreatedBy: +payload.CreatedBy
      }
      console.log(params,"params");
    try {
        const url = `http://[::1]:3000/schools/`
        axios.post(url, params).then(res=>{
            console.log("created");
        }
          )
          
    } catch (e) {
        console.log(e);
        return {
            ok:true,
            error:e
        }
    }
}

export async function updateSchool(payload) {

    const params = {
        SchoolID: +payload.SchoolID,
        SchoolName: payload.SchoolName,
        CreatedBy: +payload.CreatedBy
      }
    try {
        const url = `http://[::1]:3000/schools/${+payload.SchoolID}`
        axios.patch(url, params).then(res=>{
            console.log("updateSchool");
        }

          )
          
    } catch (e) {
        return {
            ok:true,
            error:e
        }
    }
}