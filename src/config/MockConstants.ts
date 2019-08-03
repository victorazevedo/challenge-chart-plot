import TimestampConstants from '../config/TimestampConstants';

let t0 = 1519862400000;
const interval = TimestampConstants.minutestamp;//secondstamp//minutestamp//hourstamp
const t1 = t0 + 0 * interval;
const t2 = t0 + 1 * interval;
const t3 = t0 + 10 * interval;

//Mock test data
export const MockConstants = {
    dataTxt: `{"type":"start", "timestamp":1519862400000, "select" :["min_response_time", "max_response_time"], "group": ["os", "browser"]}
    {"type":"span", "timestamp":1519862400000, "begin": 1519862400000, "end": 1519864600000}
    {"type":"data", "timestamp":1519862400000, "os": "linux", "browser": "chrome", "min_response_time":0.1, "max_response_time":1.3 }
    {"type":"data", "timestamp":1519862400000, "os": "mac", "browser": "chrome", "min_response_time":0.2, "max_response_time":1.2 }
    {"type":"data", "timestamp":1519862400000, "os": "mac", "browser": "firefox", "min_response_time":0.3, "max_response_time":1.2 }
    {"type":"data", "timestamp":1519862400000, "os": "linux", "browser": "firefox", "min_response_time":0.1, "max_response_time":1.0 }    
    {"type":"data", "timestamp":1519862460000, "os": "linux", "browser": "chrome", "min_response_time":0.2, "max_response_time":0.9 }
    {"type":"data", "timestamp":1519862460000, "os": "mac", "browser": "chrome", "min_response_time":0.1, "max_response_time":1.0 }
    {"type":"data", "timestamp":1519862460000, "os": "mac", "browser": "firefox", "min_response_time":0.2, "max_response_time":1.1 }
    {"type":"data", "timestamp":1519862460000, "os": "linux", "browser": "firefox", "min_response_time":0.3, "max_response_time":1.4 }
    {"type":"stop", "timestamp":151986460000}
    `,
    invalidDataTxt: `"type":"start, "timestamp":1519862400000, "select" :["min_response_time", "max_response_time"], "group": ["os", "browser"]}
    {"type":"span", "timestamp":1519862400000, "begin": 1519862400000, "end": 1519864600000}
    {"type":"data", "timestamp":1519862400000, "os": "linux", "browser": "chrome", "min_response_time":0.1, "max_response_time":1.3 }
    {"type":"data", "timestamp":1519862400000, "os": "mac", "browser": "chrome", "min_response_time":0.2, "max_response_time":1.2 }
    {"type":"data", "timestamp":1519862400000, "os": "mac", "browser": "firefox", "min_response_time":0.3, "max_response_time":1.2 }
    {"type":"stop", "timestamp":151986460000}
    `,
    chartSeries: [
        {
            name: "Series 1",
            type: 'line',
            data: [
                [t1, 0.1],
                [t2, 0.2],
                [t3, 0.3],
            ]
        },
        {
            name: "Series 2",
            type: 'line',
            data: [
                [t1, 0.5],
                [t2, 0.6],
                [t3, 0.7],
            ]
        }]
}