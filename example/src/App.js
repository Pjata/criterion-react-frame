import React, { Component } from "react"
import CriterionFrame from "criterion-frame"
import HomeIcon from "@material-ui/icons/Home"
import FileIcon from "@material-ui/icons/FileCopy"
import TagMultipleIcon from "@material-ui/icons/RemoveRedEye"
class App extends Component {
  render() {
    return (
      <div>
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
          title={"asd"}
          onLogout={console.log}
          userInfo={{
            userName: "hello world"
          }}
          onItemSelected={console.log}
        >
          hello world
        </CriterionFrame>
      </div>
    )
  }
}
export default App
