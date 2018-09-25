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
import Button from "@material-ui/core/Button"
import Drawer from "@material-ui/core/Drawer"
import TextField from "@material-ui/core/TextField"
import uniqid from "uniqid"
import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath
} from "react-sortable-tree"
import "react-sortable-tree/style.css" // This only needs to be imported once in your app
import produce from "immer"

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
    console.log("asd")
    try {
      const tree = yaml.safeLoad(treeJSON)
      return tree
    } catch (e) {}
  }

  return [
    {
      id: uniqid(),
      type: "div",
      style: {
        width: "100%"
      },
      children: [
        {
          type: "div",
          id: uniqid(),
          style: {
            width: "100%",
            height: "100%"
          },
          children: [
            {
              type: "text",
              id: uniqid(),
              data: {
                label: "hello",
                name: "hello"
              }
            }
          ]
        },
        {
          type: "div",
          id: uniqid(),
          style: {
            width: "100%",
            height: "100%"
          },
          children: [
            {
              id: uniqid(),
              type: "date",
              data: {
                label: "date",
                name: "date"
              }
            }
          ]
        },
        {
          type: "div",
          id: uniqid(),
          style: {
            width: "100%",
            height: "100%"
          },
          children: [
            {
              type: "switch",
              id: uniqid(),
              data: {
                label: "switch",
                name: "switch"
              }
            }
          ]
        },
        {
          type: "div",
          id: uniqid(),
          style: {
            width: "100%",
            height: "100%"
          },
          children: [
            {
              type: "time",
              id: uniqid(),
              data: {
                label: "time",
                name: "time"
              }
            }
          ]
        },
        {
          type: "div",
          id: uniqid(),
          style: {
            width: "100%",
            height: "100%"
          },
          children: [
            {
              type: "select",
              id: uniqid(),
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
          ]
        }
      ]
    }
  ]
}
const onEditorChange = new Subject()
const onEditorFieldChange = new Subject()
class FormEditor extends PureComponent {
  constructor(props) {
    super(props)
    onEditorChange
      .pipe(debounceTime(3000))
      .subscribe(this.setNode(this.setStyle))
    onEditorFieldChange
      .pipe(debounceTime(1500))
      .subscribe(this.setNode(this.setFieldData))
    this.state = {
      selected: null,
      editor: {
        open: false,
        node: null,
        path: null
      },
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
    return tree.map(child => {
      if (child.type === "div") {
        let editingDivStyle = ``
        if (this.state.editor.open && this.state.editor.node.id === child.id) {
          editingDivStyle = `background: rgba(19, 98, 118, 0.3)`
        }
        const StyledDiv = styled.div`
          ${child.style};
          ${editingDivStyle};
        `
        return (
          <StyledDiv key={child.id} onClick={this.onSelect(child)}>
            {this.renderTree(child.children)}
          </StyledDiv>
        )
      } else {
        return this.getElement(child)
      }
    })
  }

  getElement = obj => {
    const { type, data, id } = obj
    const {
      editor: { node }
    } = this.state
    const style =
      node && node.id === id
        ? {
            background: `rgba(19, 98, 118, 0.3)`
          }
        : {}
    switch (type) {
      case "label":
        return <div style={style}>{data.label}</div>
      case "text":
        return <TypeField style={style} name={data.name} label={data.label} />
      case "date":
        return (
          <TypeField
            style={style}
            name={data.name}
            label={data.label}
            type={"date"}
          />
        )
      case "switch":
        return (
          <TypeField
            style={style}
            name={data.name}
            label={data.label}
            type={"switch"}
          />
        )
      case "time":
        return (
          <TypeField
            style={style}
            name={data.name}
            label={data.label}
            type={"time"}
          />
        )
      case "select":
        return (
          <TypeField
            style={style}
            name={data.name}
            label={data.label}
            type={"select"}
          >
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
  setStyle = (node, value) => {
    node.style = yaml.safeLoad(value)
  }
  setFieldData = (node, value) => {
    node.data[value.name] = value.value
  }
  setNode = setter => val => {
    console.log(val)
    console.log(this.state.editor.node)
    const found = this.findNodeById(this.state.tree, this.state.editor.node.id)
    console.log(found)
    const result = produce(this.state.tree, draft => {
      const [headIndex, ...indexes] = found.index
      let subItem = draft[headIndex]
      for (let i = 0; i < indexes.length; i++) {
        subItem = subItem.children[indexes[i]]
      }
      //subItem.style = yaml.safeLoad(val)
      setter(subItem, val)
    })
    const newEditor = produce(this.state.editor, draft => {
      setter(draft.node, val)
    })
    this.setState({
      tree: result,
      editor: newEditor
    })
  }

  findNodeById = (tree, id, pidx = []) => {
    const found = tree.reduce(
      (acc, curr, idx) => {
        if (acc.node) {
          return acc
        } else {
          if (curr.id === id) {
            return {
              node: curr,
              index: [...pidx, idx]
            }
          } else if (curr.children) {
            return this.findNodeById(curr.children, id, [...pidx, idx])
          } else {
            return acc
          }
        }
      },
      { node: null, index: 0 }
    )
    return found
  }

  onChange = val => {
    onEditorChange.next(val)
  }
  renderTreeInfo = tree => {
    return tree.map(child => {
      if (child.type === "div") {
        return {
          title: "div",
          expanded: true,
          type: child.type,
          id: child.id,
          children: this.renderTreeInfo(child.children),
          style: child.style
        }
      } else {
        return {
          id: child.id,
          title: `${child.data.label} / ${child.data.name} (${child.type})`,
          expanded: true,
          type: child.type,
          data: child.data
        }
      }
    })
  }
  getTreeData = () => {
    const { tree } = this.state
    const converted = this.renderTreeInfo(tree)
    console.log(converted)
    return converted
  }
  convertTree = tree => {
    return tree.map(child => {
      if (child.type === "div") {
        return {
          type: "div",
          id: child.id,
          style: child.style,
          children: this.convertTree(child.children)
        }
      } else {
        return {
          type: child.type,
          data: child.data,
          id: child.id
        }
      }
    })
  }

  convertToFieldTree = tree => {
    const fieldTree = this.convertTree(tree)
    console.log(fieldTree)
    this.setState({
      tree: fieldTree
    })
  }
  openEditor = (node, path) => () => {
    this.setState({
      editor: {
        open: true,
        node,
        path
      }
    })
  }
  getNodeKey = ({ node }) => node.id
  addNode = (treeData, path) => ev => {
    const newTree = addNodeUnderParent({
      treeData,
      parentKey: path[path.length - 1],
      expandParent: true,
      getNodeKey: this.getNodeKey,
      newNode: {
        type: "text",
        id: uniqid(),
        title: `text`,
        data: {
          type: "text",
          label: "none",
          name: "none"
        }
      },
      addAsFirstChild: true
    }).treeData
    console.log(newTree)
    this.convertToFieldTree(newTree)
  }
  renderInfo = () => {
    const treeData = this.getTreeData()
    return (
      <div
        style={{
          height: "900px"
        }}
      >
        <SortableTree
          treeData={treeData}
          onChange={this.convertToFieldTree}
          getNodeKey={this.getNodeKey}
          generateNodeProps={({ node, path }) => {
            if (node.type === "div") {
              return {
                buttons: [
                  <Button onClick={this.addNode(treeData, path)}>
                    Add Child
                  </Button>,
                  <Button onClick={this.openEditor(node, path)}>Style</Button>
                ]
              }
            } else {
              return {
                buttons: [
                  <Button onClick={this.openEditor(node, path)}>Edit</Button>
                ]
              }
            }
          }}
        />
      </div>
    )
  }
  closeModal = () => {
    this.setState({
      editor: {
        open: false,
        node: null,
        path: null
      }
    })
  }
  getStyleValue = () => {
    const { editor } = this.state
    if (!editor.node) {
      return ""
    } else {
      const converted = yaml.safeDump(editor.node.style)
      return converted
    }
  }
  fieldChange = name => ev => {
    onEditorFieldChange.next({ name, value: ev.target.value })
  }
  getFieldEditor = () => {
    const {
      editor: { node }
    } = this.state
    return (
      <div>
        <TextField
          defaultValue={node.data.label}
          onChange={this.fieldChange("label")}
          fullWidth
          label={"Label"}
        />
        <TextField
          defaultValue={node.data.name}
          onChange={this.fieldChange("name")}
          fullWidth
          label={"DB Name"}
        />
      </div>
    )
  }
  render() {
    const { classes } = this.props
    const { editor } = this.state
    const elements = this.renderTree(this.state.tree)
    console.log(this.state.tree)
    return (
      <div>
        <Drawer
          open={editor.open}
          anchor={"right"}
          ModalProps={{
            hideBackdrop: true
          }}
          onClose={this.closeModal}
        >
          {editor.node &&
            editor.node.type === "div" && (
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
                value={this.getStyleValue()}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2
                }}
              />
            )}
          {editor.node && editor.node.type !== "div" && this.getFieldEditor()}
        </Drawer>
        <div className={classes.container}>
          <div className={classes.content}>{elements}</div>
          <div className={classes.sideBar}>{this.renderInfo()}</div>
        </div>
      </div>
    )
  }
}

FormEditor.propTypes = {}

export default withStyles(styles)(FormEditor)

/*



 */
