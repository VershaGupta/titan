import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import _ from "lodash";
import * as React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

export interface LineChartProps {
  className?: string;
  data?: { [domain: string]: any[] };
  xKey: string;
  yKey: string;
  xName?: string;
  yName?: string;
  tooltip?: string;
  processData?: (data: any) => any;
}

class LineChart extends React.Component<LineChartProps> {
  chartid = "chartdiv-" + Date.now();
  chart: am4charts.XYChart | undefined;

  componentDidMount() {
    this.initializeChart();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  componentDidUpdate(pProps: LineChartProps) {
    if (!_.isEqual(pProps.data, this.props.data)) {
      const { data = {}, processData } = this.props;
      if (this.chart && !this.chart.isDisposed()) {
        // Remove all series TODO: Optimize this - remove selective series
        for (let i = 0; i < this.chart.series.length; i++) {
          const series = this.chart.series.removeIndex(i);
          series.dispose();
        }

        this.addSeriesData(data, processData, this.chart);
      } else {
        this.initializeChart();
      }
    }
  }

  // Chart helpers
  initializeChart() {
    const { data, processData } = this.props;

    if (!_.isEmpty(data)) {
      const chart = am4core.create(this.chartid, am4charts.XYChart);
      this.chart = chart;

      // Chart styling
      chart.paddingRight = 20;
      chart.dateFormatter.inputDateFormat = "yyyy-MM-ddTHH:mm:ssZ";
      chart.dateFormatter.dateFormat = "MMM dd";

      // Chart legend
      chart.legend = new am4charts.Legend();
      chart.legend.position = "bottom";
      chart.legend.contentAlign = "left";

      // Chart Axes, Cursor, Scrollbar
      this.addXAxis();
      this.addYAxis();
      this.addScrollbar();
      this.addCursor();

      // Chart Series
      this.addSeriesData(data, processData, chart);

      chart.plotContainer.adapter.add(
        "pixelHeight",
        (value, target) => value + 10
      );
    }
  }

  private addSeriesData(
    data: { [domain: string]: any[] } | undefined,
    processData: ((data: any) => any) | undefined,
    chart: am4charts.XYChart
  ) {
    const { xKey, yKey } = this.props;
    for (let key in data) {
      let seriesData = data[key];
      if (processData) {
        seriesData = processData(data[key]);
      }
      const series = this.addSeries(xKey, yKey, seriesData, key);
      (chart.scrollbarX as any).series.push(series);
    }
  }

  addXAxis() {
    const chart = this.chart;
    const { xName } = this.props;
    if (chart && !chart.isDisposed()) {
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;
      dateAxis.minZoomCount = 5;
      xName &&
        (dateAxis.title.text = `[bold font-size: 13px letter-spacing:1]${xName}`);
      dateAxis.tooltipDateFormat = "hh:mm a, d MMM yyyy";

      // this makes the data to be grouped
      // dateAxis.groupData = true;
      // dateAxis.groupCount = 500;

      return dateAxis;
    }
  }

  addYAxis() {
    const chart = this.chart;
    const { yName } = this.props;

    if (chart && !chart.isDisposed()) {
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.cursorTooltipEnabled = false;
      valueAxis.min = 0;
      valueAxis.maxPrecision = 0;
      yName &&
        (valueAxis.title.text = `[bold font-size: 13px letter-spacing:1]${yName}`);
      return valueAxis;
    }
  }

  addSeries(xKey: string, yKey: string, data: any[], name?: string) {
    const chart = this.chart;
    const { tooltip } = this.props;

    if (chart && !chart.isDisposed()) {
      let series = chart.series.push(new am4charts.LineSeries());
      series.data = data;
      series.dataFields.dateX = xKey;
      series.dataFields.valueY = yKey;

      name && (series.name = name);
      series.legendSettings.valueText = "{valueY}";

      tooltip && (series.tooltipText = tooltip);
      if (series.tooltip) {
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.background.fillOpacity = 0.5;
      }

      // Bullets
      this.addBullets(series);
      return series;
    }
  }

  addBullets(series: am4charts.LineSeries) {
    series.minBulletDistance = 2;
    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");
    bullet.scale = 0.75;

    let bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;
  }

  addCursor() {
    const chart = this.chart;
    if (chart && !chart.isDisposed()) {
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineX.strokeDasharray = "";
      chart.cursor.lineY.disabled = true;
      chart.cursor.lineX.stroke = am4core.color("#ed4134");
    }
  }

  addScrollbar() {
    const chart = this.chart;
    if (chart && !chart.isDisposed()) {
      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.scrollbarChart.seriesContainer.hide();
      scrollbarX.scrollbarChart.bulletsContainer.hide();
      scrollbarX.parent = chart.bottomAxesContainer;
      chart.scrollbarX = scrollbarX;
    }
  }

  render() {
    return !_.isEmpty(this.props.data) ? (
      <div
        id={this.chartid}
        style={{ minHeight: "500px" }}
        className={this.props.className}
      />
    ) : (
      <Segment placeholder>
        <Header icon>
          <Icon name="file pdf outline" />
          No data available to display.
        </Header>
      </Segment>
    );
  }
}

export default LineChart;
