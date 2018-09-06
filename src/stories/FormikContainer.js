import React, { Component } from "react"
import { Button, Paper } from "@material-ui/core"
import { TypeField } from "../index"
import { withFormik } from "formik"
import i18n from "./i18n"
import { I18nextProvider } from "react-i18next"
import SetFieldValueContext from "../components/Form/SetFieldValueContext"
import MomentUtils from "material-ui-pickers/utils/moment-utils"
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider"

class App extends Component {
  render() {
    const { handleSubmit, children, setFieldValue, ...rest } = this.props
    return (
      <I18nextProvider i18n={i18n} initialLanguage={"kplogKPLOG"}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <SetFieldValueContext.Provider value={{ setFieldValue }}>
            <Paper
              style={{
                margin: "15px",
                padding: "5px",
                width: "400px"
              }}
            >
              <form onSubmit={handleSubmit}>
                {children}
                <Button type="submit">Submit</Button>
              </form>
            </Paper>
          </SetFieldValueContext.Provider>
        </MuiPickersUtilsProvider>
      </I18nextProvider>
    )
  }
}

export default withFormik({
  handleSubmit: (values, { props }) => {
    const { children, ...rest } = values

    props.onSubmit(rest)
  }
})(App)
