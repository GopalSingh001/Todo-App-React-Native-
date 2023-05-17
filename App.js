import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editTodo, seteditTodo] = useState(null);

  const handleAddTodo = () => {
    if (text.trim() === '') {
      return;
    }

    if (editTodo) {
      // Editing existing todo
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editTodo ? { ...todo, text } : todo
        )
      );
      seteditTodo(null);
    } else {
      // Adding new todo
      const newTodo = {
        id: Date.now().toString(),
        text: text.trim(),
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }

    setText('');
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setText(todoToEdit.text);
      seteditTodo(todoToEdit.id);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text>{item.text}</Text>
      <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEditTodo(item.id)}>
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.todoList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Enter a todo"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>{editTodo ? 'Edit' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  todoList: {
    marginTop: 20,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    color: 'red',
  },
  editButton: {
    color: 'blue',
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
  },
});

export default App;
