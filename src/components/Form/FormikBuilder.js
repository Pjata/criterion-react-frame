import React, { Component } from "react"
import PropTypes from "prop-types"
import { FastField, Field } from "formik"
import { compose, mapProps, withProps, renderComponent } from "recompose"
import moment from "moment"
import { omit } from "lodash/fp"
import {
  renderDatePicker,
  renderSelectField,
  RenderTextField,
  renderSwitch,
  renderTimePicker
} from "./renderers"

const nothing = () => {}
const omitProps = keys => mapProps(props => omit(keys, props))
const enhance = compose(
  withProps(props => ({
    input: {
      value: props.field.value,
      onChange: props.readOnly ? nothing : props.field.onChange,
      onBlur: props.field.onBlur,
      name: props.field.name
    },
    name: props.field.name
  })),
  omitProps(["setFieldValue"])
)

const enhanceSetFieldValue = compose(
  withProps(props => {
    return {
      input: {
        value: props.field.value,
        onChange: props.readOnly ? nothing : props.setFieldValue,
        name: props.field.name
      },
      name: props.field.name
    }
  }),
  omitProps(["setFieldValue"])
)
const enhanceDate = compose(
  enhanceSetFieldValue,
  withProps(props => ({
    input: {
      ...props.input,
      value: props.input.value
        ? moment(props.input.value).format("YYYY.MM.DD")
        : ""
    }
  }))
)
const textField = enhance(RenderTextField)
const datePickerField = enhanceSetFieldValue(renderDatePicker)
const selectField = enhanceSetFieldValue(renderSelectField)
const switchField = enhanceSetFieldValue(renderSwitch)
const timePickerField = enhanceSetFieldValue(renderTimePicker)
export const TypeField = ({ type, ...rest }) => {
  switch (type) {
    case "date":
      return (
        <Field
          {...rest}
          component={
            rest.readOnly ? enhanceDate(RenderTextField) : datePickerField
          }
        />
      )
    case "text":
      return <Field {...rest} component={textField} />
    case "select":
      return <Field {...rest} component={selectField} />
    case "switch":
      return <Field {...rest} component={switchField} />
    case "time":
      return <Field {...rest} component={timePickerField} />
    default:
      return <FastField {...rest} component={textField} />
  }
}
export default TypeField
