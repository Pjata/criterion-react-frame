import React from "react"
import NumberFormat from "react-number-format"
function NumberFormatCustom(props) {
  const { inputRef, onChange, name, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      decimalSeparator={","}
      thousandSeparator={" "}
      onValueChange={values => {
        console.log(values)
        onChange({
          target: {
            value: values.floatValue,
            name
          }
        })
      }}
    />
  )
}

export default NumberFormatCustom
