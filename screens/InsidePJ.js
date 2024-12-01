import * as React from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  AccessibilityInfo,
  Animated,
  Modal,
} from "react-native";
import TaskPJForm from "./TaskPJForm"; // Đảm bảo đường dẫn chính xác

const InsidePJ = () => {
  const [tasks, setTasks] = React.useState([
    {
      id: '1',
      title: "Design UI",
      dueDate: "19/11/2024",
      isPersonal: true,
      completed: false
    },
    {
      id: '2',
      title: "Create Database",
      dueDate: "19/11/2024",
      assignee: "Huy Hoang",
      status: "Commit",
      step: 9,
      totalSteps: 11,
      completed: false
    },
    {
        id: '3',
        title: "Design BE",
        dueDate: "20/11/2024",
        assignee: "Huy Hoang",
        status: "Commit",
        step: 9,
        totalSteps: 11,
        completed: false
      }
  ]);
  const animations = React.useRef(tasks.map(() => new Animated.Value(1))).current;
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleTaskCompletion = (taskId, complete = true) => {
    const index = tasks.findIndex(task => task.id === taskId);
    if (index === -1) return;
  
    if (complete) {
      Animated.timing(animations[index], {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTasks(tasks.filter(task => task.id !== taskId));
      });
    } else {
      setTasks(tasks.map(task => task.id === taskId ? {...task, status: 'Ejected'} : task));
    }
  };
  

  const handleApproveTask = (taskId) => {
    toggleTaskCompletion(taskId);
  };

  const handleEjectTask = (taskId) => {
    toggleTaskCompletion(taskId, false);
  };

  const handleAddNewTask = () => {
    setModalVisible(true);
  };

  const handleSaveNewTask = (taskData) => {
    setTasks([...tasks, { 
      ...taskData, 
      id: Date.now().toString(), 
      completed: false,
      assignee: taskData.assignTo ,
      status: 'Pending', 
      step: 0,
      totalSteps: 10
    }]);
    setModalVisible(false);
  };

  const TaskCheckbox = ({ taskId, completed }) => (
    <TouchableOpacity 
      onPress={() => toggleTaskCompletion(taskId)}
      style={[styles.checkbox, completed && styles.checkboxCompleted]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: completed }}
      accessibilityLabel={`Mark task ${taskId} as ${completed ? 'incomplete' : 'complete'}`}
    />
  );

  const TaskCard = ({ task, index }) => (
    <Animated.View style={{ transform: [{ scale: animations[index] }] }}>
      <View style={styles.taskCardContainer}>
        <View style={styles.taskHeader}>
          <View style={styles.taskInfo}>
            <TaskCheckbox taskId={task.id} completed={task.completed} />
            <Text style={styles.taskTitle} accessibilityRole="header">
              {task.title}
            </Text>
            <Text style={styles.dueDate}>Due date: {task.dueDate}</Text>
          </View>
          {task.assignee && (
            <View style={styles.assigneeContainer}>
              <Text style={styles.assigneeText}>{task.assignee}</Text>
            </View>
          )}
        </View>
        {task.status && (
          <View style={styles.taskStatus}>
            <View style={styles.statusInfo}>
              <Text>Status: {task.status}</Text>
              <Text style={styles.stepText}>
                Step: {task.step} of {task.totalSteps}
              </Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleEjectTask(task.id)}
                accessibilityRole="button"
                accessibilityLabel="Eject task"
              >
                <Text style={styles.buttonText}>Ejected</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleApproveTask(task.id)}
                accessibilityRole="button"
                accessibilityLabel="Approve task"
              >
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  );
  
  

  return (
    <ScrollView 
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      accessibilityRole="scrollview"
    >
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/51e88ec7724582e7922569ab67b59fa8d1a6f25c00d70a8f6cfc658d7d7c23bf?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
          style={styles.profileImage}
          accessibilityLabel="Profile picture of Bryan Nguyen"
        />
        <Text style={styles.profileName}>Bryan Nguyen</Text>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Monday, 1st November 2024</Text>
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/285cb629133ebffd9052fe265fe459ad58658e6d53cca398d282911cb22fc054?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
          style={styles.calendarIcon}
          accessibilityLabel="Calendar icon"
        />
      </View>

      <View style={styles.headerContainer}>
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b0dd5121d42a7f9b61e213c5b71e54c0ce76f6db6779d9abd80b16ca56feb75?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
          style={styles.headerIcon}
          accessibilityLabel="Todo app icon"
        />
                <Text style={styles.headerText}>Todo App</Text>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Description</Text>
        <View style={styles.divider} />
        <Text style={styles.descriptionText}>
          Another option you have is choosing the number of syllables in the
          words you speak. You probably have never considered this option
          before, but you have it every time you open your mouth and speak. You
          make so many choices like this that you never even think about, but
          you have the choice with each one. What are you going to do with this
          knowledge?
        </Text>
      </View>

      {tasks.map((task, index) => (
        <React.Fragment key={task.id}>
          <View style={styles.sectionContainer}>
            <Text style={[
              styles.sectionTitle,
              task.isPersonal && styles.personalTask
            ]}>
              {task.isPersonal ? "Your Task" : "Member Task"}
            </Text>
            <View style={styles.divider} />
          </View>
          <TaskCard task={task} index={index} />
        </React.Fragment>
      ))}

      <TouchableOpacity 
        style={styles.addTaskButton}
        onPress={handleAddNewTask}
        accessibilityRole="button"
        accessibilityLabel="Add new task"
      >
        <Image
          source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5490e6a9b94bce32406e0e5eac69867f8bdab81f30ea2be6ff0f6075aa1af5c8?placeholderIfAbsent=true&apiKey=7a0469033215499bade6ced937091230" }}
          style={styles.addIcon}
          accessibilityLabel="Add icon"
        />
        <Text style={styles.addTaskText}>Add new task</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.autoPlanButton}
        accessibilityRole="button"
        accessibilityLabel="Auto plan tasks"
      >
        <Text style={styles.autoPlanText}>Auto Plan</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TaskPJForm
              onSave={handleSaveNewTask}
              onCancel={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 43,
    height: 43,
    borderRadius: 21.5,
  },
  profileName: {
    marginLeft: 10,
    fontSize: 26,
    fontWeight: '700',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 24,
    fontWeight: '700',
  },
  calendarIcon: {
    width: 30,
    height: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerText: {
    fontSize: 36,
    fontWeight: '700',
  },
  sectionContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  personalTask: {
    color: 'rgba(228, 61, 61, 1)',
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
    width: '100%',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  taskCardContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  taskInfo: {
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: 'rgba(0, 194, 52, 1)',
    borderRadius: 12,
    marginBottom: 10,
  },
  checkboxCompleted: {
    backgroundColor: 'rgba(0, 194, 52, 1)',
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 5,
  },
  dueDate: {
    fontSize: 14,
    color: '#666',
  },
  assigneeContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
  },
  assigneeText: {
    fontSize: 14,
  },
  taskStatus: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  stepText: {
    marginTop: 5,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  addTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  addIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  addTaskText: {
    fontSize: 24,
    fontWeight: '300',
  },
  autoPlanButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  autoPlanText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
  // Modal styles
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
});

export default InsidePJ;
