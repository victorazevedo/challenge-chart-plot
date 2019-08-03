// /**
//  * Chart configuration constants
//  */
export const ChartConstants = {
    chartOption: {

        chart: {
            id: 'chartdata',
            toolbar: {//toolbar icons with className apexcharts-toolbar
                show: true,
            },
            animations: {
                enabled: true,
                easing: 'bounce', // linear, easeout, easein, easeinout, swing, bounce, elastic
                speed: 800,
                animateGradually: {
                    delay: 150,
                    enabled: true
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
        },
        grid: {
            show: true,
            borderColor: '#e6e6e6'// horizontal background lines color
        },
        tooltip: {
            enabled: true,
            followCursor: true
        },
        colors: ['#6dba52', '#26715d', '#8768a3', '#544669', '#7ebfdf', '#3866b1', '#f8cc2d', '#e9a854'],
        maintainAspectRatio: undefined,
        markers: {
            size: 5,
            strokeWidth: 0,
            fillOpacity: 0,
            strokeOpacity: 0,
            hover: {
                size: 6
            }
        },
        yaxis: {
            tickAmount: 5,
            min: 0,
            max: undefined
        },
        stroke: {
            width: 2,
        },
        legend: {
            show: true,
            showForSingleSeries: false,
            floating: false,
            position: 'right', // direction - top, bottom, left, right
            horizontalAlign: 'center', // when position top/bottom specify left, right or center
            verticalAlign: 'middle',
            fontSize: '12px',
            fontFamily: 'Source Sans Pro',
            textAnchor: 'end',
            offsetY: 20,
            offsetX: 0,
            formatter: undefined,
            labels: {
                colors: undefined,
                useSeriesColors: false
            },
            markers: {
                size: 6,
                strokeWidth: 0,
                strokeColor: '#fff',
                offsetX: 0,
                offsetY: 0,
                shape: 'circle',
                radius: 10
            },
            itemMargin: { //distance between itens in legend
                horizontal: 3,
                vertical: 5
            },
            containerMargin: {
                left: 20,
                top: 4,
                right: 0,
                bottom: 0
            },
            onItemClick: {
                toggleDataSeries: true
            },
            onItemHover: {
                highlightDataSeries: true
            }
        }, xaxis: {
            type: 'datetime',//datetime, string, timestamp
            labels: {
                show: true,
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: false,
                showDuplicates: false,
                trim: false,
                minHeight: undefined,
                maxHeight: 120,
                style: {
                    colors: [],
                    fontSize: '12px',
                    fontFamily: 'Source Sans Pro',
                    cssClass: 'apexcharts-xaxis-label',
                },
                offsetX: 0,
                offsetY: 0,
                format: 'timestamp',
                datetimeFormatter: {
                    year: 'yyyy',
                    month: "MMM 'yy",
                    day: 'dd MMM',
                    hour: 'HH:mm',
                },
            },
            tickAmount: 5,//'dataPoints', // tick between xvalues labes
            // tickPlacement: 'between',
            min: undefined,
            max: undefined,
            range: undefined,
            floating: false,
            position: 'bottom',
            title: {
                text: undefined,
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: undefined,
                    fontSize: '12px',
                    fontFamily: 'Source Code Pro',
                    cssClass: 'apexcharts-xaxis-title',
                },
            },
            tooltip: {
                enabled: false
            },
        },
    },
    cardGraphStyle: {
        width: '550px'
    },
    maxDataset: 10000
}

export default ChartConstants;