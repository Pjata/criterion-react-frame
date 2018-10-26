import React, { PureComponent } from "react"
import MomentUtils from "material-ui-pickers/utils/moment-utils"
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider"
import { I18nextProvider } from "react-i18next"
class CriterionProviders extends PureComponent {
  render() {
    const { i18n, children } = this.props
    return (
      <I18nextProvider i18n={i18n} initialLanguage={"kplogKPLOG"}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          {children}
        </MuiPickersUtilsProvider>
      </I18nextProvider>
    )
  }
}
export default CriterionProviders
