import React from "react"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import { TextField } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import moment from "moment"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import { withStyles } from "@material-ui/core/styles"
import classNames from "classnames"
import { TimePicker, DatePicker } from "material-ui-pickers"
import SetFieldValueContext from "./SetFieldValueContext"
import TextMaskCustom from "./TextMaskCustom"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import { I18n } from "react-i18next"

const textFieldStyle = theme => ({
  empty: {
    color: theme.palette.primary.light
  },
  root: {
    width: "100%"
  }
})
/*  */
const renderTextFieldWithoutStyle = ({
  input,
  label,
  classes,
  className,
  meta,
  form: { submitCount },
  mask,
  InputProps,
  ...custom
}) => (
  <I18n ns={["translations"]}>
    {t => (
      <TextField
        label={t(label)}
        value={input.value || ""}
        onChange={input.onChange}
        autoComplete={"off"}
        helperText={input.touched || submitCount > 0 ? input.error : null}
        InputProps={{
          name: input.name,
          inputComponent: mask ? TextMaskCustom : undefined
        }}
        onBlur={input.onBlur}
        classes={{
          root: classes.root
        }}
        {...custom}
        error={Boolean((input.touched || submitCount > 0) && input.error)}
        inputProps={{
          mask
        }}
        InputLabelProps={{
          className: classNames({
            [classes.empty]: input.value === null || input.value === ""
          })
        }}
        className={classNames(className)}
        /**/
      />
    )}
  </I18n>
)

export const RenderTextField = withStyles(textFieldStyle)(
  renderTextFieldWithoutStyle
)
const onSwitchChangeSFV = (input, sfv) => event => {
  const value = Boolean(event.target.checked)
  sfv(input.name, value)
}
const onSelectChangeSFV = (input, sfv) => event => {
  console.log(sfv)
  sfv(input.name, event.target.value)
}

const onSwitchChange = input => event => {
  const value = Boolean(event.target.checked)
  console.log(input)
  console.log(value)
  input.onChange(input.name, value)
}
const switchStyles = {
  root: {
    margin: "0px 0px 0px 0px"
  },
  label: {
    margin: "0px 0px 0px 10px"
  }
}
const renderSwitchComponent = ({ classes, input, label }) => (
  <SetFieldValueContext.Consumer>
    {({ setFieldValue }) => (
      <FormControlLabel
        control={
          <Switch
            checked={input.value}
            onChange={onSwitchChangeSFV(input, setFieldValue)}
            color={"primary"}
            value={label}
          />
        }
        label={label}
        classes={{
          root: classes.root,
          label: classes.label
        }}
      />
    )}
  </SetFieldValueContext.Consumer>
)
export const renderSwitch = withStyles(switchStyles)(renderSwitchComponent)

const onSelectChange = input => event => {
  console.log(input)
  console.log(event)
  input.onChange(input.name, event.target.value, true)
}
export const renderSelectField = ({
  input,
  label,
  style,
  className,
  children,
  meta,
  form,
  name,
  form: { submitCount, errors },
  ...rest
}) => {
  const error = errors[name]
  return (
    <SetFieldValueContext.Consumer>
      {({ setFieldValue }) => (
        <FormControl
          className={className}
          error={Boolean(error && submitCount > 0)}
          style={{ minWidth: 150, ...style }}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            value={input.value || ""}
            onChange={onSelectChangeSFV(input, setFieldValue)}
            {...rest}
          >
            {children}
          </Select>
          {error && submitCount > 0 ? (
            <FormHelperText>{error}</FormHelperText>
          ) : (
            <div />
          )}
        </FormControl>
      )}
    </SetFieldValueContext.Consumer>
  )
}

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
export const renderTimePicker = ({
  className,
  input,
  name,
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
        value={getTimeValue(input.value)}
        onChange={onChangeTimePicker(input.name, setFieldValue)}
      />
    )}
  </SetFieldValueContext.Consumer>
)
const onChangeDateSFV = (input, sfv) => date => {
  sfv(input.name, date)
}
const DateButton = ({ ref, name, form, ...props }) => {
  const meta = {
    error: form.errors[name],
    touched: form.touched[name]
  }
  return <RenderTextField meta={meta} name={name} form={form} {...props} />
}
export const renderDatePicker = ({
  className,
  input,
  name,
  label,
  ...rest
}) => (
  <SetFieldValueContext.Consumer>
    {({ setFieldValue }) => (
      <DatePicker
        label={label}
        className={className}
        rightArrowIcon={<KeyboardArrowRight />}
        leftArrowIcon={<KeyboardArrowLeft />}
        format={"YYYY.MM.DD"}
        onChange={onChangeDateSFV(input, setFieldValue)}
        value={input.value ? moment(input.value) : null}
      />
    )}
  </SetFieldValueContext.Consumer>
)
