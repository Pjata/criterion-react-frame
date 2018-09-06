import React, { Component } from "react"
import { Button, Paper } from "@material-ui/core"
import { TypeField } from "../index"
import { withFormik } from "formik"
import i18n from "./i18n"
import { I18nextProvider } from "react-i18next"
class App extends Component {
  render() {
    const { handleSubmit, label } = this.props
    return (
      <I18nextProvider i18n={i18n} initialLanguage={"kplogKPLOG"}>
        <Paper
          style={{
            margin: "15px",
            padding: "5px",
            width: "400px"
          }}
        >
          <form onSubmit={handleSubmit}>
            <TypeField name={"teszt"} label={label} />
            <Button type="submit">Submit</Button>
          </form>
        </Paper>
      </I18nextProvider>
    )
  }
}

export default withFormik({
  handleSubmit: (values, { props }) => {
    props.onSubmit(values)
  }
})(App)
