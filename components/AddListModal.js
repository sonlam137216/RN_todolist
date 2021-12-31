import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Colors';

const AddListModal = ({ navigation, route }) => {
  const { createNewTodo } = route.params;
  const backgroundColors = [
    '#5CD859',
    '#24A6D9',
    '#595BD9',
    '#8022D9',
    '#D159D8',
    '#D85963',
    '#D88559',
  ];

  const [color, setColor] = useState(backgroundColors[0]);
  const [name, setName] = useState('');

  const renderColor = () => {
    return backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => setColor(color)}
        />
      );
    });
  };

  const createTodo = () => {
    if(name === "") {
      alert("Please enter string!");
      return;
    }
      const list = {name, color};
      createNewTodo(list);
      setName("");
      navigation.goBack();
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height ">
      <TouchableOpacity
        style={{ position: 'absolute', top: 64, right: 32 }}
        onPress={() => {navigation.goBack()}}
      >
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>

      <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
        <Text style={styles.title}>Create Todo List</Text>

        <TextInput
          style={styles.input}
          placeholder="List Name?"
          onChangeText={(text) => setName(text)}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
          {renderColor()}
        </View>

        <TouchableOpacity style={[styles.create, {backgroundColor: color}]} onPress={() => createTodo()}>
          <Text style={{ color: colors.white, fontWeight: '600' }}>
            Create!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default AddListModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.black,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});