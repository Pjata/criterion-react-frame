import React from "react"
import moment from "moment"
import { InlineDateTimePicker } from "material-ui-pickers"
import SetFieldValueContext from "../SetFieldValueContext"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import DateRange from "@material-ui/icons/DateRange"
import AccessTime from "@material-ui/icons/AccessTime"
const onChangeDateTimePicker = (name, setFieldValue) => date => {
  setFieldValue(name, date.format("YYYY.MM.DD HH:mm"))
}
const getDateTimeValue = value => {
  const time = moment(value, "YYYY.MM.DD HH:mm")
  if (time.isValid()) {
    return time
  } else {
    return ""
  }
}
export const DateTimePickerField = ({
  className,
  input,
  name,
  label,
  form,
  ...rest
}) => (
  <SetFieldValueContext.Consumer>
    {({ setFieldValue }) => (
      <InlineDateTimePicker
        {...rest}
        clearable
        dateRangeIcon={<DateRange />}
        timeIcon={<AccessTime />}
        rightArrowIcon={<KeyboardArrowRight />}
        leftArrowIcon={<KeyboardArrowLeft />}
        ampm={false}
        format={"YYYY.MM.DD HH:mm"}
        className={className}
        label={label}
        invalidLabel={""}
        value={getDateTimeValue(input.value)}
        variant={input.readOnly ? "outlined" : "standard"}
        onChange={onChangeDateTimePicker(input.name, setFieldValue)}
      />
    )}
  </SetFieldValueContext.Consumer>
)
export default DateTimePickerField
