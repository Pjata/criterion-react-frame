import React, { Component } from "react"
import PropTypes from "prop-types"
import MenuDrawer from "./MenuDrawer"
import TopBar from "./TopBar"
const topBarHeight = 50
const drawerWidth = 200

/**
 * The frame of a Criterion webapp. It comes in a uncontrolled and controlled mode.
 * The default is uncontrolled. It includes a topbar with logout callback and userInfo and
 * a menu, that you can config with the MenuConfig prop.
 * On a menu select it calls the onItemSelected callback.
 */
export default class CriterionFrame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpen: false,
      selectedIndex: 0
    }
  }

  handleDrawerClose = () => {
    this.setState({
      drawerOpen: false
    })
  }
  handleDrawerOpen = () => {
    this.setState({
      drawerOpen: true
    })
  }
  select = (item, index) => {
    this.setState({
      selectedIndex: index
    })
    this.props.onItemSelected(item, index)
  }
  onLogout = () => {
    this.props.onLogout()
  }
  topBarRender = props => (
    <TopBar
      menuOpen={this.state.drawerOpen}
      height={topBarHeight}
      handleMenuOpen={this.handleDrawerOpen}
      title={this.props.title}
      onLogout={this.onLogout}
      userInfoRender={this.props.userInfoRender}
      userInfo={this.props.userInfo}
    />
  )

  render() {
    const { menuConfig, children, style, selectedIndex } = this.props
    return (
      <div style={{ ...style }}>
        <MenuDrawer
          items={menuConfig}
          open={this.state.drawerOpen}
          onClose={this.handleDrawerClose}
          menuWidth={drawerWidth}
          topBarHeight={topBarHeight}
          handleOpen={this.handleDrawerOpen}
          onItemSelected={this.select}
          selectedIndex={
            selectedIndex ? selectedIndex : this.state.selectedIndex
          }
          topBarRender={this.topBarRender}
        >
          {content => <div style={content}>{children}</div>}
        </MenuDrawer>
      </div>
    )
  }
}

CriterionFrame.propTypes = {
  /**
   * The callback function for the logout button click
   */
  onLogout: PropTypes.func.isRequired,
  /**
   * The title that the frame displays in the TopBar
   */
  title: PropTypes.string,
  /**
   * UserInfo object. It must contain a userName field
   */
  userInfo: PropTypes.object.isRequired,
  /**
   * userInfoRender func. Optional to render userInfo
   */
  userInfoRender: PropTypes.func,
  /**
   * Array of menu config items. It must contain fieldsÉlabel, icon, path
   */
  menuConfig: PropTypes.array.isRequired,
  /**
   * The callback is called when a menu item is selected from the menu
   */
  onItemSelected: PropTypes.func.isRequired,
  /**
   * If set the component is in controlled mode. You must handle the correct selectIndex value.
   */
  selectedIndex: PropTypes.number,
  /**
   * The children to be rendered as content
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional param for styling the container div
   */
  style: PropTypes.object
}
