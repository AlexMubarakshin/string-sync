import React from 'react';
import { connect } from 'react-redux';

import AppLayout from './layout';
import DesktopNav from 'comp/desktop/nav';
import Gradient from 'comp/gradient';
import Icon from 'antd/lib/icon';
import Layout from 'antd/lib/layout';
import LocaleProvider from 'antd/lib/locale-provider';
import MobileNav from 'comp/mobile/nav';
import enUS from 'antd/lib/locale-provider/en_US.js';

import { Device } from 'types/device';
import { Location } from 'types/location';
import { add, remove } from 'eventlistener';
import { debounce } from 'lodash';

const { Header, Content, Footer } = Layout;

interface AppProps {
  children: React.ReactChildren;
  location: Location;
  device: Device;
  queryDevice(): void;
  updateViewport(): void;
}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  maybeUpdateViewport: Function;

  constructor(props: AppProps) {
    super(props);

    this.maybeUpdateViewport = debounce(this._maybeUpdateViewport, 300, { maxWait: 600 });
  }
  componentWillMount(): void {
    const { queryDevice, updateViewport } = this.props;

    queryDevice();
    updateViewport();
  }

  componentDidMount(): void {
    add(window, 'resize', this.maybeUpdateViewport);
  }

  componentWillUnmount(): void {
    remove(window, 'resize', this.maybeUpdateViewport);
  }

  render(): JSX.Element {
    const { location, children, device } = this.props;

    return (
      <div>
        <Gradient />
        <LocaleProvider locale={enUS}>
          <AppLayout location={location} device={device} >
            {children}
          </AppLayout>
        </LocaleProvider>
      </div>
    );
  }

  private _maybeUpdateViewport = (e: Event): void => {
    // For some reason, certain scrolling actions trigger a window resize event
    // on the Chrome browser on the iPhone 6. Therefore, avoid rerendering the
    // screen if a touch device is detected.
    if (this.props.device.isTouch) {
      return;
    }

    this.props.updateViewport();
  }
}

import { queryDevice, updateViewport } from 'data/device/actions';

const mapStateToProps = state => ({
  device: state.device,
});

const mapDispatchToProps = dispatch => ({
  queryDevice: () => dispatch(queryDevice()),
  updateViewport: () => dispatch(updateViewport())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
