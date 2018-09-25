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
  item: {}
})
class UserInfo extends PureComponent {
  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.item}>
          {this.props.userInfo.userName}
          <IconButton onClick={this.props.onLogout}>
            <PowerSettingsNew />
          </IconButton>
        </div>
      </div>
    )
  }
}

UserInfo.propTypes = {
  classes: PropTypes.any,
  userInfo: PropTypes.any,
  onLogout: PropTypes.func
}

const enhance = compose(withStyles(style))
export default enhance(UserInfo)
