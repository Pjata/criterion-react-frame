import React, { PureComponent } from "react"
import ChipArray from "./ChipArray"
import SetFieldValueContext from "../SetFieldValueContext"
import Autosuggest from "./Autosuggest"
import Typography from "@material-ui/core/Typography"
class Chipper extends PureComponent {
  onDelete = setFieldValue => data => {
    const {
      input: { value, name }
    } = this.props
    const filtered = value.filter(item => item.key !== data.key)
    setFieldValue(name, filtered)
  }
  onSuggestionSelected = setFieldValue => data => {
    const {
      suggestions,
      input: { value, name }
    } = this.props
    const found = suggestions.find(
      item => item.key && data.key && item.key === data.key
    )
    const foundOrNew = found
      ? found
      : { key: `${data.label}`, label: data.label }
    const isAlreadyAdded = value.find(item => item.key === foundOrNew.key)
    if (!isAlreadyAdded) {
      setFieldValue(name, [...value, foundOrNew])
    }
  }
  getTopComponent = setFieldValue => {
    const { readOnly, label, suggestions } = this.props
    if (readOnly) {
      return <Typography>{label}:</Typography>
    }
    return (
      <Autosuggest
        label={label}
        clearOnBlur
        suggestions={suggestions}
        onSuggestionSelected={this.onSuggestionSelected(setFieldValue)}
      />
    )
  }
  render() {
    const { input, readOnly } = this.props
    return (
      <SetFieldValueContext.Consumer>
        {({ setFieldValue }) => (
          <div>
            {this.getTopComponent(setFieldValue)}
            {input.value &&
              input.value.length !== 0 && (
                <ChipArray
                  chips={input.value}
                  readOnly={readOnly}
                  onDelete={this.onDelete(setFieldValue)}
                />
              )}
          </div>
        )}
      </SetFieldValueContext.Consumer>
    )
  }
}

Chipper.propTypes = {}

export default Chipper
