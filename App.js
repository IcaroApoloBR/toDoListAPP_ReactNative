import React, { useState, useCallback, useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, SafeAreaView, StatusBar, View, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import TaskList from './src/components/TaskList';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  // GET ALL TASK WHEN APP INIT
  useEffect(() => {
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task');

      if (taskStorage) {
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();

  }, []);

  // SAVE TASK WHEN ALTERED
  useEffect(() => {
    async function saveTasks() {
      await AsyncStorage.setItem('@task', JSON.stringify(task));

    }

    saveTasks();

  }, [task]);

  function handleAdd() {
    if (input === '') return;

    const data = {
      key: input,
      task: input,
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');
  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6a040f" barStyle="light" />

      <View style={styles.content}>
        <Text style={styles.title}>To-Do List</Text>
      </View>

      <FlatList
        marginHorizontal={10}
        data={task}
        // showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => <TaskList data={item} handleDelete={handleDelete} />}
      />

      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons style={{ marginLeft: 5, marginRight: 5 }} name="md-arrow-back" size={40} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Task</Text>
          </View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              autoCorrect={false}
              placeholder="What do you need to do today?"
              style={styles.input}
              value={input}
              onChangeText={(text) => setInput(text)}
            />

            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text style={styles.handleAddText}>Add</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>
      </Modal>

      <AnimatedBtn style={styles.fab}
        animation="bounceInUp"
        duration={1500}
        useNativeDriver
        onPress={() => setOpen(true)}
      >
        <Ionicons name="ios-add" size={35} color="#FFF" />
      </AnimatedBtn>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6a040f',
  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#d00000',
    justifyContent: 'center',
    alignItems: 'center',
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    }
  },
  modal: {
    flex: 1,
    backgroundColor: '#6a040f',
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: '#fff'
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5,
  },
  handleAdd: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleAddText: {
    fontSize: 20,
  }
});
