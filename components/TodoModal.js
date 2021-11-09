import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../Colors';

const TodoModal = ({ route, navigation }) => {
  const { list, listId, updateList, updateNewTask, updateUsers } = route.params;
  const taskCount = list.todos.length;
  const completedCount = list.todos.filter((todo) => todo.completed).length;

  const [newTodo, setNewTodo] = useState("");

  const toggleTodoCompleted = index => {
    list.todos[index].completed = !list.todos[index].completed;
    updateUsers(listId, list.todos);
    updateList(list);
  }

  const addTodo = () => {
    if(newTodo === "") {
      alert("Please enter string!");
      return;
    }

    list.todos.push({title: newTodo, completed: false});
    updateList(list);
    updateNewTask(listId, list.todos);
    setNewTodo("");
    Keyboard.dismiss();
  }

  const deleteLocalTask = (id) => {
    list.todos.splice(id, 1);
    updateList(list);
    updateNewTask(listId, list.todos);
  }

  const renderTodo = (todo, index) => {
    return (
      <View style={[styles.todoContainer, {backgroundColor: list.color}]}>
        <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
          <Ionicons
            name={todo.completed ? 'ios-checkbox-outline' : 'ios-square-outline' }
            size={24}
            color={colors.white}
            style={{ width: 32 }}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.todo,
            {
              color: todo.completed ? colors.black : colors.white,
              textDecorationLine: todo.completed ? 'line-through' : 'none',
            },
          ]}
        >
          {todo.title}
        </Text>
        <TouchableOpacity onPress={() => deleteLocalTask(index)}>
          <Ionicons name="ios-trash-outline" size={24} color={colors.white} style={{ width: 32}} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
          onPress={() => { navigation.goBack() }}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View
          style={
            ([styles.section, styles.header], { borderBottomColor: list.color })
          }
        >
          <Text style={styles.title}>{list.name}</Text>
          <Text style={styles.taskCount}>
            {completedCount} of {taskCount} Tasks
          </Text>
        </View>

        <View style={[styles.section, { flex: 4 }]}>
          <FlatList
            data={list.todos}
            renderItem={({ item, index }) => renderTodo(item, index)}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 64,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={[styles.section, styles.footer]} behavior="padding">
          <TextInput style={[styles.input, { borderColor: list.color }]} onChangeText={text => setNewTodo(text)} value={newTodo} />
          <TouchableOpacity
            style={[styles.addTodo, { backgroundColor: list.color }]}
            onPress={() => addTodo()}
          >
            <AntDesign name="plus" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default TodoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 64,
  },
  section: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    fontWeight: '600',
    color: colors.gray,
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoContainer: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  todo: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 20,
    marginRight: 50,
  },
});
