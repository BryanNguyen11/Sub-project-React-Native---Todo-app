import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, Platform, AccessibilityInfo,Modal,
  TextInput,
  Button, } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  const [taskGroups, setTaskGroups] = React.useState([
    {
      id: 1,
      title: "My Day",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b0dd5121d42a7f9b61e213c5b71e54c0ce76f6db6779d9abd80b16ca56feb75?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230",
      arrowIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9a7817385e4d2f7f7c0e06604b30f891a46332039ab7e7072765b6a0f02f6127?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230"
    },
    {
      id: 2,
      title: "Planned",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/85982965d3747ea94ab417d8ab4b9684174bd7e76fdea0f3b532ce205094c314?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230",
      arrowIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b72a09b04ffb7841c286fa914ec68b632873e11fcc2320a345eab09e592e1cc8?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230"
    },
    {
      id: 3,
      title: "Important",
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/85982965d3747ea94ab417d8ab4b9684174bd7e76fdea0f3b532ce205094c314?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230",
      arrowIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b72a09b04ffb7841c286fa914ec68b632873e11fcc2320a345eab09e592e1cc8?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230"
    }
  ]);
  const [showDelete, setShowDelete] = React.useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  const handleTaskGroupPress = (id) => {
    if (showDelete === id) {
      setShowDelete(null);
    } else {
      setShowDelete(id);
    }
  };
  const handleProjectsPress = () => {
    AccessibilityInfo.announceForAccessibility('Opening Todo App project details');
    navigation.navigate('InsidePJ'); // Điều hướng đến InsidePJ
  };
  

  const deleteTaskGroup = (id) => {
    setTaskGroups(taskGroups.filter(group => group.id !== id));
    setShowDelete(null);
  };

  const handleAddNewList = () => {
    setModalVisible(true);
    
  };
  const handleSaveNewTask = () => {
    if (newTaskTitle) {
      const newTask = {
        id: taskGroups.length + 1,
        title: newTaskTitle,
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b0dd5121d42a7f9b61e213c5b71e54c0ce76f6db6779d9abd80b16ca56feb75?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230",
        arrowIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9a7817385e4d2f7f7c0e06604b30f891a46332039ab7e7072765b6a0f02f6127?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230",
        dueDate: newTaskDueDate,
      };
      setTaskGroups([...taskGroups, newTask]);
      setModalVisible(false);
      setNewTaskTitle('');
      setNewTaskDueDate('');
    } else {
      AccessibilityInfo.announceForAccessibility("Task title is required");
    }
  };

  const handleAddNewProject = () => {
    setModalVisible(true);
  };

  const handleProjectPress = () => {
    AccessibilityInfo.announceForAccessibility('Opening Todo App project details');
  };

  return (
    <ScrollView 
      style={styles.container} 
      accessibilityRole="main"
      accessibilityLabel="Dashboard Screen"
    >
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.userInfo}>
            <Image
              resizeMode="contain"
              source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/ad60d7094935fcca212e5e3c9d26379ff70486bb2a4fe9c6fb157bc244727be7?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
              style={styles.profileImage}
              accessible={true}
              accessibilityLabel="Profile picture of Bryan Nguyen"
            />
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>Bryan Nguyen</Text>
            </View>
          </View>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Open menu"
            accessibilityRole="button"
          >
            <Image
              resizeMode="contain"
              source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/285cb629133ebffd9052fe265fe459ad58658e6d53cca398d282911cb22fc054?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.dateText}>Monday, 1st November 2024</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} accessibilityRole="header">Dashboard</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">Tasks Group</Text>
          <View style={styles.divider} />
        </View>

        {taskGroups.map(group => (
          <TouchableOpacity 
            key={group.id}
            style={styles.taskGroup}
            onPress={() => navigation.navigate('InsideTask', { title: group.title })}
            onLongPress={() => handleTaskGroupPress(group.id)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`${group.title} task group`}
          >
            <View style={styles.taskGroupContent}>
              <Image
                resizeMode="contain"
                source={{ uri: group.icon }}
                style={styles.taskIcon}
              />
              <Text style={styles.taskGroupTitle}>{group.title}</Text>
            </View>
            <Image
              resizeMode="contain"
              source={{ uri: group.arrowIcon }}
              style={styles.arrowIcon}
            />
            {showDelete === group.id && (
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => deleteTaskGroup(group.id)}
                accessibilityRole="button"
                accessibilityLabel="Delete task group"
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddNewList}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Add new list"
        >
          <Image
            resizeMode="contain"
            source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5490e6a9b94bce32406e0e5eac69867f8bdab81f30ea2be6ff0f6075aa1af5c8?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
            style={styles.addIcon}
          />
          <Text style={styles.addText}>Add new list</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">Projects Task</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity 
          style={styles.projectCard}
          onPress={handleProjectsPress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Todo App project"
        >
          <View style={styles.projectHeader}>
            <View style={styles.projectTitleContainer}>
              <Image
                resizeMode="contain"
                source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/944311d7970a3ecc7229119697e26329e18db91c53540f5928798d4121fda38f?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
                style={styles.projectIcon}
              />
              <Text style={styles.projectTitle}>Todo App</Text>
            </View>
            <Image
              resizeMode="contain"
              source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/78192fbad29cb8b4e826005f3cb4756d498d0f54b939f7cb3a4482c5da34d4ca?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
              style={styles.projectArrow}
              />
            </View>
            <Text style={styles.projectSteps}>Steps 11/30</Text>
            <Text style={styles.projectDate}>Due date: 20/12/2024</Text>
            <Text style={styles.projectStatus}>Status: Running</Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddNewProject}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Add new project"
          >
            <Image
              resizeMode="contain"
              source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5490e6a9b94bce32406e0e5eac69867f8bdab81f30ea2be6ff0f6075aa1af5c8?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
              style={styles.addIcon}
            />
            <Text style={styles.addText}>Add new project</Text>
            <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Task</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Task Title"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Due Date (optional)"
              value={newTaskDueDate}
              onChangeText={setNewTaskDueDate}
            />
            <View  style={{flexDirection:"row",columnGap:10}}> 
            <Button title="Save" onPress={handleSaveNewTask} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
      
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      width: '100%',
      paddingHorizontal: 14,
      paddingTop: Platform.OS === 'ios' ? 65 : 45,
      paddingBottom: 12,
    },
    profileSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
    },
    profileImage: {
      width: 43,
      height: 43,
      borderRadius: 21.5,
    },
    nameContainer: {
      justifyContent: 'center',
    },
    userName: {
      fontSize: 26,
      fontWeight: '700',
      color: '#000',
    },
    menuIcon: {
      width: 30,
      height: 30,
    },
    dateText: {
      fontSize: 16,
      marginTop: 14,
      color: '#000',
      fontWeight: '500',
    },
    content: {
      padding: 15,
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      marginBottom: 20,
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 13,
      marginTop: 20,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 16,
      color: 'rgba(137, 137, 137, 1)',
      fontWeight: '700',
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: 'rgba(137, 137, 137, 1)',
    },
    taskGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 14,
      borderRadius: 10,
      marginVertical: 4,
      backgroundColor: '#f5f5f5',
    },
    taskGroupContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
    },
    taskIcon: {
      width: 24,
      height: 24,
    },
    taskGroupTitle: {
      fontSize: 16,
      fontWeight: '500',
    },
    arrowIcon: {
      width: 20,
      height: 20,
    },
    deleteButton: {
      position: 'absolute',
      right: 10,
      backgroundColor: 'red',
      padding: 5,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      padding: 13,
      borderRadius: 10,
      marginVertical: 8,
      backgroundColor: '#e0e0e0',
    },
    addIcon: {
      width: 24,
      height: 24,
    },
    addText: {
      fontSize: 16,
      flex: 1,
    },
    projectCard: {
      borderRadius: 10,
      padding: 13,
      marginVertical: 8,
      backgroundColor: '#f5f5f5',
    },
    projectHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    projectTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
    },
    projectIcon: {
      width: 24,
      height: 24,
    },
    projectTitle: {
      fontSize: 24,
      fontWeight: '500',
    },
    projectArrow: {
      width: 20,
      height: 20,
    },
    projectSteps: {
      marginTop: 22,
      fontSize: 14,
    },
    projectDate: {
      marginTop: 5,
      fontSize: 14,
      color: 'rgba(137, 137, 137, 1)',
    },
    projectStatus: {
      marginTop: 5,
      fontSize: 14,
      color: 'rgba(137, 137, 137, 1)',
    },

    // Styles for Modal
    modalContainer: {
      flex: 1,
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalInput: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginBottom: 10,
    },
  });
  
  export default DashboardScreen;
  