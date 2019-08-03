import moment from 'moment'

const DateUtil = {
    // /**
    //  * Make the difference between two timestamps
    //  *
    //  * @param { Number }  timestampStart
    //  * @param { Number }  timestampEnd
    //  * @returns { String } Difference in string format mm:ss
    //  */
    timestampDiff(timestampStart, timestampEnd) {
        const dateStart = moment(new Date(timestampStart), "DD/MM/YYYY HH:mm:ss");
        const dateEnd = moment(new Date(timestampEnd), "DD/MM/YYYY HH:mm:ss");
        const diff = dateEnd.diff(dateStart);
        return moment.utc(diff).format("mm:ss");

    },
    // /**
    //  * Make the difference between two timestamps in minutes
    //  *
    //  * @param { Number }  startTimestamp
    //  * @param { Number }  endTimestamp
    //  * @returns { number } Difference between two timestamps
    //  */
    getTimestampDiffMinutes: (startTimestamp, endTimestamp) => {
        return (((endTimestamp - startTimestamp) / 1000) / 60)
    }
}

export default DateUtil;