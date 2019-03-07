import { configure, addParameters } from "@storybook/react"
import { setOptions } from "@storybook/addon-options"
import { addDecorator } from "@storybook/react"
import { create } from "@storybook/theming"
const theme = create({
  base: "dark",
  colorPrimary: "#FF4785",
  colorSecondary: "#1EA7FD"
})
addParameters({ options: { theme } })

setOptions({
  addonPanelInRight: true
})
function loadStories() {
  require("../src/stories")
}

configure(loadStories, module)
