import React, { Component } from "react"
import { withFormik } from "formik"
import { I18nextProvider } from "react-i18next"
import SetFieldValueContext from "./SetFieldValueContext"
import PropTypes from "prop-types"
import MomentUtils from "material-ui-pickers/utils/moment-utils"
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider"
import validateSchema from "./validateSchema"

/**
 * A container for simpler formik usage. It users render prop.
 */
export class FormikContainerComponent extends Component {
  render() {
    const {
      handleSubmit,
      render,
      setFieldValue,
      i18n,
      values,
      ...rest
    } = this.props
    return (
      <I18nextProvider i18n={i18n} initialLanguage={"kplogKPLOG"}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <SetFieldValueContext.Provider value={{ setFieldValue }}>
            <form onSubmit={handleSubmit}>{render(values)}</form>
          </SetFieldValueContext.Provider>
        </MuiPickersUtilsProvider>
      </I18nextProvider>
    )
  }
}

export default withFormik({
  handleSubmit: (values, { props }) => {
    const { children, schema, ...rest } = values
    props.onSubmit(rest)
  },
  mapPropsToValues: props => {
    return {
      ...props.defaultValues
    }
  },
  validate: validateSchema
})(FormikContainerComponent)
FormikContainerComponent.propTypes = {
  /**
   * Render prop for your fields
   */
  render: PropTypes.func.isRequired,
  /**
   * i18n configuration for localization
   */
  i18n: PropTypes.object.isRequired,
  /**
   * Yup schema for validation
   */
  schema: PropTypes.object,
  /**
   * Error callback on validation
   */
  onError: PropTypes.func
}
