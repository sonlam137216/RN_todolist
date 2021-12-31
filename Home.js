import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { uuid } from 'react-native-uuid';

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
  deleteDoc,
  orderBy,
} from 'firebase/firestore';

const Home = ({ navigation }) => {
  const [lists, setLists] = useState([]);

  const userCollectionRef = collection(db, 'users');

  // create new Todo
  const createNewTodo = async (list) => {
    await addDoc(userCollectionRef, {
      ...list,
      todos: [],
    });
    await getUsers();
  };

  // update todos
  const updateTodos = async (list, todos) => {
    const userDoc = doc(db, 'users', list.id);
    const newFields = { todos: todos };
    await updateDoc(userDoc, newFields);
    await getUsers();
  };

  // delete list
  const deleteList = async (id) => {
    const userDoc = doc(db, 'users', id);
    deleteDoc(userDoc);
    await getUsers();
  };
  const getUsers = async () => {
    const data = await getDocs(userCollectionRef, orderBy('name', 'desc'));
    setLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  // get Data
  useEffect(() => {
    getUsers();
  }, []);

  const updateList = (list) => {
    const newLists = lists.map((item) => {
      return item.id == list.id ? list : item;
    });
    setLists(newLists);
  };

  const renderList = (list) => {
    return (
      <TodoList
        list={list}
        updateList={updateList}
        updateTodos={updateTodos}
        deleteList={deleteList}
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
          onPress={() => {
            navigation.navigate('AddListModal', { createNewTodo });
          }}
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
};

export default Home;

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
