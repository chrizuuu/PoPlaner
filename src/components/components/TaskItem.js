import React from "react"
import {
  View,
  Text,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native"
import realm, {
  changePriority,
  updateIsDone,
  deleteTask,
  getAllProjects,
} from "../../Database/realm"
import CheckBox from "../Buttons/CheckBox"
import { Picker } from "@react-native-picker/picker"
import DatePicker from "react-native-date-picker"
import { Icon } from "react-native-elements"
import Modal from "react-native-modal"
import sharedStyles from "../../styles/shared"
import FlexLayout from "../Layouts/FlexLayout"
import PropertyItem from "../components/PropertyItem"
import { strings } from "../../translations/translations"
import CustomizingHeaderBar from "../Header/CustomizingHeaderBar"
import ErrorText from "../Text/ErrorText"
import TaskPropertyOnList from "./TaskPropertyOnList"
import colors from "../../styles/colorsLightTheme"
import { TouchableWithoutFeedback } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1.5,
    borderColor: colors.secondColor,
    backgroundColor: colors.primeColor,
  },
  wrapperInRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  titleTask: {
    flex: 1,
    fontSize: 14,
    fontFamily: "OpenSansSemiBold",
    color: colors.textColor,
    overflow: "hidden",
    textAlignVertical: "center",
  },

  modalFooter: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  saveBtn: {
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "rgb(83,211,175)",
    borderRadius: 5,
    fontFamily: "OpenSansSemiBold",
    fontSize: 13,
  },

  wrapperSettingsItem: {
    backgroundColor: colors.secondColor,
  },

  commentInput: {
    textAlignVertical: "top",
    minHeight: 200,
    maxHeight: 300,
    width: "100%",
    borderColor: colors.secondColor,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.primeColor,
  },

  commentInputWrapper: {
    position: "relative",
    width: "100%",
    top: 20,
    margin: 0,
    padding: 0,
    backgroundColor: colors.secondColor,
  },

  commentInputFocusWrapper: {
    position: "absolute",
    backgroundColor: colors.secondColor,
    width: "100%",
    top: 20,
    left: 0,
    right: 0,
  },

  text: {
    fontSize: 12,
    fontFamily: "OpenSansReg",
  },
})

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputTitle: this.task.title,
      errorTitleStatus: false,
      inputComment: this.task.comment,
      inputCommentFocus: false,
      inputCommentBtn: false,
      errorCommentStatus: false,
      taskPageIsOpen: false,
      taskDeadlineDatePicker: false,
      dateInput: this.task.deadlineDate,
    }
  }

  task = realm.objectForPrimaryKey("Task", this.props.item_id)

  changeTitleHandler = (value) => {
    this.setState({ inputTitle: value })
  }

  submitTitleHandler = () => {
    if (
      this.state.inputTitle !== "" &&
      this.state.inputTitle.trim().length > 0
    ) {
      realm.write(() => {
        this.task.title = this.state.inputTitle
      })
      Keyboard.dismiss()
      this.setState({
        errorTitleStatus: false,
      })
    } else {
      this.setState({
        errorTitleStatus: true,
      })
    }
  }

  changeCommentHandler = (value) => {
    this.setState({
      inputComment: value,
      inputCommentBtn: true,
    })
  }

  commentInputTurnOn = () => {
    this.setState({
      inputCommentFocus: true,
      taskDeadlineDatePicker: false,
    })
  }

  commentInputDismiss = () => {
    this.setState({
      inputCommentFocus: false,
      inputCommentBtn: false,
      errorCommentStatus: false,
    })
    Keyboard.dismiss()
  }

  submitCommentHandler = () => {
    if (
      this.state.inputComment !== "" &&
      this.state.inputComment.trim().length > 0
    ) {
      realm.write(() => {
        this.task.comment = this.state.inputComment
      })
      this.commentInputDismiss()
      Keyboard.dismiss()
    } else {
      this.setState({
        errorCommentStatus: true,
      })
    }
  }

  setTaskPageIsOpen = (visible) => {
    this.setState({
      taskPageIsOpen: visible,
    })
    this.commentInputDismiss()
    // provide information about taskPageIsOpen
    //this.props.provideModalVisibleStatus(visible)
  }

  saveProject = (value) => {
    realm.write(() => {
      let taskToDelete = this.task.project.tasks.indexOf(this.task)
      this.task.project.tasks.splice(taskToDelete, 1)
      value.tasks.push(this.task)
      this.task.project = value
    })
  }

  setDeadlineDate = (value) => {
    realm.write(() => {
      this.task.deadlineDate = value
    })
    this.setState({
      taskDeadlineDatePicker: false,
    })
  }

  render() {
    let priorityTaskStatus =
      this.task.priority === true
        ? { color: "rgb(83,211,175)", icon: "star" }
        : { color: "rgba(48,48,48,0.3)", icon: "star-border" }

    let isDoneTaskOpacity = this.task.isDone === true ? 0.4 : 1
    let displayDatePicker = this.state.taskDeadlineDatePicker ? "flex" : "none"
    let focusCommentInput = this.state.inputCommentFocus
      ? styles.commentInputFocusWrapper
      : styles.commentInputWrapper
    let projects = realm.objects("Project")
    return (
      <>
        <Pressable
          onPress={() => this.setTaskPageIsOpen(!this.state.taskPageIsOpen)}
        >
          <View style={[styles.container, { opacity: isDoneTaskOpacity }]}>
            <View style={[sharedStyles.padding10, styles.wrapperInRow]}>
              <CheckBox
                status={this.task.isDone}
                onChange={() => updateIsDone(this.task)}
                style={{ marginRight: 20 }}
              />

              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={styles.titleTask}>
                  {this.task.title}
                </Text>

                <View style={{ flexDirection: "row" }}>
                  {this.task.deadlineDate ? (
                    <TaskPropertyOnList
                      icon="today"
                      propertyName={this.task.deadlineDate.toLocaleDateString()}
                    />
                  ) : null}

                  {this.task.project && this.props.displayProjectProperty ? (
                    <TaskPropertyOnList
                      icon="flag"
                      propertyName={this.task.project.title}
                    />
                  ) : null}
                </View>
              </View>

              <Icon
                type="material"
                name={priorityTaskStatus.icon}
                iconStyle={{
                  marginLeft: 15,
                  color: priorityTaskStatus.color,
                }}
                size={28}
                onPress={() => changePriority(this.task)}
              />
            </View>
          </View>
        </Pressable>
        <Modal
          animationIn="slideInRight"
          animationOut="slideOutRight"
          swipeDirection="right"
          isVisible={this.state.taskPageIsOpen}
          onSwipeComplete={() =>
            this.setTaskPageIsOpen(!this.state.taskPageIsOpen)
          }
          onBackdropPress={() =>
            this.setTaskPageIsOpen(!this.state.taskPageIsOpen)
          }
          style={sharedStyles.modalContainer}
        >
          <FlexLayout style={{ backgroundColor: colors.primeColor }}>
            <CustomizingHeaderBar
              style={sharedStyles.paddingSide25}
              leftSide={
                <CheckBox
                  status={this.task.isDone}
                  onChange={() => updateIsDone(this.task)}
                  style={{ marginRight: 20 }}
                />
              }
              centerSide={
                <>
                  <TextInput
                    style={[styles.titleTask, { marginLeft: 25 }]}
                    name="input"
                    maxLength={100}
                    defaultValue={this.task.title}
                    onChangeText={(input) => this.changeTitleHandler(input)}
                    onSubmitEditing={() => {
                      this.submitTitleHandler()
                    }}
                  />
                  {this.state.errorTitleStatus === true ? (
                    <ErrorText errorValue={strings("inputEmptyError")} />
                  ) : null}
                </>
              }
              rightSide={
                <Icon
                  type="material"
                  name={priorityTaskStatus.icon}
                  iconStyle={{
                    color: priorityTaskStatus.color,
                  }}
                  size={28}
                  onPress={() => changePriority(this.task)}
                />
              }
            />
            <TouchableWithoutFeedback
              onPress={() => this.commentInputDismiss()}
            >
              <View
                style={[sharedStyles.wrapperFlex, styles.wrapperSettingsItem]}
              >
                <PropertyItem
                  style={sharedStyles.paddingSide10}
                  valueIcon="outlined-flag"
                  valueTitle={strings("taskPropertyProject")}
                  valueContainer={
                    <>
                      <Picker
                        style={{ textAlign: "right" }}
                        onValueChange={(itemValue) =>
                          this.saveProject(itemValue)
                        }
                      >
                        <Picker.Item
                          style={{ fontSize: 15, color: "#242424" }}
                          label={this.task.project.title}
                          v
                          value={this.task.project}
                          enabled={false}
                        />
                        {projects.map((item) => (
                          <Picker.Item
                            style={{ fontSize: 13 }}
                            key={item._id}
                            label={item.title}
                            value={item}
                          />
                        ))}
                      </Picker>
                    </>
                  }
                />
                <PropertyItem
                  style={sharedStyles.paddingSide10}
                  valueIcon="today"
                  valueTitle={strings("taskPropertyDate")}
                  onPress={() =>
                    this.setState({
                      taskDeadlineDatePicker:
                        !this.state.taskDeadlineDatePicker,
                    })
                  }
                  valueContainer={
                    <Text style={{ textAlign: "right" }}>
                      {this.task.deadlineDate
                        ? this.task.deadlineDate.toLocaleDateString()
                        : ""}
                    </Text>
                  }
                />
                <View
                  style={[
                    sharedStyles.paddingSide10,
                    { display: displayDatePicker, alignItems: "flex-end" },
                  ]}
                >
                  <DatePicker
                    style={{
                      backgroundColor: "rgb(255,255,255)",
                    }}
                    mode="date"
                    minimumDate={new Date()}
                    date={
                      this.state.dateInput ? this.state.dateInput : new Date()
                    }
                    onDateChange={(value) =>
                      this.setState({
                        dateInput: value,
                      })
                    }
                  />
                  <Text
                    style={[styles.saveBtn, { marginTop: 10 }]}
                    onPress={() => this.setDeadlineDate(this.state.dateInput)}
                  >
                    {strings("save")}
                  </Text>
                </View>
                <View style={[focusCommentInput, sharedStyles.paddingSide10]}>
                  <View
                    style={[
                      sharedStyles.wrapperInLine,
                      {
                        justifyContent: "space-between",
                        backgroundColor: colors.primeColor,
                        height: 50,
                        paddingHorizontal: 15,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontFamily: "OpenSansSemiBold",
                        fontSize: 14,
                      }}
                    >
                      {strings("taskPropertyComment")}
                    </Text>
                    {this.state.inputCommentBtn === true ? (
                      <Text
                        style={styles.saveBtn}
                        onPress={() => {
                          this.submitCommentHandler()
                        }}
                      >
                        {strings("saveComment")}
                      </Text>
                    ) : null}
                  </View>
                  <TextInput
                    onFocus={() => this.commentInputTurnOn()}
                    onBlur={() => this.commentInputDismiss()}
                    style={styles.commentInput}
                    name="input"
                    multiline={true}
                    maxLength={1000}
                    defaultValue={this.task.comment}
                    onChangeText={(input) => this.changeCommentHandler(input)}
                    placeholder={strings("addComment")}
                  />
                  {this.state.errorCommentStatus === true ? (
                    <ErrorText errorValue={strings("inputEmptyError")} />
                  ) : null}

                  <Text style={[sharedStyles.padding10, styles.text]}>
                    {strings("taskCreatedAt")}
                    {this.task.createdDate.toLocaleDateString() +
                      " " +
                      this.task.createdDate.toLocaleTimeString()}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={[styles.modalFooter, sharedStyles.padding10]}>
              <Icon
                name="arrow-forward"
                color="#484848"
                size={28}
                onPress={() =>
                  this.setTaskPageIsOpen(!this.state.taskPageIsOpen)
                }
              />
              <Icon
                name="delete-outline"
                color="#EE5436"
                size={28}
                onPress={() => deleteTask(this.task)}
              />
            </View>
          </FlexLayout>
        </Modal>
      </>
    )
  }
}
