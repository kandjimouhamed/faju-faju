import toast from "react-hot-toast";

const successMsg = (message) => {
    return toast.success(message, {
        style: {
            backgroundColor: '#4B4453',
            border: '1px solid #713200',
            padding: '0.3rem 1rem',
            color: '#ffffff',
        },
        iconTheme: {
            primary: '#00C9A7',
            secondary: '#FFFAEE',
        },
    });
}

export default successMsg