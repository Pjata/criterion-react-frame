import React from "react"
import moment from "moment"
import { shouldUpdate } from "recompose"
import { DatePicker } from "material-ui-pickers"
import SetFieldValueContext from "../SetFieldValueContext"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import TextField from "./TextField"

const onChangeDateSFV = (input, sfv) => date => {
  sfv(input.name, date)
}
const DateButton = ({ form, name, input }) => ({ helperText, ...props }) => {
  return <TextField form={form} name={name} {...props} input={input} />
}
export const DatePickerField = shouldUpdate((props, nextProps) => {
  const { input } = props
  if (
    input.value !== nextProps.input.value ||
    input.touched !== nextProps.input.touched ||
    input.error !== nextProps.input.error
  ) {
    return true
  }
  return false
})(({ className, input, name, form, label, ...rest }) => (
  <SetFieldValueContext.Consumer>
    {({ setFieldValue }) => (
      <DatePicker
        label={label}
        className={className}
        TextFieldComponent={DateButton({ form, name, input })}
        rightArrowIcon={<KeyboardArrowRight />}
        leftArrowIcon={<KeyboardArrowLeft />}
        format={"YYYY.MM.DD"}
        onChange={onChangeDateSFV(input, setFieldValue)}
        variant={input.readOnly ? "outlined" : "standard"}
        value={input.value ? moment(input.value) : null}
      />
    )}
  </SetFieldValueContext.Consumer>
))
export default DatePickerField
