import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import AceEditor from "react-ace"
import brace from "brace"
import yaml from "js-yaml"
import "brace/mode/yaml"
import "brace/theme/monokai"
import { withStyles } from "@material-ui/core/styles"
import styled from "styled-components"
import { Subject } from "rxjs"
import { debounceTime } from "rxjs/operators"
import TypeField from "../Form/TypeField"
import { MenuItem } from "@material-ui/core"

const styles = {
  container: {
    display: "flex",
    width: "100%"
  },
  content: {
    width: "100%",
    flexGrow: 1
  },
  sideBar: {
    width: "100%",
    flexGrow: 1
  }
}
const getTreeFromLS = () => {
  const treeJSON = localStorage.getItem("formeditor")
  if (treeJSON) {
    try {
      const tree = yaml.safeLoad(treeJSON)
      return tree
    } catch (e) {}
  }
  return [
    {
      style: {
        width: "100%"
      },
      children: [
        {
          style: {
            width: "100%",
            height: "100%"
          },
          children: {
            type: "text",
            data: {
              label: "hello",
              name: "hello"
            }
          }
        },
        {
          style: {
            width: "100%",
            height: "100%"
          },
          children: {
            type: "date",
            data: {
              label: "date",
              name: "date"
            }
          }
        },
        {
          style: {
            width: "100%",
            height: "100%"
          },
          children: {
            type: "switch",
            data: {
              label: "switch",
              name: "switch"
            }
          }
        },
        {
          style: {
            width: "100%",
            height: "100%"
          },
          children: {
            type: "time",
            data: {
              label: "time",
              name: "time"
            }
          }
        },
        {
          style: {
            width: "100%",
            height: "100%"
          },
          children: {
            type: "select",
            data: {
              label: "select",
              name: "select",
              children: [
                {
                  name: "Egy",
                  value: 1
                },
                {
                  name: "Ketto",
                  value: 2
                },
                {
                  name: "Harom",
                  value: 3
                }
              ]
            }
          }
        }
      ]
    }
  ]
}
const onEditorChange = new Subject()
class FormEditor extends PureComponent {
  constructor(props) {
    super(props)
    onEditorChange.pipe(debounceTime(3000)).subscribe(this.setTree)
    this.state = {
      selected: null,
      tree: getTreeFromLS()
    }
  }
  onSelect = item => ev => {
    console.log(item)
    ev.stopPropagation()
    this.setState({
      selected: item
    })
  }
  renderTree = tree => {
    if (Array.isArray(tree) && tree.length !== 0) {
      return tree.map(child => {
        const StyledDiv = styled.div`
          ${child.style};
        `
        return (
          <StyledDiv key={Math.random()} onClick={this.onSelect(child)}>
            {this.renderTree(child.children)}
          </StyledDiv>
        )
      })
    } else {
      return this.getElement(tree)
    }
  }

  getElement = obj => {
    const { type, data } = obj
    switch (type) {
      case "label":
        return <div>{data.label}</div>
      case "text":
        return <TypeField name={data.name} label={data.label} />
      case "date":
        return <TypeField name={data.name} label={data.label} type={"date"} />
      case "switch":
        return <TypeField name={data.name} label={data.label} type={"switch"} />
      case "time":
        return <TypeField name={data.name} label={data.label} type={"time"} />
      case "select":
        return (
          <TypeField name={data.name} label={data.label} type={"select"}>
            {data.children.map(child => (
              <MenuItem key={child.value} value={child.value}>
                {child.name}
              </MenuItem>
            ))}
          </TypeField>
        )
    }
  }
  onCSSEdit = val => {}
  onLoad = () => {}
  getCSSFromStyled = css => {
    return `container {
      ${css}
    }`
  }
  setTree = val => {
    console.log("asd")
    try {
      const tree = yaml.safeLoad(val)
      this.setState({
        tree
      })
      localStorage.setItem("formeditor", val)
    } catch (e) {}
  }
  onChange = val => {
    onEditorChange.next(val)
  }
  renderInfo = () => {
    return (
      <div>
        <AceEditor
          mode="yaml"
          theme="monokai"
          name="blah2"
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={yaml.safeDump(this.state.tree)}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}
        />
      </div>
    )
  }
  render() {
    const { classes } = this.props
    const elements = this.renderTree(this.state.tree)
    console.log(elements)
    return (
      <div className={classes.container}>
        <div className={classes.content}>{elements}</div>
        <div className={classes.sideBar}>{this.renderInfo()}</div>
      </div>
    )
  }
}

FormEditor.propTypes = {}

export default withStyles(styles)(FormEditor)
