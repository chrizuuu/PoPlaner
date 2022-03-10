/* eslint-disable object-shorthand */
import React, { useRef } from "react"
import { StyleSheet, Dimensions, View, FlatList } from "react-native"
import withObservables from "@nozbe/with-observables"
import ProjectItem from "../Items/Project/ProjectItem"
import FooterList from "../Components/FooterList"
import ProjectDAO from "../../database/DAO/ProjectDAO"
import ProjectInput from "../Inputs/ProjectInput"

const windowHeight = Dimensions.get("window").height

const ProjectsList = ({ projects }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: windowHeight,
    },
  })

  const projectInputRef = useRef()

  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProjectItem project={item} key={item.id} />
          )}
        />
        <FooterList
          leftIcon="add"
          leftIconOnPress={() => {
            projectInputRef.current.openProjectInput()
          }}
        />
      </View>
      <ProjectInput ref={projectInputRef} />
    </>
  )
}

const allProjects = withObservables([], () => ({
  projects: ProjectDAO.observeAllProjects(),
}))

export default allProjects(ProjectsList)
