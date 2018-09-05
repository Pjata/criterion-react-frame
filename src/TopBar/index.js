import React, { PureComponent } from "react"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "redux"
import PropTypes from "prop-types"
import IconButton from "@material-ui/core/IconButton"
import UserInfo from "./UserInfo"
import classNames from "classnames"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import MenuIcon from "@material-ui/icons/Menu"
import logo from "./google_logo_132px_height_vertical_white.png"
const style = theme => ({
  root: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    position: "absolute",
    marginTop: "0px",
    marginBottom: "0px"
  },
  header: {
    textAlign: "left",
    padding: "0px !important"
  },
  menuButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    margin: "0px 0px 0px 12px"
  },
  menuOpen: {
    paddingLeft: "10px"
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  logo: {
    height: "80%",
    filter: theme.type !== "dark" ? "invert(1)" : "invert(0)"
  },
  hide: {
    display: "none"
  }
})
class TopBarContainer extends PureComponent {
  render() {
    const { classes, title } = this.props
    console.log(title)
    return (
      <Grid
        container
        spacing={8}
        className={classNames(
          this.props.classes.root,
          this.props.menuOpen && this.props.classes.menuOpen
        )}
        style={{
          height: this.props.height,
          padding: "0px !important",
          margin: "0px"
        }}
      >
        <Grid className={this.props.classes.header} item xs={10}>
          <div
            style={{
              display: "flex",
              height: this.props.height
            }}
          >
            <div
              className={classNames(
                classes.menuButton,
                this.props.menuOpen && classes.hide
              )}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.props.handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <div className={classes.center}>
              <img className={classes.logo} src={logo} />
              <Typography variant={"title"}>{title}</Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.center}>
            <UserInfo
              userInfo={this.props.userInfo}
              onLogout={this.props.onLogout}
            />
          </div>
        </Grid>
      </Grid>
    )
  }
}

TopBarContainer.propTypes = {
  handleMenuOpen: PropTypes.func,
  userInfo: PropTypes.object,
  onLogout: PropTypes.func,
  menuOpen: PropTypes.bool
} /*
const getUserName = state => state.auth.userName
export const getAuthState = createSelector([getUserName], userName => userName)
const mapStateToProps = store => {
  return {
    userName: getAuthState(store)
  }
}
*/
const enhance = compose(withStyles(style))
export default enhance(TopBarContainer)
