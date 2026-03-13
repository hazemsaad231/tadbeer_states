import toast from "react-hot-toast";




// Helper to generate a unique id for each message
const getToastId = (message: string) => `toast-${btoa(unescape(encodeURIComponent(message))).replace(/=+$/, '')}`;

const success = (message: string) => {
    toast.success(message, {
        duration: 4000,
        id: getToastId(message),
    });
}

const Error = (message: string) => {
    toast.error(message, {
        duration: 4000,
        id: getToastId(message),
    });
}

const info = (message: string) => {
    toast(message, {
        duration: 4000,
        id: getToastId(message),
    });
}

export { success , Error , info };