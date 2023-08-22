export const formatNumber = (num) => {
    const number = Number(num);
    if (number >= 1000000) {
        return (number / 1_000_000).toFixed(1) + 'м';
    } else if (number >= 1_000) {
        return (number / 1_000).toFixed(1) + 'тыс';
    } else {
        return number.toString();
    }
};
export let compare = (a, b) => {
    if (a.level < b.level) {
        return -1;
    }
    if (a.level > b.level) {
        return 1;
    }
    return 0;
};