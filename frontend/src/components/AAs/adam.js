import React from 'react'
import 'react-vis/dist/style.css';
import {
    XYPlot, LineSeries, VerticalBarSeries, MarkSeries, LabelSeries,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    AreaSeries
} from 'react-vis';


export default function Adam() {
    
    const data = [

        { x: 0, y: 2 },
        { x: 1, y: 4 },
        { x: 2, y: 6 },
        { x: 3, y: 8 },
        { x: 4, y: 10 },
        { x: 5, y: 12 },
        { x: 6, y: 14 },
        { x: 7, y: 16 },

        
    ];
    const data2 = [

        { x: 0, y: 50 },
        { x: 1, y: 40 },
        { x: 2, y: 60 },
        { x: 3, y: 80 },
        { x: 4, y: 30 },
        { x: 5, y: 20 },
        { x: 6, y: 40 },
        { x: 7, y: 60 },

        
    ];
    const myData = [
        { x: 0, y: 0, label: 'woah!', style: { fontSize: 10 } },
        { x: 1, y: 0, label: 'dope city', yOffset: 5 },
        { x: 0, y: 1, label: 'cool Dog friend', xOffset: 5, rotation: 34 }
    ]
    return (
        <div>
        <div>
            <XYPlot width={300} height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <AreaSeries
                    className="area-series-example"
                    curve="curveNatural"
                    data={data}
                />
            </XYPlot>
        </div>
<div>
            <XYPlot width={300} height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <AreaSeries
                    className="area-series-example"
                    curve="curveNatural"
                    data={myData}
                />
            </XYPlot>
</div>
<div>
            <XYPlot width={300} height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <AreaSeries
                    className="area-series-example"
                    curve="curveNatural"
                    data={data2}
                />
            </XYPlot>
</div>
</div>
    );

}



