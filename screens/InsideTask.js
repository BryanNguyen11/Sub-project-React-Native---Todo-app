import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ScrollView,
  AccessibilityInfo,
  Animated,
  Modal,
  TextInput,
  Button,
} from "react-native";

const InsideTask = ({ route }) => {
  const [tasks, setTasks] = React.useState([
    { id: 1, text: "Go to gym", dueDate: "2024-11-01", completed: false }
  ]);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const [newTaskDueDate, setNewTaskDueDate] = React.useState('');
  const animations = React.useRef(tasks.map(() => new Animated.Value(1))).current;

  const toggleTask = (id) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return;

    Animated.timing(animations[index], {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTasks(tasks.filter(task => task.id !== id));
    });
  };

  const addNewTask = () => {
    setModalVisible(true);
  };

  const handleSaveNewTask = () => {
    if (newTaskTitle) {
      const newTask = {
        id: tasks.length + 1,
        text: newTaskTitle,
        dueDate: newTaskDueDate,
        completed: false
      };
      setTasks([...tasks, newTask]);
      animations.push(new Animated.Value(1));
      setModalVisible(false);
      setNewTaskTitle('');
      setNewTaskDueDate('');
    } else {
      AccessibilityInfo.announceForAccessibility("Task title is required");
    }
  };

  const handleAutoPlan = () => {
    AccessibilityInfo.announceForAccessibility("Auto planning your tasks");
  };

  const { title } = route.params;  // Lấy tiêu đề từ params

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.userSection}>
            <Image
              resizeMode="contain"
              source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/b7a9097c8cd2e2ff14d85b9e1b732a9227549795f8d7aed84ac3d93fd4883460?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
              style={styles.profileImage}
              accessible={true}
              accessibilityLabel="User profile picture"
            />
            <View style={styles.nameContainer}>
              <Text accessibilityRole="header" style={styles.userName}>
                Bryan Nguyen
              </Text>
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open menu"
            onPress={() => AccessibilityInfo.announceForAccessibility("Menu opened")}
          >
            <Image
              resizeMode="contain"
              source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/285cb629133ebffd9052fe265fe459ad58658e6d53cca398d282911cb22fc054?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
              style={styles.menuIcon}
            />
          </Pressable>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText} accessibilityRole="text">
            Monday, 1st November 2024
          </Text>
        </View>

        <View style={styles.taskSectionContainer}>
          <View style={styles.sectionHeader}>
            <Image
              resizeMode="contain"
              source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b0dd5121d42a7f9b61e213c5b71e54c0ce76f6db6779d9abd80b16ca56feb75?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
              style={styles.sectionIcon}
              accessible={true}
              accessibilityLabel={`${title} section icon`}
            />
            <Text style={styles.sectionTitle} accessibilityRole="header">
              {title}
            </Text>
          </View>

          {tasks.map((task, index) => (
            <Animated.View key={task.id} style={{ transform: [{ scale: animations[index] }] }}>
              <Pressable
                style={styles.taskItem}
                onPress={() => toggleTask(task.id)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: task.completed }}
                accessibilityLabel={`${task.text}, ${task.completed ? 'completed' : 'not completed'}`}
              >
                <View style={[styles.checkbox, task.completed && styles.checkboxChecked]} />
                <View style={styles.taskTextContainer}>
                  <Text style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
                    {task.text}
                  </Text>
                  {task.dueDate ? (
                    <Text style={styles.dueDateText}>
                      Due: {task.dueDate}
                    </Text>
                  ) : null}
                </View>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => toggleTask(task.id)}
                  accessibilityRole="button"
                  accessibilityLabel="Delete task"
                >
                  <Image
                    resizeMode="contain"
                    source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/4efdb5d6356339737d8f71e620f09e1f20347eac64f28d8455a4846e0427c662?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
                    style={styles.deleteIcon}
                  />
                </Pressable>
              </Pressable>
            </Animated.View>
          ))}

          <Pressable
            style={styles.addTaskContainer}
            onPress={addNewTask}
            accessibilityRole="button"
            accessibilityLabel="Add new task"
          >
            <Image
              resizeMode="contain"
              source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5490e6a9b94bce32406e0e5eac69867f8bdab81f30ea2be6ff0f6075aa1af5c8?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
              style={styles.addIcon}
            />
            <View style={styles.addTextContainer}>
              <Text style={styles.addText}>Add new task</Text>
            </View>
          </Pressable>
        </View>

        <Pressable
          style={styles.autoPlanButton}
          onPress={handleAutoPlan}
          accessibilityRole="button"
          accessibilityLabel="Auto Plan your tasks"
        >
          <Text style={styles.buttonText}>Auto Plan</Text>
        </Pressable>
      </View>

      {/* Modal for Adding New Task */}
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
            <Button title="Save" onPress={handleSaveNewTask} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "auto",
    maxWidth: 480,
    width: "100%",
    padding: 17,
    paddingTop: 55,
    paddingBottom: 28,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  profileImage: {
    width: 43,
    height: 43,
    borderRadius: 50,
  },
  nameContainer: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 26,
    fontWeight: "700",
    color: "rgba(0, 126, 167, 1)",
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  dateContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  dateText: {
    fontSize: 24,
    color: "rgba(0, 126, 167, 1)",
  },
  taskSectionContainer: {
    marginTop: 21,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  sectionIcon: {
    width: 24,
    height: 24,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "700",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    borderRadius: 10,
    marginTop: 18,
    backgroundColor: "#f5f5f5",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "rgba(0, 194, 52, 1)",
    marginRight: 14,
  },
  checkboxChecked: {
    backgroundColor: "rgba(0, 194, 52, 1)",
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 24,
    fontWeight: "300",
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
  addTaskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    borderRadius: 10,
    marginTop: 18,
    backgroundColor: "#f5f5f5",
  },
  addIcon: {
    width: 24,
    height: 24,
    marginRight: 14,
  },
  addTextContainer: {
    flex: 1,
  },
  addText: {
    fontSize: 24,
    fontWeight: "300",
  },
  autoPlanButton: {
    alignSelf: "center",
    marginTop: 438,
    paddingVertical: 10,
    paddingHorizontal: 19,
    borderRadius: 10,
    backgroundColor: "rgba(0, 126, 167, 1)",
    minWidth: 151,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
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
    borderRadius: 20,
    marginBottom: 10,
  },
  dueDateText: {
    fontSize: 16,
    color: '#888',
  },
  
  
});

export default InsideTask;
