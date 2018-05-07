import React, { PureComponent } from 'react';
import { Card } from 'antd';
import addFunnel from 'highcharts/modules/funnel';
import Highcharts from 'highcharts';
import styles from './index.less';

addFunnel(Highcharts);

export default class UserPie extends PureComponent {

  componentDidMount() {
    if (this.props.count) {
      this.initPie(this.props.count);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps && nextProps.count) {
      this.initPie(nextProps.count);
    }
  }

  initPie (count) {
    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },
      credits: {
        enabled: false, // 不显示LOGO
      },
      title: {
        text: '代码运行情况',
      },
      tooltip: {
        headerFormat: '{series.name}<br>',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [{
        type: 'pie',
        name: '代码运行情况百分比',
        data: [
          ['RuntimeError', count.re_num],
          ['SystemError', count.se_num],
          {
            name: 'Accepted',
            y: count.ac_num,
            sliced: true,
            selected: true,
          },
          ['OutputLimitExceeded',   count.oe_num],
          ['MemoryLimitExceeded',     count.me_num],
          ['WrongAnswer',       count.wa_num],
          ['CompilationError', count.ce_num],
          ['TimeLimitExceeded',    count.te_num],
        ],
      }],
    };
    Highcharts.chart('chart-pie', options);
  }


  render () {
    const { loading } = this.props;
    return (
      <Card bordered={false} className={styles['info-pie']} loading={loading}>
        <div id="chart-pie" style={{width: 400}} />
      </Card>
    );
  }
}
