import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"
import HomeIcon from "@material-ui/icons/Home"
import FileIcon from "@material-ui/icons/FileCopy"
import TagMultipleIcon from "@material-ui/icons/RemoveRedEye"
import { withKnobs, text, object, select } from "@storybook/addon-knobs"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CriterionFrameReadme from "../tools/CriterionFrame.md"
import { withReadme } from "storybook-readme"

import CriterionFrame from "../components/CriterionFrame"
const themeDark = createMuiTheme({
  palette: {
    type: "dark" // Switching the dark mode on is a single property value change.
  }
})

const themeLight = createMuiTheme({
  palette: {
    type: "light"
  }
})

const stories = storiesOf("Examples", module)

stories.addDecorator(withKnobs)

stories.add(
  "Complete frame ",
  withReadme(CriterionFrameReadme, () => {
    const label = "Theme"
    const options = ["light", "dark"]
    const theme = select(label, options, "light")
    const title = text("title", "Example app")
    const content = text("content", "Hello world!")
    const userInfo = object("userInfo", {
      userName: "Gipsz Jakab"
    })

    return (
      <MuiThemeProvider theme={theme === "light" ? themeLight : themeDark}>
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
      </MuiThemeProvider>
    )
  })
)
