import React, { Component } from "react"
import PropTypes from "prop-types"
import { MenuDrawer, TopBar } from "../index"
const topBarHeight = 50
const drawerWidth = 200

export default class CriterionFrame extends Component {
  state = {
    drawerOpen: false,
    selectedIndex: 0
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
    this.props.onItemSelected(item)
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
      userInfo={this.props.userInfo}
    />
  )

  render() {
    const { menuConfig, children } = this.props
    return (
      <div>
        <MenuDrawer
          items={menuConfig}
          open={this.state.drawerOpen}
          onClose={this.handleDrawerClose}
          menuWidth={drawerWidth}
          topBarHeight={topBarHeight}
          handleOpen={this.handleDrawerOpen}
          onItemSelected={this.select}
          selectedIndex={this.state.selectedIndex}
          topBarRender={this.topBarRender}
        >
          {content => <div style={content}>{children}</div>}
        </MenuDrawer>
      </div>
    )
  }
}

CriterionFrame.propTypes = {
  onLogout: PropTypes.func,
  title: PropTypes.string,
  userInfo: PropTypes.object,
  menuConfig: PropTypes.array,
  onItemSelected: PropTypes.func,
  children: PropTypes.array
}
