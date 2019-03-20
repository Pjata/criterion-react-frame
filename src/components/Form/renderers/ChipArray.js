import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import Paper from "@material-ui/core/Paper"

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
})

class ChipsArray extends React.Component {
  handleDelete = data => () => {
    const { onDelete } = this.props
    onDelete(data)
  }

  render() {
    const { chips, readOnly, classes } = this.props

    return (
      <div>
        {chips.map(data => {
          let icon = null

          return (
            <Chip
              key={data.key}
              icon={icon}
              label={data.label}
              onDelete={!readOnly && this.handleDelete(data)}
              className={classes.chip}
            />
          )
        })}
      </div>
    )
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
  chips: PropTypes.array.isRequired
}

export default withStyles(styles)(ChipsArray)
