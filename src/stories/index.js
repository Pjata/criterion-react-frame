import React from "react"

import CriterionProviders from "../components/Form/CriterionProviders"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import HomeIcon from "@material-ui/icons/Home"
import FileIcon from "@material-ui/icons/FileCopy"
import TagMultipleIcon from "@material-ui/icons/RemoveRedEye"
import { withKnobs, text, object } from "@storybook/addon-knobs"
import CriterionFrameReadme from "../tools/CriterionFrame.md"
import { Button, Paper, MenuItem } from "@material-ui/core"
import { withReadme } from "storybook-readme"
import { muiTheme } from "storybook-addon-material-ui"
import FormikContainer, {
  FormikContainerComponent
} from "../components/Form/FormikContainer"
import InputAdornment from "@material-ui/core/InputAdornment"
import { createMuiTheme } from "@material-ui/core/styles"

import JssProvider from "react-jss/lib/JssProvider"
import CriterionFrame from "../components/CriterionFrame"
import { TypeField } from "../index"
import * as Yup from "yup"
import i18n from "./i18n"
const stories = storiesOf("Menu and topbar (DontTest)", module)

const generateClassName = (rule, styleSheet) =>
  `${styleSheet.options.classNamePrefix}-${rule.key}`

const muiTheme0 = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
})
stories.addDecorator(withKnobs).addDecorator(muiTheme([muiTheme0]))

stories.add(
  "Complete frame",
  withReadme(CriterionFrameReadme, () => {
    const title = text("title", "Example app")
    const content = text("content", "Hello world!")
    const userInfo = object("userInfo", {
      userName: "Gipsz Jakab",
      phoneNumber: 1081
    })

    return (
      <CriterionFrame
        menuConfig={[
          {
            label: "Főoldal",
            icon: <HomeIcon />,
            path: "/app/index"
          },
          {
            label: "Szerződések",
            icon: <FileIcon />,
            path: "/app/szerzodesek"
          },
          {
            label: "Szolgáltatások",
            icon: <TagMultipleIcon />,
            path: "/app/szolgaltatasok"
          }
        ]}
        title={title}
        onLogout={action("Logout clicked!")}
        userInfo={userInfo}
        userInfoRender={userInfo => (
          <div>
            <div>{userInfo.userName}</div>
            <div>{userInfo.phoneNumber}</div>
          </div>
        )}
        onItemSelected={action("item selected")}
      >
        {content}
      </CriterionFrame>
    )
  })
)

const storiesFormik = storiesOf("Form", module)
storiesFormik.addDecorator(withKnobs).addDecorator(muiTheme([muiTheme0]))
storiesFormik.addDecorator(story => (
  <JssProvider generateClassName={generateClassName}>{story()}</JssProvider>
))
storiesFormik.add("TextField", () => {
  const label = text("Label", "Test")
  return (
    <CriterionProviders i18n={i18n}>
      <FormikContainer
        onSubmit={action("Submitted: ")}
        render={() => (
          <Paper
            style={{
              margin: "15px",
              padding: "5px",
              width: "400px"
            }}
          >
            <TypeField name={"textfield"} label={label} />
            <Button type="submit">Submit</Button>
          </Paper>
        )}
      />
    </CriterionProviders>
  )
})
storiesFormik.add("TextField heavy (default)", () => {
  const label = text("Label", "Test")
  return (
    <CriterionProviders i18n={i18n}>
      <FormikContainer
        defaultValues={{
          textfield: "default value"
        }}
        onSubmit={action("Submitted: ")}
        render={(values, validateForm, submitForm) => (
          <Paper
            style={{
              margin: "15px",
              padding: "5px",
              width: "400px"
            }}
          >
            <TypeField name={"textfield0"} label={label} />
            <TypeField name={"textfield1"} label={label} />
            <TypeField name={"textfield2"} label={label} />
            <TypeField name={"textfield3"} label={label} />
            <TypeField name={"textfield4"} label={label} />
            <TypeField name={"textfield5"} label={label} />
            <TypeField name={"textfield6"} label={label} />
            <TypeField name={"textfield7"} label={label} />
            <TypeField name={"textfield8"} label={label} />
            <TypeField name={"textfield9"} label={label} />
            <TypeField name={"textfield10"} label={label} />
            <TypeField name={"textfield11"} label={label} />
            <TypeField name={"textfield12"} label={label} />
            <TypeField name={"textfield13"} label={label} />
            <TypeField name={"textfield14"} label={label} />
            <Button onClick={() => submitForm()}>Submit</Button>
          </Paper>
        )}
      />
    </CriterionProviders>
  )
})
storiesFormik.add("TextField (default)", () => {
  const label = text("Label", "Test")
  return (
    <CriterionProviders i18n={i18n}>
      <FormikContainer
        defaultValues={{
          textfield: "default value"
        }}
        onSubmit={action("Submitted: ")}
        render={(values, validateForm, submitForm) => (
          <Paper
            style={{
              margin: "15px",
              padding: "5px",
              width: "400px"
            }}
          >
            <TypeField
              InputProps={{
                endAdornment: (
                  <InputAdornment position={"end"}>nap</InputAdornment>
                )
              }}
              name={"textfield"}
              label={label}
            />
            <Button onClick={() => submitForm()}>Submit</Button>
          </Paper>
        )}
      />
    </CriterionProviders>
  )
})
storiesFormik.add("TextField (default, read only)", () => {
  const label = text("Label", "Test")
  return (
    <CriterionProviders i18n={i18n}>
      <FormikContainer
        defaultValues={{
          textfield: "default value read only"
        }}
        onSubmit={action("Submitted: ")}
        render={() => (
          <Paper
            style={{
              margin: "15px",
              padding: "5px",
              width: "400px"
            }}
          >
            <TypeField readOnly={true} name={"textfield"} label={label} />
            <Button type="submit">Submit</Button>
          </Paper>
        )}
      />
    </CriterionProviders>
  )
})
storiesFormik.add("Switch (default, converter)", () => {
  const label = text("Label", "Test")
  return (
    <CriterionProviders i18n={i18n}>
      <FormikContainer
        defaultValues={{
          switch: "0"
        }}
        onSubmit={action("Submitted: ")}
        render={() => (
          <Paper
            style={{
              margin: "15px",
              padding: "5px",
              width: "400px"
            }}
          >
            <TypeField
              converter={value => value === "1"}
              deconverter={value => (value ? "1" : "0")}
              name={"switch"}
              label={label}
              type={"switch"}
            />
            <Button type="submit">Submit</Button>
          </Paper>
        )}
      />
    </CriterionProviders>
  )
})
storiesFormik.add("Switch (default, converter, readOnly)", () => {
  const label = text("Label", "Test")
  return (
    <CriterionProviders i18n={i18n}>
      <FormikContainer
        defaultValues={{
          switch: "0"
        }}
        onSubmit={action("Submitted: ")}
        render={() => (
          <Paper
            style={{
              margin: "15px",
              padding: "5px",
              width: "400px"
            }}
          >
            <TypeField
              converter={value => value === "1"}
              deconverter={value => (value ? "1" : "0")}
              readOnly={true}
              name={"switch"}
              label={label}
              type={"switch"}
            />
            <Button type="submit">Submit</Button>
          </Paper>
        )}
      />
    </CriterionProviders>
  )
})
storiesFormik.add("Select", () => {
  const label = text("Label", "Select test")
  return (
    <CriterionProviders i18n={i18n}>
      <FormikContainer
        onSubmit={action("Submitted: ")}
        render={() => (
          <Paper
            style={{
              margin: "15px",
              padding: "5px",
              width: "400px"
            }}
          >
            <TypeField name={"select"} label={label} type={"select"}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </TypeField>
            <Button type="submit">Submit</Button>
          </Paper>
        )}
      />
    </CriterionProviders>
  )
})
storiesFormik.add("Switch", () => {
  const label = text("Label", "Switch test")
  return (
    <CriterionProviders i18n={i18n}>
      <FormikContainer
        onSubmit={action("Submitted: ")}
        render={() => (
          <Paper
            style={{
              margin: "15px",
              padding: "5px",
              width: "400px"
            }}
          >
            <TypeField name={"switch"} label={label} type={"switch"} />
            <Button type="submit">Submit</Button>
          </Paper>
        )}
      />
    </CriterionProviders>
  )
})
storiesFormik.add("Checkbox", () => {
  const label = text("Label", "Checkbox test")
  return (
    <CriterionProviders i18n={i18n}>
      <FormikContainer
        onSubmit={action("Submitted: ")}
        render={() => (
          <Paper
            style={{
              margin: "15px",
              padding: "5px",
              width: "400px"
            }}
          >
            <TypeField name={"checkbox"} label={label} type={"checkbox"} />
            <Button type="submit">Submit</Button>
          </Paper>
        )}
      />
    </CriterionProviders>
  )
})
storiesFormik.add("Time picker", () => {
  const label = text("Label", "Time test")
  return (
    <CriterionProviders i18n={i18n}>
      <FormikContainer
        onSubmit={action("Submitted: ")}
        render={() => (
          <Paper
            style={{
              margin: "15px",
              padding: "5px",
              width: "400px"
            }}
          >
            <TypeField name={"time"} label={label} type={"time"} />
            <Button type="submit">Submit</Button>
          </Paper>
        )}
      />
    </CriterionProviders>
  )
})
storiesFormik.add("Date picker", () => {
  const label = text("Label", "Date test")
  return (
    <CriterionProviders i18n={i18n}>
      <FormikContainer
        onSubmit={action("Submitted: ")}
        render={() => (
          <Paper
            style={{
              margin: "15px",
              padding: "5px",
              width: "400px"
            }}
          >
            <TypeField name={"date"} label={label} type={"date"} />
            <Button type="submit">Submit</Button>
          </Paper>
        )}
      />
    </CriterionProviders>
  )
})
storiesFormik.add("Validation", () => {
  const regex = text("Regex", "")
  return (
    <CriterionProviders i18n={i18n}>
      <FormikContainer
        onError={action("Error: ")}
        onSubmit={action("Submitted: ")}
        schema={values =>
          Yup.object().shape({
            required: Yup.string().required("Kötelező mező!"),
            select: Yup.number().required("Kötelező mező!"),
            regex:
              values.required === "123"
                ? Yup.string().matches(new RegExp(regex))
                : Yup.string(),
            date: Yup.string().required("Kötelező mező!")
          })
        }
        render={() => (
          <Paper
            style={{
              margin: "15px",
              padding: "5px",
              width: "400px"
            }}
          >
            <TypeField label={"Required"} name={"required"} />
            <TypeField label={"Regex"} name={"regex"} />
            <TypeField name={"date"} label={"date"} type={"date"} />
            <TypeField name={"select"} label={"select"} type={"select"}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </TypeField>
            <Button type={"submit"}>Submit</Button>
          </Paper>
        )}
      />
    </CriterionProviders>
  )
})

/*
storiesFormik.add("Form editor", () => {
  return (
    <CriterionProviders i18n={i18n}>
      <FormikContainer
        onError={action("Error: ")}
        onSubmit={action("Submitted: ")}
        render={() => <FormEditor />}
      />
    </CriterionProviders>
  )
})
*/
