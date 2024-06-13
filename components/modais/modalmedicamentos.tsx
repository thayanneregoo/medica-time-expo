// components/StaticQuestionnaireModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, ScrollView, Switch } from 'react-native';

interface StaticQuestionnaireModalProps {
  onClose: () => void;
  visible: boolean;
}

const StaticQuestionnaireModal: React.FC<StaticQuestionnaireModalProps> = ({ onClose, visible }) => {
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [horarioOptions, setHorarioOptions] = useState<string[]>([
    'Manhã',
    'Tarde',
    'Noite',
    'Madrugada',
  ]);
  const [selectedHorarios, setSelectedHorarios] = useState<{ [key: string]: boolean }>({});

  const handleInputChange = (id: string, value: string) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleHorarioChange = (option: string) => {
    setSelectedHorarios({ ...selectedHorarios, [option]: !selectedHorarios[option] });
  };

  const generateHorarioId = (horarios: string[]) => {
    return horarios.join('-').toLowerCase().replace(/ /g, '_');
  };

  const handleSubmit = () => {
    const selectedHorarioList = Object.keys(selectedHorarios).filter(
      (key) => selectedHorarios[key]
    );

    const result = {
      fields: {
        'horario id': generateHorarioId(selectedHorarioList),
        'Quantidade': Number(answers['quantidade']),
        'Notes': answers['notes'],
        'Name': answers['name'],
        'Horario': selectedHorarioList,
      },
    };

    alert(`Result: ${JSON.stringify(result, null, 2)}`);
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
        <View style={styles.modalContent}>
          <Text style={styles.title}>Questionário</Text>
          <ScrollView>
            <View>
              <Text style={styles.label}>Quantidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite a quantidade"
                keyboardType="numeric"
                value={answers['quantidade'] || ''}
                onChangeText={(text) => handleInputChange('quantidade', text)}
              />
            </View>

            <View>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite suas anotações"
                value={answers['notes'] || ''}
                onChangeText={(text) => handleInputChange('notes', text)}
              />
            </View>

            <View>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome"
                value={answers['name'] || ''}
                onChangeText={(text) => handleInputChange('name', text)}
              />
            </View>

            <View>
              <Text style={styles.label}>Horário</Text>
              {horarioOptions.map((option) => (
                <View key={option} style={styles.switchContainer}>
                  <Text>{option}</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={selectedHorarios[option] ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => handleHorarioChange(option)}
                    value={selectedHorarios[option]}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Close" onPress={onClose} />
        </View>
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
    maxHeight: '80%',
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default StaticQuestionnaireModal;
