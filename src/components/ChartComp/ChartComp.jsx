//libraries
import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { ClipLoader } from 'react-spinners';

//components
import DragBtn from '../DragBtn/DragBtn'
import HeaderComp from '../HeaderComp/HeaderComp'

//util
import DateUtil from '../../util/DateUtil'
import StringUtil from '../../util/StringUtil'

//styles
import './ChartComp.css';

//enums
import { EventTypeEnum } from '../../enum/EventTypeEnum';
import { MsgTypeEnum } from '../../enum/MsgTypeEnum';

//constants
import ChartConstants from '../../config/ChartConstants';
import { MessageConstants } from '../../config/MessageConstants';

class ChartComp extends Component {

    constructor(props) {
        super(props);

        this.group = [];
        this.select = [];

        this.state = {
            dataTxt: '',
            chartSeries: [],
            chartOption: ChartConstants.chartOption,
            cardGraphStyle: ChartConstants.cardGraphStyle,
            initialTimestamp: 0,
            loading: false,
            txtHeader: 'Victor´s Challenge'
        }
        this.state.chartOption.xaxis.labels.formatter = this.formatter;

        //Event Bindings
        this.generateChart = this.generateChart.bind(this);
    }

    // /**
    //  * Allows to apply a custom formatter function to xaxis labels timestamp
    //  *
    //  * @param { String } value - The default value generated
    //  * @param { Number } timestamp - In a datetime series, this is the raw timestamp 
    //  * @param { Number } index of the tick - currently executing iteration in xaxis labels array
    //  * @returns { String } date difference between initial timestamp and current timestamp
    //  */
    formatter = (value, timestamp, index) => {
        return DateUtil.timestampDiff(this.state.initialTimestamp, timestamp);
    };

    // /**
    //  * Generates the graph based on user input data
    //  * @returns { void }
    //  */
    generateChart = () => {
        this.setState({ loading: true });
        const dateTxt = this.state.dataTxt.trim();
        
        //Verification of empty data        
        if (!this.state.dataTxt || dateTxt == "") {
            this.showMsg(MessageConstants.EMPTY_DATA, MsgTypeEnum.ERROR);
            return;
        }

        let eventsArray = StringUtil.strToJSONArray(dateTxt);

        const error = StringUtil.verifyDataErrors(eventsArray);
        if (error) {
            this.showMsg(error, MsgTypeEnum.ERROR);
            return;
        }

        let eventsUniqueObj = {};
        let timestampIgnore = { begin: null, end: null };

        //iterate over events inputed by user to create the dataset series
        for (let index = 0; index < eventsArray.length; index++) {
            const eventData = eventsArray[index];
            // Validation of mandatory fields 'type' and 'timestamp' for each JSON of dataset
            if (!eventData.type) {
                this.showMsg(MessageConstants.MISSING_TYPE_INDEX + (index + 1), MsgTypeEnum.WARNING);
                break;
            };
            if (!eventData.timestamp) {
                this.showMsg(MessageConstants.MISSING_TIMESTAMP_INDEX + (index + 1), MsgTypeEnum.WARNING);
                break;
            };

            // Verfy the 'type' of event 
            switch (eventData.type) {
                case (EventTypeEnum.START): {
                    this.clearGraph();
                    this.group = eventData.group
                    this.select = eventData.select
                    this.setState({ initialTimestamp: eventData.timestamp });
                }
                    break;
                case EventTypeEnum.DATA:
                    {
                        //Verify group array to define strings for unique elements
                        let strUniqueElementGroup = "";
                        if(!this.group || !this.select){
                            this.showMsg(MessageConstants.GROUP_SELECT, MsgTypeEnum.WARNING);
                            break;
                        }
                        for (let idxGroup = 0; idxGroup < this.group.length; idxGroup++) {
                            const groupElement = this.group[idxGroup];//i.e.: 'os', 'browser'
                            strUniqueElementGroup += " " + StringUtil.toCammelCase(eventData[groupElement])//i.e.:  linux chrome'
                        }

                        //Verify select array to define strings and values for unique elements datasets
                        for (let idxSelect = 0; idxSelect < this.select.length; idxSelect++) {
                            let strUniqueElementSelec = "";
                            const selectElement = this.select[idxSelect]; //i.e.: 'min_response_time', 'max_response_time'
                            strUniqueElementSelec += strUniqueElementGroup + " " + selectElement;//i.e.: 'linux chrome min_response_time'
                            let valueSelect = eventData[selectElement];//i.e.: 0.1,1.3

                            //Span Control timestamp range
                            if ((timestampIgnore.begin <= eventData.timestamp && timestampIgnore.end >= eventData.timestamp) ||
                                !timestampIgnore.begin || timestampIgnore.end
                            ) {
                                //Populating eventsUniqueObj with dataset from eventData 
                                if (!eventsUniqueObj[strUniqueElementSelec]) {
                                    eventsUniqueObj[strUniqueElementSelec] = [[eventData.timestamp, valueSelect]];
                                } else {
                                    eventsUniqueObj[strUniqueElementSelec].push([eventData.timestamp, valueSelect]);
                                }
                            }
                        }
                    }
                    break;
                case EventTypeEnum.SPAN: {
                    //Span Event range begin delimiter 
                    if (eventData.begin) {
                        timestampIgnore.begin = eventData.begin
                    }
                    //Span Event range end delimiter
                    if (eventData.end) {
                        timestampIgnore.end = eventData.end;
                    }

                }
                    break;
                case EventTypeEnum.STOP: {
                    timestampIgnore = { begin: null, end: null };
                }
                    break;
                default:
                    this.showMsg(MessageConstants.EVENT_NOT_MAPPED, MsgTypeEnum.WARNING);
                    break;
            }
        }

        // Creating dataset chartSeries based on the eventsUniqueObj
        for (const prop in eventsUniqueObj) {
            if (eventsUniqueObj.hasOwnProperty(prop)) {
                const newSerie = {
                    name: StringUtil.toCammelCaseSlash(prop.trim()),
                    type: 'line',
                    data: eventsUniqueObj[prop]
                };
                this.setState(prevState => ({
                    chartSeries: [...prevState.chartSeries, newSerie]
                }))
            }
        }
        this.setState({ loading: false });
    }

    // /**
    //  * Show a toast message to user
    //  *
    //  * @param { String } msg - Message to show in toast
    //  * @param { MsgTypeEnum } msgTypeEnum - Indicates a succesful, info, warning or error message
    //  */
    showMsg(msg, msgTypeEnum) {
        this.setState({ loading: false });
        ToastsStore[msgTypeEnum](msg, 8000);
    }

    // /**
    //  * Clear graph variables
    //  * @returns { void }
    //  */
    clearGraph() {
        this.setState({ initialTimestamp: 0, chartSeries: [] });
    }

    // /**
    //  * Change event of textarea to get user data input
    //  * @param { Object } event - Object with events attributes
    //  * @returns { void }
    //  */
    onChangeText = (event) => {
        this.setState({
            dataTxt: event.target.value
        });
    }

    // /**
    //  * Render the graph view
    //  */
    render() {
        return (
            <div className="cont-graph">
                <HeaderComp
                    txtHeader={this.state.txtHeader}
                ></HeaderComp>
                <div className="card-data">
                    <textarea className="txt-data" rows="100" cols="40" value={this.state.dataTxt} onChange={this.onChangeText}></textarea>
                    <DragBtn></DragBtn>
                </div>
                <div className="chart-container">
                    <div className="chart-card" style={this.state.cardGraphStyle}>
                        <Chart options={this.state.chartOption} series={this.state.chartSeries} />
                    </div>
                </div>
                <div className="footer-app">
                    <button onClick={this.generateChart} className="btn-generate btn-primary ripple">Generate Chart</button>
                </div>
                <ToastsContainer store={ToastsStore} />
                <div className='sweet-loading'>
                    <ClipLoader sizeUnit={"px"} size={80} color={'#123abc'} loading={this.state.loading} />
                </div>
            </div >
        );
    }
}

export default ChartComp;
