import React from "react"

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

import CriterionFrame from "../components/CriterionFrame"
import { TypeField } from "../index"
import * as Yup from "yup"
import i18n from "./i18n"
import { withInfo } from "@storybook/addon-info"

const stories = storiesOf("Menu and topbar", module)
stories.addDecorator(withKnobs).addDecorator(muiTheme())

stories.add(
  "Complete frame ",
  withReadme(CriterionFrameReadme, () => {
    const title = text("title", "Example app")
    const content = text("content", "Hello world!")
    const userInfo = object("userInfo", {
      userName: "Gipsz Jakab"
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
        onItemSelected={action("item selected")}
      >
        {content}
      </CriterionFrame>
    )
  })
)

const storiesFormik = storiesOf("Form", module)
storiesFormik.addDecorator(withKnobs).addDecorator(muiTheme())

storiesFormik.add(
  "TextField",
  withInfo({
    source: false,
    propTables: [TypeField, FormikContainerComponent]
  })(() => {
    const label = text("Label", "Test")
    return (
      <FormikContainer
        i18n={i18n}
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
    )
  })
)
storiesFormik.add("Select", () => {
  const label = text("Label", "Select test")
  return (
    <FormikContainer
      i18n={i18n}
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
  )
})
storiesFormik.add("Switch", () => {
  const label = text("Label", "Switch test")
  return (
    <FormikContainer
      i18n={i18n}
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
  )
})
storiesFormik.add("Time picker", () => {
  const label = text("Label", "Time test")
  return (
    <FormikContainer
      i18n={i18n}
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
  )
})
storiesFormik.add("Date picker", () => {
  const label = text("Label", "Date test")
  return (
    <FormikContainer
      i18n={i18n}
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
  )
})
storiesFormik.add("Validation", () => {
  const regex = text("Regex", "")
  return (
    <FormikContainer
      onError={action("Error: ")}
      onSubmit={action("Submitted: ")}
      i18n={i18n}
      schema={Yup.object().shape({
        required: Yup.string().required("Kötelező mező!"),
        regex: Yup.string().matches(new RegExp(regex)),
        date: Yup.string().required("Kötelező mező!")
      })}
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
          <Button type={"submit"}>Submit</Button>
        </Paper>
      )}
    />
  )
})
