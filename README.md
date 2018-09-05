# criterion-frame

> Internal React frame for projects

[![NPM](https://img.shields.io/npm/v/criterion-frame.svg)](https://www.npmjs.com/package/criterion-frame) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save criterion-frame
```

## Usage

```jsx
import React, { Component } from "react"

import MenuDrawer, { TopBar } from "criterion-frame"
import HomeIcon from "@material-ui/icons/Home"
import FileIcon from "@material-ui/icons/FileCopy"
import TagMultipleIcon from "@material-ui/icons/RemoveRedEye"
const menuConfig = [
  {
    label: "Főoldal",
    icon: <HomeIcon />,
    path: "/app/index"
  },
  {
    label: "Szerződések",
    icon: <FileIcon />,
    path: "/app/szerzodesek"
  },
  {
    label: "Szolgáltatások",
    icon: <TagMultipleIcon />,
    path: "/app/szolgaltatasok"
  }
]
const topBarHeight = 50
const drawerWidth = 200

export default class App extends Component {
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
  }
  onLogout = () => {
    console.log("logout")
  }
  topBarRender = props => (
    <TopBar
      menuOpen={this.state.drawerOpen}
      height={topBarHeight}
      handleMenuOpen={this.handleDrawerOpen}
      title={"Example title"}
      onLogout={this.onLogout}
      userInfo={{
        userName: "test user name"
      }}
    />
  )

  render() {
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
          {content => <div style={content}>adad asdsda Hello world</div>}
        </MenuDrawer>
      </div>
    )
  }
}
```

## License

GPL-3.0 © [Pjata](https://github.com/Pjata)
