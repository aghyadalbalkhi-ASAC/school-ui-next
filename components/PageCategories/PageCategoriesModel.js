import axios from 'axios';

export async function deletePage(pageId) {
    try {
        const url = `http://[::1]:3000/classes/${+pageId}`
        axios.delete(url);
    } catch (e) {
        return {
            ok:true,
            error:e
        }
    }
}


export async function createPage(payload) {
    const params = {
        ClassName: payload.ClassName,
        CreatedBy: +payload.CreatedBy
      }
      console.log(params,"params");
    try {
        const url = `http://[::1]:3000/classes/`
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

export async function updatePage(payload) {

    const params = {
        ClassID: +payload.ClassID,
        ClassName: payload.ClassName,
        CreatedBy: +payload.CreatedBy
      }
    try {
        const url = `http://[::1]:3000/classes/${+payload.ClassID}`
        axios.patch(url, params).then(res=>{
            console.log("update Class");
        }

          )
          
    } catch (e) {
        return {
            ok:true,
            error:e
        }
    }
}