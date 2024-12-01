import * as React from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

const TaskForm = ({ onSave, onCancel }) => {
  const [title, setTitle] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [note, setNote] = React.useState("");

  const handleSave = () => {
    if (!title.trim()) return;
    const task = {
      title,
      dueDate,
      note,
      id: Date.now().toString(),
      completed: false
    };
    onSave(task);
    setTitle("");
    setDueDate("");
    setNote("");
  };

  const handleCancel = () => {
    setTitle("");
    setDueDate("");
    setNote("");
    onCancel();
  };

  return (
    <View style={styles.formContainer} accessible={true} accessibilityRole="form">
      <Text style={styles.formTitle} accessibilityRole="header" accessibilityLevel={1}>
        New Task
      </Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel} nativeID="titleLabel">Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          accessibilityLabel="Task title input"
          accessibilityLabelledBy="titleLabel"
          accessibilityHint="Enter the title of your task"
          returnKeyType="next"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel} nativeID="dueDateLabel">Due date</Text>
        <TextInput
          style={styles.input}
          value={dueDate}
          onChangeText={setDueDate}
          accessibilityLabel="Due date input"
          accessibilityLabelledBy="dueDateLabel"
          accessibilityHint="Enter the due date for your task"
          returnKeyType="next"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel} nativeID="noteLabel">Note</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={note}
          onChangeText={setNote}
          multiline={true}
          numberOfLines={4}
          accessibilityLabel="Task note input"
          accessibilityLabelledBy="noteLabel"
          accessibilityHint="Enter any additional notes for your task"
          returnKeyType="done"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Cancel task creation"
          accessibilityHint="Clears all form fields"
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Save task"
          accessibilityHint="Creates a new task with the entered information"
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    borderRadius: 20,
    maxWidth: 324,
    paddingHorizontal: 33,
    paddingTop: 22,
    paddingBottom: 41,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    color: "rgba(20, 155, 214, 1)",
    fontSize: 36,
    fontFamily: "Roboto",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "400",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(204, 204, 204, 1)",
    borderRadius: 10,
    height: 51,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 42,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 120,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  saveButton: {
    backgroundColor: "rgba(20, 155, 214, 1)",
  },
  cancelButtonText: {
    color: "rgba(130, 130, 130, 1)",
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "700",
  },
  saveButtonText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "700",
  },
});

export default TaskForm;