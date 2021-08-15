const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

const formatterUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

export const formatCurrency = (number) => {
    return formatter.format(number);
};

export const formatCurrencyToUSD = (number) => {
    return formatterUSD.format(number);
};

export const formatCash = (str, currency = "") => {
    return str
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ",") + prev + currency;
        });
};
