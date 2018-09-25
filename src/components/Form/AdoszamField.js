import React, { PureComponent } from "react"
import { TypeField } from "../../common/Form/FormikBuilder"

class AdoszamField extends PureComponent {
  render() {
    const { className, autoFocus } = this.props
    return (
      <TypeField
        autoFocus={autoFocus}
        className={className}
        mask={[
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          "-",
          /\d/,
          /\d/
        ]}
        name={"adoSzam"}
        label={"Adószám"}
      />
    )
  }
}

AdoszamField.propTypes = {}

export default AdoszamField
