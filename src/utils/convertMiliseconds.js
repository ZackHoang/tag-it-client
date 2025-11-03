export function convertSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const minutesFormat = minutes < 10 ? '0' + minutes : minutes;
    const secondsRemain = seconds % 60;
    const secondsFormat = secondsRemain < 10 ? '0' + secondsRemain : secondsRemain;
    return `${minutesFormat}:${secondsFormat}`
};