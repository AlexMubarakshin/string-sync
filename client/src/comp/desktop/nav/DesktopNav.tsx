import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Logo from 'comp/logo';
import Menu from 'antd/lib/menu';
import Row from 'antd/lib/row';

import { ClickParam } from 'antd/lib/menu';
import { Location } from 'types/location';
import { invert } from 'lodash';

const { Item } = Menu;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

interface DesktopNavProps {
  location: Location;
  isLoggedIn: boolean;
  logout(): void;
}

interface DesktopNavState {
  current: string;
}

enum NavKeys {
  SEARCH = 'SEARCH',
  HOME   = 'HOME',
  LOGIN  = 'LOGIN'
}

class DesktopNav extends React.Component<DesktopNavProps, DesktopNavState> {
  static NAV_KEYS_BY_LOCATION: object = {
    '/'       : NavKeys.HOME,
    '/login'  : NavKeys.LOGIN,
    '/search' : NavKeys.SEARCH,
  };

  componentWillMount(): void {
    this.setState({ current: DesktopNav.NAV_KEYS_BY_LOCATION[this.props.location.pathname] });
  }

  componentWillReceiveProps(nextProps: DesktopNavProps, nextState: DesktopNavState): void {
    this.setState({ current: DesktopNav.NAV_KEYS_BY_LOCATION[nextProps.location.pathname] });
  }

  goTo = (params: ClickParam): void => {
    const location = invert(DesktopNav.NAV_KEYS_BY_LOCATION)[params.key];
    browserHistory.push(location);
  }

  logout = (e: React.SyntheticEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    this.props.logout();
    browserHistory.push('/');
  }

  render(): JSX.Element {
    const { isLoggedIn } = this.props;

    return (
      <nav className="Nav--desktop">
        <Row type="flex" justify="space-between" align="middle">
          <Col xs={0} sm={0} md={8} lg={8}>
            <Logo showLogo={true} />
          </Col>
          <Col xs={0} sm={0} md={6} lg={6} push={1}>
            <Menu
              selectedKeys={[this.state.current]}
              mode="horizontal"
              style={{ fontSize: '18px', borderBottom: '0', background: 'none' }}
              onClick={this.goTo}
            >
              <Item key={NavKeys.SEARCH} className="Nav--desktop__menuItem">
                <Icon type="search" />
              </Item>
              <Item key={NavKeys.HOME} className="Nav--desktop__menuItem">
                <Icon type="home" />
              </Item>
              {
                isLoggedIn ?
                <SubMenu title={<Icon type="setting" />} className="Nav--desktop__menuItem">
                  <Item>
                    <Link to="upload">
                      <Icon type="upload" />
                      <span>upload</span>
                    </Link>
                  </Item>
                  <Item>
                    <div onClick={this.logout}>
                      <Icon type="logout" />
                      <span>logout</span>
                    </div>
                  </Item>
                </SubMenu> :
                <Item key={NavKeys.LOGIN} className="Nav--desktop__menuItem">
                  <Icon type="user" />
                </Item>
              }
            </Menu>
          </Col>
        </Row>
      </nav>
    );
  }
}

import { logout } from 'data/session/actions';

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.session.currentUser.id)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopNav);
