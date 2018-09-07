import { configure } from "@storybook/react"
import { setOptions } from "@storybook/addon-options"
import { addDecorator } from "@storybook/react"

setOptions({
  addonPanelInRight: true
})
function loadStories() {
  require("../src/stories")
}

configure(loadStories, module)
