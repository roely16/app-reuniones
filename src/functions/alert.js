import  Swal from 'sweetalert2'

var fun = {
    
    async show_alert(data){

        const result = await Swal.fire({
            title: data.title,
            text: data.message,
            icon: data.type
        })
        
        if (result) {

            return true
        }


    },
    async confirm_alert(){

        

    }

}

export default fun