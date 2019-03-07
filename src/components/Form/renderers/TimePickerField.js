import React from "react"
import moment from "moment"
import { TimePicker } from "material-ui-pickers"
import SetFieldValueContext from "../SetFieldValueContext"
import TextField from "./TextField"
const onChangeTimePicker = (name, setFieldValue) => date => {
  setFieldValue(name, date ? date.format("HH:mm") : null)
}
const getTimeValue = value => {
  const time = moment(value, "HH:mm")
  if (time.isValid()) {
    return time
  } else {
    return ""
  }
}
const DateButton = ({ form, name, input }) => ({
  helperText,
  value,
  ...props
}) => {
  return <TextField form={form} name={name} {...props} input={input} />
}
export const TimePickerField = ({
  className,
  input,
  name,
  form,
  label,
  ...rest
}) => (
  <SetFieldValueContext.Consumer>
    {({ setFieldValue }) => (
      <TimePicker
        {...rest}
        clearable
        ampm={false}
        className={className}
        label={label}
        invalidLabel={""}
        TextFieldComponent={DateButton({ form, name, input, className })}
        value={getTimeValue(input.value)}
        variant={input.readOnly ? "outlined" : "standard"}
        onChange={onChangeTimePicker(input.name, setFieldValue)}
      />
    )}
  </SetFieldValueContext.Consumer>
)

export default TimePickerField
