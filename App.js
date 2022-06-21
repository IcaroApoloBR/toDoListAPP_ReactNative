import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar, View, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import TaskList from './src/components/TaskList';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTask] = useState([
    { key: 1, task: 'Comprar' },
    { key: 2, task: 'Vender' },
    { key: 3, task: 'Alugar' },
  ]);
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0000CD" barStyle="light" />

      <View style={styles.content}>
        <Text style={styles.title}>To Do List!</Text>
      </View>

      <FlatList
        marginHorizontal={10}
        data={task}
        // showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => <TaskList data={item} />}
      />

      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons style={{ marginLeft: 5, marginRight: 5 }} name="md-arrow-back" size={40} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Task</Text>
          </View>

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
    backgroundColor: '#171d31',
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
    backgroundColor: '#0094ff',
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
    backgroundColor: '#171d31',
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
  }
});
