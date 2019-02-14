import React, { PureComponent } from "react"
import ReactDOM from "react-dom"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import { withStyles } from "@material-ui/core/styles"
import SetFieldValueContext from "../SetFieldValueContext"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Input from "@material-ui/core/Input"
import { I18n } from "react-i18next"
const selectStyle = {
  root: {
    width: "100%"
  },
  iconStyleHidden: {
    opacity: 0
  },
  iconStyleShow: {
    opacity: 1
  },
  selectMenu: {
    color: "red"
  }
}
export class RenderSelectFieldComponent extends PureComponent {
  state = {
    labelWidth: 0
  }
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    })
  }

  render() {
    const {
      input: { error, touched, ...inputProps },
      label,
      style,
      className,
      children,
      name,
      classes,
      form: { submitCount, errors },
      ...rest
    } = this.props
    const formControlClasses = {
      root: classes.root
    }
    const options = [
      <option key={""} value={null} />,
      ...children.map(item => (
        <option key={item.props.value} value={item.props.value}>
          {item.props.children}
        </option>
      ))
    ]
    const onSelectChangeSFV = (input, sfv) => event => {
      const index = event.target.selectedIndex
      const value = options[index].props.value
      sfv(input.name, value)
    }
    return (
      <I18n ns={["translations"]}>
        {t => (
          <SetFieldValueContext.Consumer>
            {({ setFieldValue }) => (
              <FormControl
                variant={inputProps.readOnly ? "outlined" : "standard"}
                className={className}
                error={Boolean(error && (submitCount > 0 || touched))}
                classes={formControlClasses}
                style={{ ...style }}
              >
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref
                  }}
                >
                  {t(label)}
                </InputLabel>
                <Select
                  native
                  classes={{
                    icon: inputProps.readOnly
                      ? classes.iconStyleHidden
                      : inputProps.iconStyleShow
                  }}
                  value={
                    inputProps.value || inputProps.value === false
                      ? inputProps.value
                      : ""
                  }
                  inputProps={{
                    disabled: Boolean(inputProps.readOnly)
                  }}
                  onChange={onSelectChangeSFV(inputProps, setFieldValue)}
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
                  {options}
                </Select>
                {error && (submitCount > 0 || touched) ? (
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
export const SelectField = withStyles(selectStyle)(RenderSelectFieldComponent)
export default SelectField
