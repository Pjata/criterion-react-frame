import React from "react"
import PropTypes from "prop-types"
import deburr from "lodash/deburr"
import Autosuggest from "react-autosuggest"
import parse from "autosuggest-highlight/parse"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem"
import Popper from "@material-ui/core/Popper"
import { withStyles } from "@material-ui/core/styles"

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node)
          inputRef(node)
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  )
}
export const match = (text, query) => {
  const specialCharsRegex = /[.*+?^${}()|[\]\\]/g
  const wordCharacterRegex = /[a-z0-9_]/i

  const whitespacesRegex = /\s+/

  function escapeRegexCharacters(str) {
    return str.replace(specialCharsRegex, "\\$&")
  }
  return query
    .trim()
    .split(whitespacesRegex)
    .reduce((result, word) => {
      if (!word.length) return result
      const wordLen = word.length
      const regex = new RegExp(escapeRegexCharacters(word), "i")
      const { index = -1 } = text.match(regex)
      if (index > -1) {
        result.push([index, index + wordLen])

        // Replace what we just found with spaces so we don't find it again.
        text =
          text.slice(0, index) +
          new Array(wordLen + 1).join(" ") +
          text.slice(index + wordLen)
      }

      return result
    }, [])
    .sort((match1, match2) => {
      return match1[0] - match2[0]
    })
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query)
  const parts = parse(suggestion.label, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(
          (part, index) =>
            part.highlight ? (
              <span
                key={String(index)}
                style={{
                  fontWeight: 900,
                  fontStyle: suggestion.key ? "normal" : "italic"
                }}
              >
                {part.text}
              </span>
            ) : (
              <strong
                key={String(index)}
                style={{
                  fontStyle: suggestion.key ? "normal" : "italic",
                  fontWeight: 200
                }}
              >
                {part.text}
              </strong>
            )
        )}
      </div>
    </MenuItem>
  )
}

function getSuggestions(suggestions, value) {
  const inputValue = deburr(value.trim()).toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  const suggestionsFiltered =
    inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.label.toLowerCase().includes(inputValue.toLowerCase())

          if (keep) {
            count += 1
          }

          return keep
        })
  return [...suggestionsFiltered, { label: value }]
}

function getSuggestionValue(suggestion) {
  return suggestion.label
}

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
})

class IntegrationAutosuggest extends React.Component {
  state = {
    single: "",
    popper: "",
    suggestions: []
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    const { suggestions } = this.props
    this.setState({
      suggestions: getSuggestions(suggestions, value)
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  handleChange = name => (event, { newValue, method }) => {
    this.setState({
      [name]: newValue
    })
  }

  render() {
    const { classes, clearOnBlur, onSuggestionSelected, label } = this.props

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    }

    return (
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          placeholder: label,
          value: this.state.single,
          onChange: this.handleChange("single")
        }}
        focusInputOnSuggestionClick={false}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        onSuggestionSelected={(event, { suggestion }) => {
          onSuggestionSelected(suggestion)
          clearOnBlur &&
            this.setState({
              single: ""
            })
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    )
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(IntegrationAutosuggest)
