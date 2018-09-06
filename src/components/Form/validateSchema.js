import { validateYupSchema, yupToFormErrors } from "formik"
import memoize from "fast-memoize"
const error = { v: "1" }
const yupToFormErrorsMemoized = memoize(yupToFormErrors)
const validateSchema = schema => (values, props) => {
  return new Promise((resolve, reject) => {
    validateYupSchema(values, schema).then(
      () => {
        props.onError(null)
        resolve({})
      },
      err => {
        const formErrors = yupToFormErrorsMemoized(err)
        props.onError(formErrors)
        reject(formErrors)
      }
    )
  })
}
export default validateSchema
