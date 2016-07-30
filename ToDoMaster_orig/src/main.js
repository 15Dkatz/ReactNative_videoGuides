import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from 'react-native';

module.exports = React.createClass({
  getInitialState() {
    return {
      tasks: ['Take out the trash', 'Get groceries', 'Send Mail'],
      completedTasks: [],
      text: ''
    }
  },

  componentWillMount() {
    AsyncStorage.getItem('tasks')
      .then((response) => {
        this.setState({tasks: JSON.parse(response)})
      });
    AsyncStorage.getItem('completedTasks')
      .then((response) => {
        this.setState({completedTasks: JSON.parse(response)})
      });
  },

  setStorage() {
    // set the tasks and completedTasks in local storage
    AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    AsyncStorage.setItem('completedTasks', JSON.stringify(this.state.completedTasks));
  },

  renderList(tasks) {
    return (
      tasks.map((task, index) => {
        return (
          <View key={task} style={styles.task}>
            <Text>
              {task}
            </Text>
            <TouchableOpacity
              onPress={()=>this.completeTask(task, index)}
            >
              <Text>
                &#10003;
              </Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  },

  renderCompleted(tasks) {
    return (
      tasks.map((task, index) => {
        return (
          <View style={styles.task} key={task}>
            <Text style={styles.completedTask}>
              {task}
            </Text>
            <TouchableOpacity
              onPress={()=>this.deleteTask(index)}
            >
              <Text>
                &#10005;
              </Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  },

  deleteTask(index) {
    let completedTasks = this.state.completedTasks;
    completedTasks = completedTasks.slice(0, index).concat(completedTasks.slice(index+1));
    this.setState({completedTasks});
    this.setStorage();
  },

  completeTask(task, index) {
    let completedTask = this.state.tasks[index];
    let completedTasks = this.state.completedTasks.concat([completedTask]);
    let tasks = this.state.tasks;
    tasks = tasks.slice(0, index).concat(tasks.slice(index+1));
    this.setState({
      tasks,
      completedTasks
    })
    this.setStorage();
  },

  addTask() {
    // add the current text to the this.state.tasks
    let newTask = this.state.text;
    let tasks = this.state.tasks.concat(newTask);
    this.setState({tasks});
    this.setStorage();
  },

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>To-Do Master</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Add a task...'
          onChangeText={(text) => {
            this.setState({text});
          }}
          onEndEditing={()=>this.addTask()}
        />
        {this.renderList(this.state.tasks)}
        {this.renderCompleted(this.state.completedTasks)}
      </ScrollView>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 40
  },
  title: {
    fontSize: 18
  },
  task: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 20
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    margin: 30,
    marginBottom: 0
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#555'
  }
})
