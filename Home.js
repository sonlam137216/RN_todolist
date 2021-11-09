import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import TodoList from './components/TodoList';
import colors from './Colors';
import AddListModal from './components/AddListModal';
import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';

const Home = ({ navigation }) => {
  const [lists, setLists] = useState([]);

  const userCollectionRef = collection(db, 'users');

  // create new Todo
  const createNewTodo = async (list) => {
    await addDoc(userCollectionRef, {
      ...list,
      id: lists.length + 1,
      todos: [],
    });
  };

  // update completed task
  const updateUsers = async (id, todos) => {
    const userDoc = doc(db, 'users', id);
    const newFields = { todos: todos };
    await updateDoc(userDoc, newFields);
  };

  // update add new task
  const updateNewTask = async (id, todos) => {
    const userDoc = doc(db, 'users', id);
    const newFields = { todos: todos };
    await updateDoc(userDoc, newFields);
  };

  // get Data
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  

  const addList = (list) => {
    setLists([...lists, { ...list, id: lists.length + 1, todos: [] }]);
  };

  const updateList = (list) => {
    const newLists = lists.map((item) => {
        console.log(item.id);
      return item.id === list.id ? list : item;
    });
    setLists(newLists);
  };

  const renderList = (list) => {
    return (
      <TodoList
        list={list}
        listId={list.id}
        updateList={updateList}
        updateUsers={updateUsers}
        updateNewTask={updateNewTask}
        navigation={navigation}
      />
    );
  };

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo{' '}
          <Text style={{ fontWeight: '300', color: colors.blue }}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>

      <View style={{ marginVertical: 40 }}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() => { navigation.navigate("AddListModal", {addList, createNewTodo}) }}
        >
          <AntDesign name="plus" size={16} color={colors.blue} />
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{ height: 275, paddingLeft: 32 }}>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
});
