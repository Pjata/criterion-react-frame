import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { compose } from "redux"
import Drawer from "@material-ui/core/Drawer"
import { Divider, List } from "@material-ui/core"
import classNames from "classnames"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import { withStyles, withTheme } from "@material-ui/core/styles"
import grey from "@material-ui/core/colors/grey"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import posed, { PoseGroup } from "react-pose"
const TopBar = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 0,
    transition: {
      default: { duration: 150 }
    }
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: { duration: 150 }
  }
})
const Menu = posed.div({
  enter: {
    x: 0,
    opacity: 1,
    delay: 150,
    transition: {
      default: { duration: 150 }
    }
  },
  exit: {
    x: -50,
    opacity: 0,
    transition: { duration: 150 }
  }
})
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    zIndex: 1,
    flexGrow: 1,
    height: "100%",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: "100%",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  testPaper: { backgroundColor: "#ffeb38" },
  drawerPaper: {
    height: "100%",
    position: "relative",
    whiteSpace: "nowrap",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    height: "100%",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    minHeight: "0px !important"
  },
  blurred: {
    filter: "blur(1.5rem)"
  },
  selectedMenu: {
    background: grey[600]
  }
})
class MenuDrawer extends PureComponent {
  state = {
    isVisible: false
  }
  componentDidMount() {
    this.setState({
      isVisible: true
    })
  }
  goToPage = ({ item, index }) => event => {
    this.props.onItemSelected(item, index)
  }
  generateMenuItems = items =>
    items.map((item, index) => (
      <div key={index}>
        <ListItem
          button
          onClick={this.goToPage({ index, item })}
          className={classNames({
            [this.props.classes.selectedMenu]:
              this.props.selectedIndex === index
          })}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      </div>
    ))

  render() {
    const {
      open,
      classes,
      onClose,
      topBarHeight,
      theme,
      menuWidth,
      items,
      topBarRender,
      test,
      rootStyle
    } = this.props
    const contentStyle = {
      padding: theme.spacing.unit * 3,
      marginTop: topBarHeight,
      flexGrow: 1,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
    const appbarStyle = open
      ? { marginLeft: menuWidth, width: `calc(100% - ${menuWidth}px)` }
      : {}
    const drawerPaperStyle = open ? { width: menuWidth } : {}
    const { isVisible } = this.state
    return (
      <div className={classes.appFrame} style={{ ...rootStyle }}>
        <PoseGroup>
          {isVisible && [
            <TopBar
              key={"topbar"}
              className={classNames(classes.appBar, {
                [classes.appBarShift]: open
              })}
              style={{
                position: "absolute",
                ...appbarStyle
              }}
            >
              {topBarRender()}
            </TopBar>,
            <Menu key={"drawer"} style={{ height: "100%" }}>
              <Drawer
                variant="permanent"
                open={open}
                classes={{
                  paper: classNames(
                    classes.drawerPaper,
                    !open && classes.drawerPaperClose,
                    { [classes.testPaper]: test }
                  )
                }}
                PaperProps={{
                  style: drawerPaperStyle
                }}
                style={{
                  height: "100%"
                }}
              >
                <div
                  className={classes.drawerHeader}
                  style={{
                    height: topBarHeight
                  }}
                >
                  <IconButton onClick={onClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                  <Divider />
                </div>
                <div>
                  <List>{this.generateMenuItems(items)}</List>
                </div>
              </Drawer>
            </Menu>,
            <div key={"content"} style={{ width: "100%" }}>
              {this.props.children(contentStyle)}
            </div>
          ]}
        </PoseGroup>
      </div>
    )
  }
}

const enhance = compose(withStyles(styles), withTheme())

MenuDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  menuWidth: PropTypes.number.isRequired,
  topBarHeight: PropTypes.number,
  items: PropTypes.array.isRequired,
  topBarRender: PropTypes.func,
  onItemSelected: PropTypes.func,
  selectedIndex: PropTypes.number,
  children: PropTypes.func,
  theme: PropTypes.any,
  classes: PropTypes.any,
  rootStyle: PropTypes.any
}

export default enhance(MenuDrawer)
