import React, { Component, PureComponent } from "react"
import PropTypes from "prop-types"
import { FastField, Field } from "formik"
import {
  compose,
  mapProps,
  withProps,
  renderComponent,
  shouldUpdate
} from "recompose"
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
      name: props.field.name,
      touched: props.form.touched[props.field.name],
      error: props.form.errors[props.field.name]
    },
    name: props.field.name
  })),
  omitProps(["setFieldValue"])
)

const Converter = (converter, setFieldValue) => (name, value) => {
  console.log(value)
  return setFieldValue(name, converter(value))
}
const withConverter = (deconverter, setFieldValue) => {
  if (deconverter) {
    return Converter(deconverter, setFieldValue)
  } else {
    return setFieldValue
  }
}
const enhanceSetFieldValue = compose(
  withProps(props => {
    return {
      input: {
        value: props.converter
          ? props.converter(props.field.value)
          : props.field.value,
        onChange: props.readOnly
          ? nothing
          : withConverter(props.deconverter, props.form.setFieldValue),
        name: props.field.name
      },
      deconverter: props.deconverter,
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
const datePickerField = enhance(renderDatePicker)
const selectField = enhanceSetFieldValue(renderSelectField)
const switchField = enhanceSetFieldValue(renderSwitch)
const timePickerField = enhanceSetFieldValue(renderTimePicker)

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
    const { Component, ...rest } = this.props
    return <Component {...rest} />
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
              rest.readOnly ? enhanceDate(RenderTextField) : datePickerField
            }
          />
        )
      case "text":
        return (
          <FastField
            {...rest}
            Component={textField}
            component={enhancedTypeFieldInner}
          />
        )
      case "select":
        return <Field {...rest} component={selectField} />
      case "switch":
        return <Field {...rest} component={switchField} />
      case "time":
        return <Field {...rest} component={timePickerField} />
      default:
        return (
          <FastField
            {...rest}
            Component={textField}
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
