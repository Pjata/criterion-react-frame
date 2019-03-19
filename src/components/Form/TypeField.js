import React, { Component, PureComponent } from "react"
import PropTypes from "prop-types"
import { FastField, Field } from "formik"
import { compose, mapProps, withProps } from "recompose"
import moment from "moment"
import { omit } from "lodash/fp"

import {
  TextField,
  SwitchField,
  SelectField,
  DateTimePickerField,
  TimePickerField,
  DatePickerField,
  CheckboxField,
  ChipperField
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
      onBlur: event => {
        props.field.onBlur(event)
      },

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

const textField = enhance(TextField)
const switchField = enhance(SwitchField)
const selectField = enhance(SelectField)
const datePickerField = enhance(DatePickerField)
const dateTimePickerField = enhance(DateTimePickerField)
const timePickerField = enhance(TimePickerField)
const checkboxField = enhance(CheckboxField)
const chipperField = enhance(ChipperField)

class TypeFieldInner extends Component {
  shouldComponentUpdate(nextProps) {
    const { input, form } = this.props
    if (
      form.submitCount !== nextProps.form.submitCount ||
      input.value !== nextProps.input.value ||
      input.touched !== nextProps.input.touched ||
      input.error !== nextProps.input.error
    ) {
      return true
    }
    return false
  }
  render() {
    console.log()
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
            component={rest.readOnly ? textField : datePickerField}
            converter={dateConverter}
          />
        )
      case "number":
        return (
          <Field
            type={type}
            {...rest}
            FieldComponent={textField}
            component={enhancedTypeFieldInner}
          />
        )
      case "text":
        return (
          <Field
            type={type}
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
      case "dateTime":
        return <Field {...rest} component={dateTimePickerField} />
      case "checkbox":
        return <Field {...rest} component={checkboxField} />
      case "chipper":
        return <Field {...rest} component={chipperField} />
      default:
        return (
          <Field
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
