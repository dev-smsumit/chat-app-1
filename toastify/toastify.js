import { Bounce, toast } from 'react-toastify';

const successToast=(msg="something done", position="top-right", delay=4000)=>{
    toast.success(msg, {
        position: position,
        autoClose: delay,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
}
const infoToast=(msg="some info", position="top-right", delay=4000)=>{
    toast.info(msg, {
        position: position,
        autoClose: delay,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
}
const errorToast=(msg="some error", position="top-right", delay=4000)=>{
    toast.error(msg, {
        position: position,
        autoClose: delay,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
}

export {successToast, infoToast, errorToast}