// components/QuestionnaireModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface Question {
  id: string;
  label: string;
  placeholder: string;
}

interface QuestionnaireModalProps {
  visible: boolean;
  onClose: () => void;
  questions: Question[];
}

const QuestionnaireModalDinamic: React.FC<QuestionnaireModalProps> = ({ visible, onClose, questions }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleInputChange = (id: string, value: string) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = () => {
    alert(`Answers: ${JSON.stringify(answers)}`);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText type="title" style={styles.title}>Questionário</ThemedText>
          {questions.map((question) => (
            <View key={question.id}>
              <Text style={styles.label}>{question.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={question.placeholder}
                value={answers[question.id] || ''}
                onChangeText={(text) => handleInputChange(question.id, text)}
              />
            </View>
          ))}
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Close" onPress={onClose} />
        </ThemedView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
});

export default QuestionnaireModalDinamic;
