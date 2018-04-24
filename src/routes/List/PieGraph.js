import React, { PureComponent } from 'react';
import addFunnel from 'highcharts/modules/funnel';
import Highcharts from 'highcharts';

addFunnel(Highcharts);

// let count = 0;
const data = {
  done_num: 500,
  doing_num: 100,
  undo_num: 20,
};

export default class PieGraph extends PureComponent {
  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'problemList/getProgress',
    //   payload: {
    //     user_id: 1,
    //   },
    // });

    this.initPie(data);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps && nextProps.progress) {
  //     if (count === 0) {
  //       const data = nextProps.progress;
  //       this.initPie(data);
  //     }
  //     count++;
  //   }
  // }

  initPie(progress) {
    const chart = {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
    };
    const title = {
      text: '',
    };
    const credits = {
      enabled: false, // 不显示LOGO
    };
    const tooltip = {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    };
    const plotOptions = {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        style: {
          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
        },
      },
    };

    const colors = ['#4EF037', '#FD2E2E', '#58DADA'];
    const series = [
      {
        name: '百分比',
        colorByPoint: true,
        type: 'pie',
        data: [
          ['已做', progress.done_num],
          {
            name: '正做',
            y: progress.doing_num,
            sliced: true,
            selected: true,
          },
          ['待做', progress.undo_num],
        ],
      },
    ];
    const options = {};
    options.chart = chart;
    options.title = title;
    options.credits = credits;
    options.tooltip = tooltip;
    options.colors = colors;
    options.series = series;
    options.plotOptions = plotOptions;
    Highcharts.chart('chart', options);
  }

  render() {
    // const { loading } = this.props;
    return <div id="chart" style={{ height: 300 }} />;
  }
}
