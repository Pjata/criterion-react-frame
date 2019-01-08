import React from "react"
import moment from "moment"
import { TimePicker } from "material-ui-pickers"
import SetFieldValueContext from "../SetFieldValueContext"
const onChangeTimePicker = (name, setFieldValue) => date => {
  setFieldValue(name, date.format("HH:mm"))
}
const getTimeValue = value => {
  const time = moment(value, "HH:mm")
  if (time.isValid()) {
    return time
  } else {
    return ""
  }
}
export const TimePickerField = ({ className, input, name, label, ...rest }) => (
  <SetFieldValueContext.Consumer>
    {({ setFieldValue }) => (
      <TimePicker
        {...rest}
        clearable
        ampm={false}
        className={className}
        label={label}
        invalidLabel={""}
        value={getTimeValue(input.value)}
        variant={input.readOnly ? "outlined" : "standard"}
        InputProps={{
          disableUnderline: input.readOnly
        }}
        onChange={onChangeTimePicker(input.name, setFieldValue)}
      />
    )}
  </SetFieldValueContext.Consumer>
)

export default TimePickerField
