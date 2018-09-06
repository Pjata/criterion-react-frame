import React, { PureComponent } from "react"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "redux"
import { withFormik } from "formik"
import validateSchema from "../../common/Form/validateSchema"
import * as Yup from "yup"

import AdoszamField from "./AdoszamField"
const styles = theme => ({
  buttonContainer: {
    textAlign: "right",
    marginTop: theme.spacing.unit * 2
  },
  adoSzam: {
    width: "250px"
  },
  adoSzamContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})
class AdoszamForm extends PureComponent {
  render() {
    const { values, classes, setFieldValue, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.adoSzamContainer}>
          <AdoszamField
            autoFocus={true}
            className={classes.adoSzam}
            values={values}
            setFieldValue={setFieldValue}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button type={"button"} onClick={this.props.onClose}>
            Bezárás
          </Button>
          <Button variant="contained" color="primary" type={"submit"}>
            Tovább
          </Button>
        </div>
      </form>
    )
  }
}

const enhance = compose(
  withStyles(styles),
  withFormik({
    validate: validateSchema(
      Yup.object().shape({
        adoSzam: Yup.string()
          .required("Kötelezően kitöltendő!")
          .matches(/^\d{8}-[1-5]-(?:0[2-9]|[13][0-9]|2[02-9]|4[0-4]|51)$/, {
            message: "Hibás formátum! (helyes pl: 12345678-1-12)"
          })
      })
    ),
    // a unique name for the form
    mapPropsToValues: props => ({ ...props.initialValues }),
    handleSubmit: (values, { props, setSubmitting, setErrors }) => {
      console.log(values)
      props.onSubmit(values)
    }
  })
)
export default enhance(AdoszamForm)
