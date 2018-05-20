import React, { PureComponent } from 'react';
import addFunnel from 'highcharts/modules/funnel';
import Highcharts from 'highcharts';

addFunnel(Highcharts);

let count = 0;

export default class PieGraph extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    if (sessionStorage.getItem('userId')) {
      dispatch({
        type: 'problemList/getProgress',
        payload: {
          user_name: sessionStorage.getItem('userName'),
        },
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.progress) {
      if (count === 0) {
        const data = nextProps.progress;
        this.initPie(data);
      }
      count += 1;
    }
  }

  componentWillUnmount() {
    count = 0;
  }

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

    const colors = ['#2EB872', '#E70000', '#58DADA'];
    const series = [
      {
        name: '百分比',
        colorByPoint: true,
        type: 'pie',
        data: [
          ['已做', progress.ac_num],
          {
            name: '正做',
            y: progress.fail_num,
            sliced: true,
            selected: true,
          },
          ['待做', progress.pre_num],
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
    const { progress } = this.props;
    return (
      <div>
        { (!progress || ( progress && !progress.ac_num )) && <span>暂无数据</span>}
        <div id="chart" style={{ height: 300 }} />
      </div>
    );
  }
}
