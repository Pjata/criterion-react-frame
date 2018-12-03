import React, { PureComponent } from "react"
import ReactDOM from "react-dom"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import Checkbox from "@material-ui/core/Checkbox"
import moment from "moment"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import { withStyles } from "@material-ui/core/styles"
import { shouldUpdate, compose } from "recompose"
import classNames from "classnames"
import { TimePicker, DatePicker } from "material-ui-pickers"
import SetFieldValueContext from "./SetFieldValueContext"
import TextMaskCustom from "./TextMaskCustom"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Input from "@material-ui/core/Input"
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
        variant={input.readOnly ? "outlined" : "standard"}
        InputProps={{
          name: input.name,
          inputComponent: mask ? TextMaskCustom : undefined,
          disableUnderline: input.readOnly,
          ...InputProps
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

export const RenderTextField = compose(
  withStyles(textFieldStyle),
  shouldUpdate((props, nextProps) => {
    const { input } = props
    if (
      input.value !== nextProps.input.value ||
      input.touched !== nextProps.input.touched ||
      input.error !== nextProps.input.error
    ) {
      console.log(`updated: ${input.name}`)
      return true
    }
    if (props.classes !== nextProps.classes) {
      return true
    }
    return false
  })
)(renderTextFieldWithoutStyle)
const onSwitchChangeSFV = (input, deconverter, sfv, readOnly) => event => {
  if (readOnly) {
    return
  }
  const value = Boolean(event.target.checked)
  if (deconverter) {
    sfv(input.name, deconverter(value))
  } else {
    sfv(input.name, value)
  }
}
const onSelectChangeSFV = (input, sfv) => event => {
  sfv(input.name, event.target.value)
}
const switchStyles = {
  root: {
    margin: "0px 0px 0px 0px"
  },
  label: {
    margin: "0px 0px 0px 10px"
  }
}
const renderSwitchComponent = ({
  classes,
  input,
  deconverter,
  label,
  readOnly,
  labelPlacement
}) => (
  <I18n ns={["translations"]}>
    {t => (
      <SetFieldValueContext.Consumer>
        {({ setFieldValue }) => (
          <FormControlLabel
            labelPlacement={labelPlacement}
            control={
              <Switch
                checked={input.value}
                onChange={onSwitchChangeSFV(
                  input,
                  deconverter,
                  setFieldValue,
                  readOnly
                )}
                color={"primary"}
                value={label}
              />
            }
            label={t(label)}
            classes={{
              root: classes.root,
              label: classes.label
            }}
          />
        )}
      </SetFieldValueContext.Consumer>
    )}
  </I18n>
)
export const renderSwitch = withStyles(switchStyles)(renderSwitchComponent)
const selectStyle = {
  iconStyleHidden: {
    opacity: 0
  },
  iconStyleShow: {
    opacity: 1
  }
}
export class RenderSelectFieldComponent extends PureComponent {
  state = {
    labelWidth: 0
  }
  componentDidMount() {
    const off = ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    console.log(off)
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    })
  }

  render() {
    const {
      input: { touched, ...inputProps },
      label,
      style,
      className,
      children,
      name,
      classes,
      form: { submitCount, errors },
      ...rest
    } = this.props
    const error = errors[name]
    return (
      <I18n ns={["translations"]}>
        {t => (
          <SetFieldValueContext.Consumer>
            {({ setFieldValue }) => (
              <FormControl
                variant={inputProps.readOnly ? "outlined" : "standard"}
                className={className}
                error={Boolean(error && submitCount > 0)}
                style={{ minWidth: 150, ...style }}
              >
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref
                  }}
                >
                  {t(label)}
                </InputLabel>
                <Select
                  classes={{
                    icon: inputProps.readOnly
                      ? classes.iconStyleHidden
                      : inputProps.iconStyleShow
                  }}
                  value={inputProps.value || ""}
                  onChange={onSelectChangeSFV(inputProps, setFieldValue)}
                  disableUnderline={inputProps.readOnly}
                  input={
                    inputProps.readOnly ? (
                      <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        {...inputProps}
                      />
                    ) : (
                      <Input {...inputProps} />
                    )
                  }
                  //   {...rest}
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
        )}
      </I18n>
    )
  }
}
export const renderSelectField = withStyles(selectStyle)(
  RenderSelectFieldComponent
)
export const RenderSelectField = withStyles(selectStyle)(
  ({
    input,
    label,
    style,
    className,
    children,
    meta,
    form,
    name,
    classes,
    form: { submitCount, errors },
    ...rest
  }) => {
    const error = errors[name]
    return (
      <SetFieldValueContext.Consumer>
        {({ setFieldValue }) => (
          <FormControl
            variant={"outlined"}
            className={className}
            error={Boolean(error && submitCount > 0)}
            style={{ minWidth: 150, ...style }}
          >
            <InputLabel>{label}</InputLabel>
            <Select
              classes={{
                icon: input.readOnly
                  ? classes.iconStyleHidden
                  : input.iconStyleShow
              }}
              value={input.value || ""}
              onChange={onSelectChangeSFV(input, setFieldValue)}
              disableUnderline={input.readOnly}
              input={
                input.readOnly || true ? (
                  <OutlinedInput labelWidth={10} />
                ) : (
                  <Input {...input} />
                )
              }
              //   {...rest}
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
)

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
        variant={input.readOnly ? "outlined" : "standard"}
        InputProps={{
          disableUnderline: input.readOnly
        }}
        onChange={onChangeTimePicker(input.name, setFieldValue)}
      />
    )}
  </SetFieldValueContext.Consumer>
)
const onChangeDateSFV = (input, sfv) => date => {
  sfv(input.name, date)
}
const DateButton = ({ form, name, input }) => ({ helperText, ...props }) => {
  return <RenderTextField form={form} name={name} input={input} {...props} />
}
export const renderDatePicker = shouldUpdate((props, nextProps) => {
  const { input } = props
  if (
    input.value !== nextProps.input.value ||
    input.touched !== nextProps.input.touched ||
    input.error !== nextProps.input.error
  ) {
    console.log(`updated: ${input.name}`)
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
        InputProps={{
          disableUnderline: input.readOnly
        }}
        value={input.value ? moment(input.value) : null}
      />
    )}
  </SetFieldValueContext.Consumer>
))

const renderCheckboxComponent = ({
  classes,
  input,
  deconverter,
  label,
  readOnly,
  labelPlacement
}) => (
  <I18n ns={["translations"]}>
    {t => (
      <SetFieldValueContext.Consumer>
        {({ setFieldValue }) => (
          <FormControlLabel
            labelPlacement={labelPlacement}
            control={
              <Checkbox
                checked={input.value}
                onChange={onSwitchChangeSFV(
                  input,
                  deconverter,
                  setFieldValue,
                  readOnly
                )}
                color={"primary"}
                value={label}
              />
            }
            label={t(label)}
            classes={{
              root: classes.root,
              label: classes.label
            }}
          />
        )}
      </SetFieldValueContext.Consumer>
    )}
  </I18n>
)
export const renderCheckbox = withStyles(switchStyles)(renderCheckboxComponent)
