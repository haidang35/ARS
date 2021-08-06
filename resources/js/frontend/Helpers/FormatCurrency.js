
const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
});

export const formatCurrency = (number) => {
    return formatter.format(number);
}

export const formatCash = (str, currency = "") => {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev + currency;
    })
}



