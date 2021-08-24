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
    return yy + "-" + MM + "-" + dd;
};

export const getDateTimeNow = () => {
    let now = new Date();
    let dd = String(now.getDate()).padStart(2, "0");
    let MM = String(now.getMonth() + 1).padStart(2, "0");
    let yy = now.getFullYear();
    let hour = String(now.getHours()).padStart(2, "0");
    let min = String(now.getMinutes()).padStart(2, "0");
    return yy + "-" + MM + "-" + dd + " " + hour + ":" + min;
};

export const getTime = (date) => {
    let newDate = new Date(date);
    let hour = String(newDate.getHours()).padStart(2, "0");
    let min = String(newDate.getMinutes()).padStart(2, "0");
    return hour + ":" + min;
};

export const convertMonthAndDate = (date) => {
    const newDate = new Date(date);
    let month = "";
    switch (newDate.getMonth()) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "Junely";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    }
    return month + " " + newDate.getDate();
};

export const getInterval = (date1, date2) => {
    const newDate1 = new Date(date1);
    const newDate2 = new Date(date2);
    let time = "";
    if (newDate1.getTime() > newDate2.getTime()) {
        time = newDate1.getTime() - newDate2.getTime();
    } else if (newDate1.getTime() < newDate2.getTime()) {
        time = newDate2.getTime() - newDate1.getTime();
    }
    let d = Number(time);
    const h = Math.floor(d / (1000 * 3600));
    const m = Math.floor(d % (1000 * 3600)) / 60;
    const s = Math.floor((d % (1000 * 3600)) % 60);
    let diffTime = h + " giờ " + m + " phút";
    if (m === 0) {
        diffTime = h + " giờ ";
    }
    return diffTime;
};
