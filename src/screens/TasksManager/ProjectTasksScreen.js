/* eslint-disable react/no-unstable-nested-components */

import React, { useEffect, useRef } from "react"
import { useFocusEffect } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialIcons"
import withObservables from "@nozbe/with-observables"
import { compose } from "recompose"
import { database } from "../../database/database"
import ProjectPage from "../../components/Items/Project/ProjectPage"
import TasksList from "../../components/List/TasksList"

const ProjectTasks = ({ navigation, project, tasks }) => {
  const projectPageRef = useRef()

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerRight: () => (
          <Icon
            style={{ paddingRight: 15 }}
            color="rgb(0,0,0)"
            size={24}
            onPress={() => projectPageRef.current.openProjectPage()}
            name="info-outline"
          />
        ),
      })
      return () =>
        navigation.setOptions({
          headerRight: () => null,
        })
    }, [navigation])
  )

  useEffect(() => {
    navigation.setOptions({
      headerTitle: project.name,
    })
  }, [project.name])

  return (
    <>
      <TasksList tasks={tasks} displayProject={false} />
      <ProjectPage project={project} ref={projectPageRef} />
    </>
  )
}

const enhance = compose(
  withObservables(
    ["projectID"],
    ({
      route: {
        params: { projectID },
      },
    }) => ({
      project: database.get("projects").findAndObserve(projectID),
    })
  ),
  withObservables(["project"], ({ project }) => ({
    tasks: project.tasks,
  }))
)

const ProjectTasksScreen = enhance(ProjectTasks)

export default ProjectTasksScreen
//
