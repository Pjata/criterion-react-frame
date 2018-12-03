import React, { Component, PureComponent } from "react"
import PropTypes from "prop-types"
import { FastField, Field } from "formik"
import { compose, mapProps, withProps } from "recompose"
import moment from "moment"
import { omit } from "lodash/fp"
import {
  renderDatePicker,
  renderSelectField,
  RenderTextField,
  renderSwitch,
  renderTimePicker,
  renderCheckbox
} from "./renderers"

const nothing = () => {}
const omitProps = keys => mapProps(props => omit(keys, props))
const enhance = compose(
  withProps(props => ({
    input: {
      value: props.converter
        ? props.converter(props.field.value)
        : props.field.value,
      onChange: props.readOnly ? nothing : props.field.onChange,
      readOnly: props.readOnly,
      onBlur: props.field.onBlur,

      name: props.field.name,
      touched: props.form.touched[props.field.name],
      error: props.form.errors[props.field.name]
    },
    deconverter: props.deconverter,
    name: props.field.name
  })),
  omitProps(["setFieldValue"])
)
const dateConverter = value => (value ? moment(value).format("YYYY.MM.DD") : "")

const textField = enhance(RenderTextField)
const datePickerField = enhance(renderDatePicker)
const selectField = enhance(renderSelectField)
const switchField = enhance(renderSwitch)
const timePickerField = enhance(renderTimePicker)
const checkboxField = enhance(renderCheckbox)

class TypeFieldInner extends Component {
  shouldComponentUpdate(nextProps) {
    const { input } = this.props
    if (
      input.value !== nextProps.input.value ||
      input.touched !== nextProps.input.touched ||
      input.error !== nextProps.input.error
    ) {
      return true
    }
    return false
  }
  render() {
    const { FieldComponent, ...rest } = this.props
    return <FieldComponent {...rest} />
  }
}
const enhancedTypeFieldInner = enhance(TypeFieldInner)

class TypeField extends PureComponent {
  render() {
    const { type, ...rest } = this.props
    switch (type) {
      case "date":
        return (
          <Field
            {...rest}
            component={
              rest.readOnly ? enhance(RenderTextField) : datePickerField
            }
            converter={dateConverter}
          />
        )
      case "text":
        return (
          <FastField
            {...rest}
            FieldComponent={textField}
            component={enhancedTypeFieldInner}
          />
        )
      case "select":
        return <Field {...rest} component={selectField} />
      case "switch":
        return <Field {...rest} component={switchField} />
      case "time":
        return <Field {...rest} component={timePickerField} />
      case "checkbox":
        return <Field {...rest} component={checkboxField} />
      default:
        return (
          <FastField
            {...rest}
            FieldComponent={textField}
            component={enhancedTypeFieldInner}
          />
        )
    }
  }
}

TypeField.propTypes = {
  /**
   * Valid values:text, select, switch, time or date
   */
  type: PropTypes.string,
  /**
   * Name of the field.
   */
  name: PropTypes.string.isRequired,
  /**
  Label for field
   */
  label: PropTypes.string
}
export default TypeField
