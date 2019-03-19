import React, { PureComponent } from "react"
import ChipArray from "./ChipArray"
import SetFieldValueContext from "../SetFieldValueContext"
import Autosuggest from "./Autosuggest"
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
      : { key: `NEW_${data.label}`, label: data.label }
    const isAlreadyAdded = value.find(item => item.key === foundOrNew.key)
    if (!isAlreadyAdded) {
      setFieldValue(name, [...value, foundOrNew])
    }
  }
  render() {
    const { input, readOnly, label, suggestions } = this.props
    return (
      <SetFieldValueContext.Consumer>
        {({ setFieldValue }) => (
          <div>
            <Autosuggest
              label={label}
              clearOnBlur
              suggestions={suggestions}
              onSuggestionSelected={this.onSuggestionSelected(setFieldValue)}
            />
            {input.value &&
              input.value.length !== 0 && (
                <ChipArray
                  chips={input.value}
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
