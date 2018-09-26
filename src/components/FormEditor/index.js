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
import Download from "@axetroy/react-download"
import Menu from "@material-ui/core/Menu"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ErrorIcon from "@material-ui/icons/Error"
import InfoIcon from "@material-ui/icons/Info"
import DeleteIcon from "@material-ui/icons/Delete"
import CloseIcon from "@material-ui/icons/Close"
import green from "@material-ui/core/colors/green"
import amber from "@material-ui/core/colors/amber"
import IconButton from "@material-ui/core/IconButton"
import Snackbar from "@material-ui/core/Snackbar"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import WarningIcon from "@material-ui/icons/Warning"
import classNames from "classnames"
import { DragDropContext, DropTarget } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import { SortableTreeWithoutDndContext as SortableTreeDND } from "react-sortable-tree"
const trashAreaType = "yourNodeType"
const trashAreaSpec = {
  // The endDrag handler on the tree source will use some of the properties of
  // the source, like node, treeIndex, and path to determine where it was before.
  // The treeId must be changed, or it interprets it as dropping within itself.
  drop: (props, monitor) => ({ ...monitor.getItem(), treeId: "trash" })
}
const trashAreaCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true })
})

// The component will sit around the tree component and catch
// nodes dragged out
class trashAreaBaseComponent extends PureComponent {
  render() {
    const { connectDropTarget, children, isOver } = this.props

    return connectDropTarget(
      <div
        style={{
          background: isOver ? "pink" : "transparent"
        }}
      >
        {children}
      </div>
    )
  }
}
trashAreaBaseComponent.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isOver: PropTypes.bool.isRequired
}
const TrashAreaComponent = DropTarget(
  trashAreaType,
  trashAreaSpec,
  trashAreaCollect
)(trashAreaBaseComponent)
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}
const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
})

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  )
}
const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent)

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
            width: "100%"
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
            width: "100%"
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
            width: "100%"
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
            width: "100%"
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
            width: "100%"
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
const onEditorTempChange = new Subject()
const onEditorFieldChange = new Subject()
class FormEditor extends PureComponent {
  constructor(props) {
    super(props)
    onEditorChange
      .pipe(debounceTime(2000))
      .subscribe(this.setNode(this.setStyle))
    onEditorFieldChange
      .pipe(debounceTime(500))
      .subscribe(this.setNode(this.setFieldData))
    onEditorTempChange.pipe(debounceTime(300)).subscribe(this.setAceTemp)
    this.state = {
      selected: null,
      editor: {
        open: false,
        node: null,
        path: null
      },
      aceTemp: null,
      addMenuAnchor: null,
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
    let y = null
    try {
      y = yaml.safeLoad(value)
    } catch (exception) {
      console.log(exception)
      this.handleSnackbarOpen("error", exception.reason)
      return false
    }
    if (y) {
      node.style = y
      this.handleSnackbarOpen("success", "Sikeres fordítás!")
      return true
    }
  }
  setFieldData = (node, value) => {
    node.data[value.name] = value.value
    return true
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
    let success = false
    const newEditor = produce(this.state.editor, draft => {
      success = setter(draft.node, val)
    })
    if (success) {
      this.setState({
        tree: result,
        editor: newEditor,
        aceTemp: null
      })
    }
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

  setAceTemp = value => {
    console.log(value)
    this.setState({
      aceTemp: value
    })
  }
  onChange = val => {
    onEditorTempChange.next(val)
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
  addNode = (treeData, path, newNode) => {
    const newTree = addNodeUnderParent({
      treeData,
      parentKey: path[path.length - 1],
      expandParent: true,
      getNodeKey: this.getNodeKey,
      newNode,
      addAsFirstChild: true
    }).treeData
    console.log(newTree)
    this.convertToFieldTree(newTree)
  }
  openAddMenu = node => ev => {
    this.setState({
      addMenuAnchor: { node, target: ev.currentTarget }
    })
  }

  getNewField = type => {
    switch (type) {
      case "text":
        return {
          type: "text",
          id: uniqid(),
          title: `text`,
          data: {
            type: "text",
            label: "none",
            name: "none"
          }
        }
      case "div":
        return {
          type: "div",
          id: uniqid(),
          title: "div",
          style: {
            width: "100%"
          },
          children: []
        }
      case "select":
        return {
          type: "select",
          id: uniqid(),
          title: `select`,
          data: {
            type: "select",
            label: "none",
            name: "none",
            children: [
              {
                name: "1",
                value: "1"
              },
              {
                name: "2",
                value: "2"
              },
              {
                name: "3",
                value: "3"
              }
            ]
          }
        }
      case "switch":
        return {
          type: "switch",
          id: uniqid(),
          title: `switch`,
          data: {
            type: "switch",
            label: "none",
            name: "none"
          }
        }
      case "date":
        return {
          type: "date",
          id: uniqid(),
          title: `date`,
          data: {
            type: "date",
            label: "none",
            name: "none"
          }
        }
      case "time":
        return {
          type: "time",
          id: uniqid(),
          title: `time`,
          data: {
            type: "time",
            label: "none",
            name: "none"
          }
        }
    }
  }

  addNodeType = (type, treeData, path) => ev => {
    this.addNode(treeData, path, this.getNewField(type))
    console.log(type)
    this.setState({
      addMenuAnchor: {}
    })
  }
  closeAddMenu = () => {
    this.setState({
      addMenuAnchor: {}
    })
  }

  deleteNode = (node, path) => ev => {
    const tree = removeNodeAtPath({
      treeData: this.state.tree,
      path,
      getNodeKey: this.getNodeKey
    })
    this.setState({
      tree
    })
  }
  canDrop = ({ nextParent }) => {
    return !nextParent || nextParent.type === "div"
  }
  renderInfo = () => {
    const treeData = this.getTreeData()
    return (
      <div
        style={{
          height: "900px"
        }}
      >
        <SortableTreeDND
          treeData={treeData}
          onChange={this.convertToFieldTree}
          getNodeKey={this.getNodeKey}
          canDrop={this.canDrop}
          generateNodeProps={({ node, path }) => {
            if (node.type === "div") {
              return {
                buttons: [
                  <div>
                    <Button onClick={this.openAddMenu(node)}>Add</Button>
                    <Menu
                      key={node.id}
                      anchorEl={
                        this.state.addMenuAnchor &&
                        this.state.addMenuAnchor.target
                      }
                      open={Boolean(
                        this.state.addMenuAnchor &&
                          this.state.addMenuAnchor.node &&
                          this.state.addMenuAnchor.node.id === node.id
                      )}
                      onClose={this.closeAddMenu}
                    >
                      <MenuItem
                        onClick={this.addNodeType("div", treeData, path)}
                      >
                        div
                      </MenuItem>
                      <MenuItem
                        onClick={this.addNodeType("text", treeData, path)}
                      >
                        text
                      </MenuItem>
                      <MenuItem
                        onClick={this.addNodeType("select", treeData, path)}
                      >
                        select
                      </MenuItem>
                      <MenuItem
                        onClick={this.addNodeType("date", treeData, path)}
                      >
                        date
                      </MenuItem>
                      <MenuItem
                        onClick={this.addNodeType("time", treeData, path)}
                      >
                        time
                      </MenuItem>
                      <MenuItem
                        onClick={this.addNodeType("switch", treeData, path)}
                      >
                        switch
                      </MenuItem>
                    </Menu>
                  </div>,
                  <Button onClick={this.openEditor(node, path)}>Style</Button>,
                  <IconButton onClick={this.deleteNode(node, path)}>
                    <DeleteIcon />
                  </IconButton>
                ]
              }
            } else {
              return {
                buttons: [
                  <Button onClick={this.openEditor(node, path)}>Edit</Button>,
                  <IconButton onClick={this.deleteNode(node, path)}>
                    <DeleteIcon />
                  </IconButton>
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
  generateFile = () => {
    return yaml.safeDump(this.state.tree)
  }
  handleSnackbarOpen = (type, message) => {
    this.setState({
      snackBarOpen: true,
      snackBarType: type,
      snackBarMessage: message
    })
  }
  handleSnackbarClose = () => {
    this.setState({
      snackBarOpen: false
    })
  }

  onFileUpload = ev => {
    const file = ev.target.files[0]
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      const content = fileReader.result
      try {
        const tree = yaml.safeLoad(content)
        this.setState({
          tree
        })
        this.handleSnackbarOpen("success", "Sikeres beolvasás!")
      } catch (exception) {
        this.handleSnackbarOpen("error", exception.reason)
      }
    }
    fileReader.readAsText(file)
  }
  render() {
    const { classes } = this.props
    const { editor } = this.state
    const elements = this.renderTree(this.state.tree)
    console.log(this.state.tree)
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant={this.state.snackBarType}
            message={this.state.snackBarMessage}
          />
        </Snackbar>
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
                focus={true}
                theme="monokai"
                name="blah2"
                onLoad={this.onLoad}
                onChange={this.onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={this.state.aceTemp || this.getStyleValue()}
                style={{
                  width: "300px",
                  height: "100%"
                }}
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
          <div className={classes.content}>
            <TrashAreaComponent>{elements}</TrashAreaComponent>
          </div>
          <div className={classes.sideBar}>{this.renderInfo()}</div>
        </div>
        <Download file={"test.yaml"} content={this.generateFile()}>
          <Button>Download</Button>
        </Download>
        <input
          type={"file"}
          id={"raised-button-file"}
          onChange={this.onFileUpload}
        />
      </div>
    )
  }
}

FormEditor.propTypes = {}
const styledFormEditor = withStyles(styles)(FormEditor)
export default DragDropContext(HTML5Backend)(styledFormEditor)

/*



 */
