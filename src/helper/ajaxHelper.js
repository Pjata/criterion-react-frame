import { flatMap, switchMap, map, catchError } from "rxjs/operators"
import { ofType } from "redux-observable"
import { of } from "rxjs/observable/of"
import { concat } from "rxjs/observable/concat"
import { ajax } from "rxjs/observable/dom/ajax"
import { error, success } from "react-notification-system-redux"

export const ajaxGetJSON = (type, urlCreator, actionCreater) => actions$ =>
  actions$.pipe(
    ofType(type),
    switchMap(action =>
      ajax.getJSON(urlCreator(action)).pipe(
        map(actionCreater),
        catchError(errorMessage => {
          return of(
            error({
              title: "Hiba!",
              position: "tl",
              message: errorMessage.response && errorMessage.response.message
            })
          )
        })
      )
    )
  )

export const ajaxMethod = (method, options = { silent: false }) => (
  type,
  urlCreator,
  actionCreators,
  errorCreators = () => []
) => actions$ =>
  actions$.pipe(
    ofType(type),
    switchMap(action => {
      return method(urlCreator(action), action.payload, {
        "Content-Type": "application/json"
      }).pipe(
        flatMap(({ response }) => {
          const customActions = actionCreators(response).map(item => of(item))
          if (options.silent) {
            return concat(...customActions)
          } else {
            return concat(
              ...customActions,
              of(
                success({
                  title: "Sikeres módosítás!"
                })
              )
            )
          }
        }),
        catchError(errorResp => {
          console.log(errorResp)
          const customErrors = errorCreators(errorResp).map(item => of(item))
          return concat(
            ...customErrors,
            of(
              error({
                title: "Hiba!",
                position: "tl",
                message: errorResp.response && errorResp.response.message
              })
            )
          )
        })
      )
    })
  )
export const ajaxPutJSON = ajaxMethod(ajax.put)
export const ajaxPutJSONSilent = ajaxMethod(ajax.put, { silent: true })
export const ajaxPostJSON = ajaxMethod(ajax.post)
export const ajaxDeleteJSON = ajaxMethod(ajax.delete)
