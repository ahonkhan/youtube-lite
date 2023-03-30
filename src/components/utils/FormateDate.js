export const formateDate = (seconds) => {
    if (seconds) {
        let h = 0, m = 0, s = 0, temp;
        if ((seconds >= 0) && (seconds < 60)) {
            s = seconds;
        } else if ((seconds >= 60) && (seconds < 3600)) {
            m = parseInt(seconds / 60);
            s = parseInt(seconds % 60);
        } else {
            h = parseInt(seconds / 3600)
            seconds = seconds % 3600;
            m = parseInt(seconds / 60);
            s = seconds % 60;
        }
        let plate = `${h === 0 ? '' : h + ':'}${m === 0 ? '00:' : m + ":"}${s === 0 ? '00' : s < 10 ? "0" + s : s}`

        return plate
    }
}