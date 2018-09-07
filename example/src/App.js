import React, { Component } from "react"
import { Button, Paper } from "@material-ui/core"
import { TypeField, FormikContainer } from "criterion-frame"
import i18n from "./i18n"
import * as Yup from "yup"
const schema = Yup.object().shape({
  hello: Yup.string().required("Kötelező mező!")
})
class App extends Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <FormikContainer
        onError={console.log}
        onSubmit={console.log}
        i18n={i18n}
        schema={schema}
        render={() => (
          <Paper
            style={{
              margin: "15px",
              padding: "5px",
              width: "400px"
            }}
          >
            <TypeField label={"hello"} name={"hello"} />
            <Button type={"submit"}>Submit</Button>
          </Paper>
        )}
      />
    )
  }
}

export default App
