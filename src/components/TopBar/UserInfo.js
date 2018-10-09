import React, { PureComponent } from "react"
import IconButton from "@material-ui/core/IconButton"
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "redux"
const style = theme => ({
  root: {
    width: "100%",
    textAlign: "right"
  },
  item: {
    display: "flex"
  },
  logout: {
    width: "50px"
  },
  userInfo: {
    flexGrow: 1
  }
})
class UserInfo extends PureComponent {
  render() {
    const { classes, onLogout, userInfo, userInfoRender } = this.props
    const render = userInfoRender ? (
      userInfoRender(userInfo)
    ) : (
      <React.Fragment>{userInfo.userName}</React.Fragment>
    )
    return (
      <div className={classes.root}>
        <div className={classes.item}>
          <div className={classes.userInfo}>{render}</div>
          <div className={classes.logout}>
            <IconButton onClick={onLogout}>
              <PowerSettingsNew />
            </IconButton>
          </div>
        </div>
      </div>
    )
  }
}

UserInfo.propTypes = {
  classes: PropTypes.any,
  userInfo: PropTypes.any,
  onLogout: PropTypes.func,
  userInfoRender: PropTypes.func
}

const enhance = compose(withStyles(style))
export default enhance(UserInfo)
