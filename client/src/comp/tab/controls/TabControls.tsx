import React from 'react';
import { connect } from 'react-redux';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

interface TabControlsProps {
  focusedLine: number;
  focusedMeasure: number;
  numMeasures: number;
  focusMeasure(line: number): void;
  toggleFretboard(): void;
}

interface TabControlsState {}

class TabControls extends React.Component<TabControlsProps, TabControlsState> {
  focusNextMeasure = (e: React.SyntheticEvent<any>): void => {
    const { focusedMeasure, numMeasures, focusMeasure } = this.props;
    focusMeasure(Math.min(focusedMeasure + 1, numMeasures));
  }

  focusPrevMeasure = (e: React.SyntheticEvent<any>): void => {
    const { focusedMeasure, focusMeasure } = this.props;
    focusMeasure(Math.max(focusedMeasure - 1, 0));
  }

  render(): JSX.Element {
    const { toggleFretboard } = this.props;

    return (
      <div className="TabControls">
        <Row type="flex" align="middle" justify="center">
          <Col className="TabControls__nav" span={4}>
            <div onClick={this.focusPrevMeasure}>
              <Row type="flex" align="middle" justify="center">
                <Icon type="left-circle-o" />
              </Row>
            </div>
          </Col>
          <Col className="TabControls__nav" span={4}>
            <div>
              <Row type="flex" align="middle" justify="center">
                <Icon type="left-square-o" />
              </Row>
            </div>
          </Col>
          <Col className="TabControls__nav" span={8}>
            <div onClick={toggleFretboard}>
              <Row type="flex" align="middle" justify="center">
                <Icon type="database" />
              </Row>
            </div>
          </Col>
          <Col className="TabControls__nav" span={4}>
            <div>
              <Row type="flex" align="middle" justify="center">
                <Icon type="right-square-o" />
              </Row>
            </div>
          </Col>
          <Col className="TabControls__nav" span={4}>
            <div onClick={this.focusNextMeasure}>
              <Row type="flex" align="middle" justify="center">
                <Icon type="right-circle-o" />
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

import { focusMeasure } from 'data/tab/actions';
import { togglePanel } from 'data/panels/actions';

const mapStateToProps = state => ({
  focusedLine: state.tab.focusedLine,
  focusedMeasure: state.tab.focusedMeasure,
  numMeasures: state.tab.numMeasures
});

const mapDispatchToProps = dispatch => ({
  focusMeasure: (measure: number) => dispatch(focusMeasure(measure)),
  toggleFretboard: () => dispatch(togglePanel('fretboard'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabControls);
