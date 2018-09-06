import { configure } from "@storybook/react"
import { setOptions } from "@storybook/addon-options"

setOptions({
  addonPanelInRight: true
})
function loadStories() {
  require("../src/stories")
}

configure(loadStories, module)
