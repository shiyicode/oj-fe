import React, { PureComponent } from 'react';
import { Card, Tabs } from 'antd';
import addFunnel from 'highcharts/modules/funnel';
import Highcharts from 'highcharts';
import styles from './index.less';

addFunnel(Highcharts);

const { TabPane } = Tabs;

function initLineChart (id, title, name, data) {
  Highcharts.chart(id, {
    chart: {
      type: 'spline',
    },
    title: {
      text: title,
    },
    credits: {
      enabled: false, // 不显示LOGO
    },
    xAxis: {
      categories: data.xData,
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1,
        },
      },
    },
    series: [{
      name,
      marker: {
        symbol: 'square',
      },
      data: data.yData,
    }],
  });
}

function getSubmitSeriesData(data) {
  const categories = [];
  const seriesList = [];
  if (data && data.length > 0) {
    data.forEach(item => {
      categories.push(item.date);
      seriesList.push(item.submit_num);
    });
  }
  return {
    xData: categories,
    yData: seriesList,
  };
}

function getRankSeriesData(data) {
  const categories = [];
  const seriesList = [];
  if (data && data.length > 0) {
    data.forEach(item => {
      categories.push(item.date);
      seriesList.push(item.rank_num);
    });
  }
  return {
    xData: categories,
    yData: seriesList,
  };
}


class UserLine extends PureComponent {

  // constructor(props) {
  //   super(props);
  //   // this.showRankList = this.showRankList.bind(this);
  // }

  componentDidMount () {
    const pane = document.querySelectorAll('.ant-tabs-tabpane')[1];
    const elem = document.createElement('div');
    elem.id = 'chart-line2';
    pane.appendChild(elem);
    if (this.props.submitList) {
      initLineChart('chart-line1', '近30天提交次数变化', '提交次数', getSubmitSeriesData(this.props.submitList));
    }

    if (this.props.rankList) {
      initLineChart('chart-line2', '近30天排名变化', '排名', getRankSeriesData(this.props.rankList));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.submitList) {
      initLineChart('chart-line1', '近30天提交次数变化', '提交次数', getSubmitSeriesData(nextProps.submitList));
    }

    if (nextProps && nextProps.rankList) {
      initLineChart('chart-line2', '近30天排名变化', '排名', getRankSeriesData(nextProps.rankList));
    }
  }

  render () {
    const { loading } = this.props;
    return (
      <Card bordered={false} className={styles['line-chart']} loading={loading}>
        <Tabs>
          <TabPane tab="提交趋势" key="1">
            <div id="chart-line1" />
          </TabPane>
          <TabPane tab="排名趋势" key="2" />
        </Tabs>
      </Card>
    );
  }
}

export default UserLine;
