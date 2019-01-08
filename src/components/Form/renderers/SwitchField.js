import React from "react"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { withStyles } from "@material-ui/core/styles"
import SetFieldValueContext from "../SetFieldValueContext"
import { I18n } from "react-i18next"
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
export const SwitchField = withStyles(switchStyles)(renderSwitchComponent)
export default SwitchField
