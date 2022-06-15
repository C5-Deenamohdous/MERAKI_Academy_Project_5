import React from 'react'
import 'react-vis/dist/style.css';
import "./style.css";
import { FcComboChart } from "react-icons/fc";
import {
    XYPlot, LineSeries, VerticalBarSeries, MarkSeries, LabelSeries,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    AreaSeries
} from 'react-vis';


export default function Analysis() {
    
    const Users = [

        { x: 0, y: 2 },
        { x: 1, y: 4 },
        { x: 2, y: 6 },
        { x: 3, y: 8 },
        { x: 4, y: 10 },
        { x: 5, y: 12 },
        { x: 6, y: 14 },
        { x: 7, y: 16 },

        
    ];
    const Products = [

        { x: 0, y: 50 },
        { x: 1, y: 40 },
        { x: 2, y: 60 },
        { x: 3, y: 80 },
        { x: 4, y: 30 },
        { x: 5, y: 20 },
        { x: 6, y: 40 },
        { x: 7, y: 60 },

        
    ];

    const Orders = [

        { x: 0, y: 50 },
        { x: 1, y: 40 },
        { x: 2, y: 60 },
        { x: 3, y: 80 },
        { x: 4, y: 30 },
        { x: 5, y: 20 },
        { x: 6, y: 40 },
        { x: 7, y: 60 },

        
    ];

    return (
        <div className="Analysis">
             <div className="analysisBar">
        <p>
          <FcComboChart /> Analysis
        </p>
      </div>
        <div className="AnalysisForUsers">
            <XYPlot width={300} height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <AreaSeries
                    className="area-series-example"
                    curve="curveNatural"
                    data={Users}
                />
            </XYPlot>
            <p>Analysis For Users</p>
        </div>

<div className="AnalysisForProducts">

            <XYPlot width={300} height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <AreaSeries
                    className="area-series-example"
                    curve="curveNatural"
                    data={Products}
                />
            </XYPlot>
            <p>Analysis For Products</p>

</div>
<div className="AnalysisForOrders">
            <XYPlot width={300} height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <AreaSeries
                    className="area-series-example"
                    curve="curveNatural"
                    data={Orders}
                />
            </XYPlot>
            <p>Analysis For Orders</p>

</div>
</div>
    );

}



