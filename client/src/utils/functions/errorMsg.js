import toast from "react-hot-toast";

const errorMsg = (message) => {
    return toast.success(message, {
        style: {
            backgroundColor: '#4B4453',
            border: '1px solid #713200',
            padding: '0.3rem 1rem',
            color: '#ffffff',
        },
        iconTheme: {
            primary: 'red',
            secondary: '#FFFAEE',
        },
    });
}

export default errorMsg