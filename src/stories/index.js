import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"
import HomeIcon from "@material-ui/icons/Home"
import FileIcon from "@material-ui/icons/FileCopy"
import TagMultipleIcon from "@material-ui/icons/RemoveRedEye"
import { withKnobs, text, object, select } from "@storybook/addon-knobs"
import CriterionFrameReadme from "../tools/CriterionFrame.md"
import { withReadme } from "storybook-readme"
import { muiTheme } from "storybook-addon-material-ui"
import FormikContainer from "./FormikContainer"
import CriterionFrame from "../components/CriterionFrame"
import { MenuItem } from "@material-ui/core"
import { TypeField } from "../index"

const stories = storiesOf("Menu and topbar", module)
stories.addDecorator(withKnobs).addDecorator(muiTheme())
stories.add(
  "Complete frame ",
  withReadme(CriterionFrameReadme, () => {
    const label = "Theme"
    const options = ["light", "dark"]
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

storiesFormik.add("TextField", () => {
  const label = text("Label", "Test")
  return (
    <FormikContainer onSubmit={action("Submitted: ")}>
      <TypeField name={"textfield"} label={label} />
    </FormikContainer>
  )
})
storiesFormik.add("Select", () => {
  const label = text("Label", "Select test")
  return (
    <FormikContainer onSubmit={action("Submitted: ")}>
      <TypeField name={"select"} label={label} type={"select"}>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </TypeField>
    </FormikContainer>
  )
})
storiesFormik.add("Switch", () => {
  const label = text("Label", "Switch test")
  return (
    <FormikContainer onSubmit={action("Submitted: ")}>
      <TypeField name={"switch"} label={label} type={"switch"} />
    </FormikContainer>
  )
})
storiesFormik.add("Time picker", () => {
  const label = text("Label", "Time test")
  return (
    <FormikContainer onSubmit={action("Submitted: ")}>
      <TypeField name={"time"} label={label} type={"time"} />
    </FormikContainer>
  )
})
storiesFormik.add("Date picker", () => {
  const label = text("Label", "Date test")
  return (
    <FormikContainer onSubmit={action("Submitted: ")}>
      <TypeField name={"date"} label={label} type={"date"} />
    </FormikContainer>
  )
})
