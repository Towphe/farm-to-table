
function PopupNotification(props){
    const message = props.message;
    const status = props.status ?? "info";

    const getMessageColor = (s) => {
        switch (s){
            case "info":
                return "text-gray-700";
            case "success":
                return "text-dark-green";
            case "fail":
                return "text-red-800";
        }
    }

    return <div className={`fixed z-10 bottom-8 right-8 bg-off-white shadow-lg px-6 py-2 text-lg ${getMessageColor(status)}`}>
        {message}
    </div>

}

export default PopupNotification;