export const dateConvert = (date) => {
    let newDate = new Date(date);
    let dd = String(newDate.getDate()).padStart(2, "0");
    let MM = String(newDate.getMonth() + 1).padStart(2, "0");
    let yy = newDate.getFullYear();
    const dateConvert = dd + "-" + MM + "-" + yy;
    return dateConvert;
};

export const getDayOfWeek = (date) => {
    let newDate = new Date(date);
    let day = "";
    switch (newDate.getDay()) {
        case 0:
            day = "CN";
            break;
        case 1:
            day = "Thứ 2";
            break;
        case 2:
            day = "Thứ 3";
            break;
        case 3:
            day = "Thứ 4";
            break;
        case 4:
            day = "Thứ 5";
            break;
        case 5:
            day = "Thứ 6";
            break;
        case 6:
            day = "Thứ 7";
            break;
        default:
            break;
    }
    return day;
};

export const getDate = (date) => {
    let newDate = new Date(date);
    let dd = String(newDate.getDate()).padStart(2, "0");
    let MM = String(newDate.getMonth() + 1).padStart(2, "0");
    let yy = newDate.getFullYear();
    return yy + "-" + MM + "-" +dd;
}

export const getTime = (date) => {
    let newDate = new Date(date);
    let hour = String(newDate.getHours()).padStart(2, "0");
    let min = String(newDate.getMinutes()).padStart(2, "0");
    return hour + ":" + min;
}
