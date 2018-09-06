import React, { Component } from "react"
import { Button } from "@material-ui/core"
import { TypeField, RenderTextField } from "criterion-frame"
import { withFormik, Field, FastField } from "formik"
import i18n from "./i18n"
import { I18nextProvider } from "react-i18next"
class App extends Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <I18nextProvider i18n={i18n} initialLanguage={"kplogKPLOG"}>
        <form onSubmit={handleSubmit}>
          <TypeField name="lastName" label="hello" />
          <Button type="submit">Submit</Button>
        </form>
      </I18nextProvider>
    )
  }
}

export default withFormik({
  handleSubmit: (values, { props }) => {
    console.log(values)
  }
})(App)
