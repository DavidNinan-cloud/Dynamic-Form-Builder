import  {errorAlert} from '../../Common Components/Toasts/CustomToasts'

export const TestOnline = () => {
    let connection = navigator.online
    console.log("connection",connection)
    if(!connection){
        errorAlert("Please Check Network Connectivity")
    }
}