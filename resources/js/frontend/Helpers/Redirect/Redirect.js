
 export const goTo = (url = "") => {
    url = window.location.origin + "/" + url;
    window.location.replace(url);
}