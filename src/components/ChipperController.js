import React, { PureComponent } from "react"
import ChipArray from "./Form/renderers/ChipArray"
import Autosuggest from "./Form/renderers/Autosuggest"
import Typography from "@material-ui/core/Typography"
class Chipper extends PureComponent {
  onDelete = data => {
    const { value, onChange } = this.props
    const filtered = value.filter(item => item.key !== data.key)
    onChange(filtered)
  }
  onSuggestionSelected = data => {
    const { suggestions, value, onChange } = this.props
    const found = suggestions.find(
      item => item.key && data.key && item.key === data.key
    )
    const foundOrNew = found || { key: `${data.label}`, label: data.label }
    const isAlreadyAdded = value.find(item => item.key === foundOrNew.key)
    if (!isAlreadyAdded) {
      onChange([...value, foundOrNew])
    }
  }
  getTopComponent = () => {
    const { readOnly, label, suggestions } = this.props
    if (readOnly) {
      return <Typography>{label}:</Typography>
    }
    return (
      <Autosuggest
        label={label}
        clearOnBlur
        suggestions={suggestions}
        onSuggestionSelected={this.onSuggestionSelected}
      />
    )
  }
  render() {
    const { value, readOnly } = this.props
    return (
      <div>
        {this.getTopComponent()}
        {value &&
          value.length !== 0 && (
            <ChipArray
              chips={value}
              readOnly={readOnly}
              onDelete={this.onDelete}
            />
          )}
      </div>
    )
  }
}

Chipper.propTypes = {}

export default Chipper
