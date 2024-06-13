// components/QuestionnaireModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface QuestionnaireModalProps {
  visible: boolean;
  onClose: () => void;
}

const QuestionnaireModal: React.FC<QuestionnaireModalProps> = ({ visible, onClose }) => {
  const [answers, setAnswers] = useState({ question1: '', question2: '' });

  const handleInputChange = (name: string, value: string) => {
    setAnswers({ ...answers, [name]: value });
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
          <Text style={styles.label}>Pergunta 1</Text>
          <TextInput
            style={styles.input}
            placeholder="Resposta para pergunta 1"
            value={answers.question1}
            onChangeText={(text) => handleInputChange('question1', text)}
          />
          <Text style={styles.label}>Pergunta 2</Text>
          <TextInput
            style={styles.input}
            placeholder="Resposta para pergunta 2"
            value={answers.question2}
            onChangeText={(text) => handleInputChange('question2', text)}
          />
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

export default QuestionnaireModal;
