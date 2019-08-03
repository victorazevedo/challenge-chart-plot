import { MessageConstants } from '../config/MessageConstants';
import { EventTypeEnum } from '../enum/EventTypeEnum';
import ChartConstants from '../config/ChartConstants';

const StringUtil = {
    // /**
    //  * Convert a string into cammelcase removing slash
    //  * @param { String } str - String to be converted
    //  * @returns { String } String in cammelcase
    //  */
    toCammelCaseSlash(str) {
        return str
            .replace(/[-_]([a-z])/g, (g) => { return " " + g[1] })
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },
    // /**
    //  * Convert a string into cammelcase
    //  *
    //  * @param { String } str - String to be converted
    //  * @returns { String } String in cammelcase
    //  */
    toCammelCase(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    // /**
    //  * Convert a string into an array of JSONs surrinding erros
    //  *
    //  * @param { String } str - String to be converted
    //  * @returns { any } If succefull returns Array<string> if fail returns null
    //  */
    strToJSONArray(str) {
        if (!str) {
            return null;
        }
        let eventsArray: string[] = [];
        str = str.replace(/([a-zA-Z0-9-]+):([a-zA-Z0-9-]+)/g, "\"$1\":\"$2\"");
        let parts = str.split(/\}\s*\{/g);
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i].trim();
            if (part[0] !== '{') part = '{' + part;
            if (part[part.length - 1] !== '}') part += '}';
            let data = "";
            try {
                data = JSON.parse(part);
                eventsArray.push(data);
            } catch (error) {
                return null;
            }
        }
        return eventsArray;
    },
    // /**
    //  * Verify data errors
    //  *
    //  * @param { eventsArray } Array<Object> - Array of datasets
    //  * @returns { output} any - returns a message if has error otherwise null 
    //  */
    verifyDataErrors(eventsArray) {
        let output: any = null;

        if (eventsArray == '') {
            output = MessageConstants.EMPTY_DATA;
            return output;
        }

        //Checking  max data
        if (eventsArray && eventsArray.length > ChartConstants.maxDataset) {
            output = MessageConstants.DATASET_BIG + ChartConstants.maxDataset.toString();
        }

        //Verify if is a valid Array
        if (!eventsArray || !Array.isArray(eventsArray) || !eventsArray[0]) {
            output = MessageConstants.PARSE_ERROR;
            return output;
        }
        const firstElement = eventsArray[0];

        //Checking  domain of 'type' attribute
        if (firstElement && firstElement.type) {
            if (typeof firstElement.type === "string" && !(firstElement.type.toUpperCase() in EventTypeEnum)) {
                output = MessageConstants.EVENT_NOT_MAPPED;
            }
        }

        return output;
    }
}

export default StringUtil;