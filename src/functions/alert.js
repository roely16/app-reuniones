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
    async alert_confirm(data){

        const result = await Swal.fire({
            title: data.title,
            text: data.message,
            icon: data.type,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: data.confirm_text,
            cancelButtonText: data.cancel_text
        })
        
        if (result) {

            return result
        }


    },

}

export default fun