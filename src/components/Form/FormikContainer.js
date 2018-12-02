import React, { Component } from "react"
import { withFormik } from "formik"
import SetFieldValueContext from "./SetFieldValueContext"
import PropTypes from "prop-types"
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
      validateForm,
      values,
      style,
      submitForm,
      ...rest
    } = this.props
    return (
      <SetFieldValueContext.Provider value={{ setFieldValue }}>
        <form onSubmit={handleSubmit} style={style}>
          {render(values, validateForm, submitForm)}
        </form>
      </SetFieldValueContext.Provider>
    )
  }
}

export default withFormik({
  handleSubmit: (values, { props }) => {
    const { children, schema, ...rest } = values
    props.onSubmit(rest)
  },
  enableReinitialize: true,
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
   * Yup schema for validation
   */
  schema: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Error callback on validation
   */
  onError: PropTypes.func
}
