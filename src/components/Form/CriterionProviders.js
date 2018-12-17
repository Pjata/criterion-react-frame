import React, { PureComponent } from "react"
import { MuiPickersUtilsProvider } from "material-ui-pickers"
import { I18nextProvider } from "react-i18next"
import MomentUtils from "@date-io/moment"

class CriterionProviders extends PureComponent {
  render() {
    const { i18n, children, language = "kplogKPLOG" } = this.props
    return (
      <I18nextProvider i18n={i18n} initialLanguage={language}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          {children}
        </MuiPickersUtilsProvider>
      </I18nextProvider>
    )
  }
}
export default CriterionProviders
