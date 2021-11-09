import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../Colors';

const TodoList = ({ list, listId, updateList, updateUsers, updateNewTask, navigation }) => {

  const completedCount = list.todos.filter((todo) => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;

  return (
    <View>
      <TouchableOpacity
        style={[styles.listContainer, { backgroundColor: list.color }]}
        onPress={() => { navigation.navigate('TodoModal', { list, listId, updateList, updateNewTask, updateUsers })}}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>

        <View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subTitle}>Remaining</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subTitle}>completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default TodoList;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: '200',
    color: colors.white,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});
