
import axios from 'axios'

var func = {

    async post(data){

        const result = axios.post(process.env.VUE_APP_API_URL + data.url, data.data)
        
        if (result) {

            return result
        }

    },

}

export default func