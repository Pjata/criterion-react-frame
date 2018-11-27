import { validateYupSchema, yupToFormErrors } from "formik"
import memoize from "fast-memoize"
const error = { v: "1" }
const yupToFormErrorsMemoized = memoize(yupToFormErrors)
const validateSchema = (
  { i18n, schema: propSchema, children, ...values },
  { onError, schema }
) => {
  return new Promise((resolve, reject) => {
    if (!schema) {
      resolve({})
    }
    const validationSchema =
      typeof schema === "function" ? schema(values) : schema
    validateYupSchema(values, validationSchema).then(
      () => {
        onError && onError(null)
        resolve({})
      },
      err => {
        const formErrors = yupToFormErrorsMemoized(err)
        onError && onError(formErrors)
        reject(formErrors)
      }
    )
  })
}
export default validateSchema
