import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"
import HomeIcon from "@material-ui/icons/Home"
import FileIcon from "@material-ui/icons/FileCopy"
import TagMultipleIcon from "@material-ui/icons/RemoveRedEye"
import { withKnobs, text, object } from "@storybook/addon-knobs"

import CriterionFrame from "../components/CriterionFrame"
const stories = storiesOf("Examples", module)
stories.addDecorator(withKnobs)
stories.add("Complete frame ", () => {
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
