import * as React from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

const TaskPJForm = ({ onSave, onCancel }) => {
  const [title, setTitle] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [note, setNote] = React.useState("");
  const [assignTo, setAssignTo] = React.useState("");

  const handleSave = () => {
    const taskData = {
      title,
      dueDate,
      note,
      assignTo
    };
    onSave(taskData);
  };

  const renderFormInput = (label, value, onChangeText, inputStyle, multiline = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel} accessibilityRole="label">
        {label}
      </Text>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        accessibilityLabel={label}
        accessibilityRole="textbox"
        accessibilityHint={`Enter ${label.toLowerCase()}`}
      />
    </View>
  );

  const renderButton = (label, onPress, variant) => (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "primary" ? styles.primaryButton : styles.secondaryButton
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text
        style={[
          styles.buttonText,
          variant === "primary" ? styles.primaryText : styles.secondaryText
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.formContainer} accessibilityRole="form">
      <Text style={styles.formTitle} accessibilityRole="header">
        New Task
      </Text>

      {renderFormInput("Title", title, setTitle, styles.inputField)}
      {renderFormInput("Due date", dueDate, setDueDate, styles.inputField)}
      {renderFormInput("Note", note, setNote, styles.noteField, true)}
      {renderFormInput("Assign to", assignTo, setAssignTo, styles.inputField)}

      <View style={styles.buttonContainer}>
        {renderButton("Cancel", onCancel, "secondary")}
        {renderButton("Save", handleSave, "primary")}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    borderRadius: 20,
    maxWidth: 324,
    padding: 22,
    backgroundColor: "#FFFFFF",
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
    marginVertical: 5,
  },
  inputLabel: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "400",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    fontFamily: "Roboto",
  },
  inputField: {
    height: 51,
    marginBottom: 5,
  },
  noteField: {
    height: 129,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 48,
    gap: 20,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 100,
  },
  primaryButton: {
    backgroundColor: "rgba(20, 155, 214, 1)",
  },
  secondaryButton: {
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "700",
  },
  primaryText: {
    color: "rgba(255, 255, 255, 1)",
  },
  secondaryText: {
    color: "rgba(130, 130, 130, 1)",
  },
});

export default TaskPJForm;
