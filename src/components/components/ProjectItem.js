/* eslint no-underscore-dangle: 0 */

import React from "react"
import { View, Text, StyleSheet } from "react-native"
import realm from "../../Database/Database"
import CounterTasks from "./CounterTasks"
import colors from "../../styles/colorsLightTheme"

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    borderTopWidth: 1,
    backgroundColor: colors.primeColor,
    borderColor: colors.secondColor,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleTask: {
    flex: 2,
    fontSize: 16,
    fontFamily: "OpenSansSemiBold",
    color: colors.textColor,
    overflow: "hidden",
  },
})

const ProjectItem = (props) => {
  const { itemID } = props
  const project = realm.objectForPrimaryKey("Project", itemID)
  return (
    <>
      <View style={[styles.container]}>
        <Text numberOfLines={1} style={styles.titleTask}>
          {project.title}
        </Text>
        <CounterTasks project={project._id} backgroundColor="rgb(83,211,175)" />
      </View>
    </>
  )
}

/*
export default class ProjectItem extends React.Component {
  constructor(props) {
    super(props)
    project = realm.objectForPrimaryKey("Project", this.props.item_id)
  }

  changeTitleHandler = (value) => {
    this.setState({ inputTitle: value })
  }

   
  submitTitleHandler = () => {
    if (
      this.state.inputTitle !== "" &&
      this.state.inputTitle.trim().length > 0
    ) {
      realm.write(() => {
        this.project.title = this.state.inputTitle
      })
      Keyboard.dismiss()
      this.setState({
        errorInputTitle: false,
      })
    } else {
      this.setState({
        errorInputTitle: true,
      })
    }
  }


  render() {
    return (
      <>
        <View style={[styles.container]}>
          <Text numberOfLines={1} style={styles.titleTask}>
            {this.project.title}
          </Text>
          <CounterTasks
            project={this.project._id}
            backgroundColor="rgb(83,211,175)"
          />
        </View>
      </>
    )
  }
}

*/

export default ProjectItem
