import React, { Component } from "react"
import PropTypes from "prop-types"
import { Field, reduxForm } from "redux-form"
import {
  renderDatePicker,
  renderSelectField,
  RenderTextField,
  renderSwitch,
  renderKozremukodo,
  renderCikkNev
} from "./renderers"

const TypeField = ({ type, ...rest }) => {
  switch (type) {
    case "date":
      return <Field {...rest} component={renderDatePicker} />
    case "text":
      return <Field {...rest} component={RenderTextField} />
    case "select":
      return <Field {...rest} component={renderSelectField} />
    case "switch":
      return <Field {...rest} component={renderSwitch} />
    case "kozremukodo":
      return <Field {...rest} component={renderKozremukodo} />
    case "cikkNev":
      return <Field {...rest} component={renderCikkNev} />
    default:
      return <Field {...rest} component={RenderTextField} />
  }
}
export default TypeField
