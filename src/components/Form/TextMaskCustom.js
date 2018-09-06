import React from "react"
import MaskedInput from "react-text-mask"
const TextMaskCustom = props => {
  const { inputRef, mask, ...other } = props

  return <MaskedInput {...other} ref={inputRef} mask={mask} />
}

export default TextMaskCustom
