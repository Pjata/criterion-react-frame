import React from "react"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { withStyles } from "@material-ui/core/styles"
import SetFieldValueContext from "../SetFieldValueContext"
import { I18n } from "react-i18next"

const onCheckboxChangeSFV = (input, deconverter, sfv, readOnly) => event => {
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
const checkboxStyles = {
  root: {
    margin: "0px 0px 0px 0px"
  },
  label: {
    margin: "0px 0px 0px 10px"
  }
}
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
                onChange={onCheckboxChangeSFV(
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
export const CheckboxField = withStyles(checkboxStyles)(renderCheckboxComponent)
export default CheckboxField
