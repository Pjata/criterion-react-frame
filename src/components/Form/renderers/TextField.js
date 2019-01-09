import React from "react"
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles"
import { shouldUpdate, compose } from "recompose"
import classNames from "classnames"
import TextMaskCustom from "../TextMaskCustom"
import NumberFormatCustom from "../NumberFormatCustom"
import { I18n } from "react-i18next"
const textFieldStyle = theme => ({
  empty: {
    color: theme.palette.primary.light
  },
  root: {
    width: "100%"
  }
})

const getInputComponentTextField = (mask, type) => {
  if (type === "number") {
    return NumberFormatCustom
  } else if (mask) {
    return TextMaskCustom
  }
  return undefined
}
const renderTextFieldWithoutStyle = ({
  input,
  label,
  classes,
  className,
  meta,
  form: { submitCount },
  mask,
  InputProps,
  converter,
  type,
  ...custom
}) => (
  <I18n ns={["translations"]}>
    {t => (
      <TextField
        label={t(label)}
        value={input.value === 0 ? input.value : input.value || ""}
        onChange={input.onChange}
        autoComplete={"off"}
        helperText={input.touched || submitCount > 0 ? input.error : null}
        variant={input.readOnly ? "outlined" : "standard"}
        InputProps={{
          name: input.name,
          inputComponent: getInputComponentTextField(mask, type),
          ...InputProps
        }}
        onBlur={ev => {
          console.log(ev)
          input.onBlur(ev)
        }}
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
      return true
    }
    if (props.classes !== nextProps.classes) {
      return true
    }
    return false
  })
)(renderTextFieldWithoutStyle)

export default RenderTextField
