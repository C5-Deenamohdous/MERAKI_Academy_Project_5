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

        { x: 0, y: 8 },
        { x: 1, y: 5 },
        { x: 2, y: 4 },
        { x: 3, y: 9 },
        { x: 4, y: 1 },
        { x: 5, y: 7 },
        { x: 6, y: 6 },
        { x: 7, y: 20 },

        
    ];
    const myData = [
        { x: 0, y: 0, label: 'woah!', style: { fontSize: 10 } },
        { x: 1, y: 0, label: 'dope city', yOffset: 5 },
        { x: 0, y: 1, label: 'cool Dog friend', xOffset: 5, rotation: 34 }
    ]
    return (
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
    );

}



