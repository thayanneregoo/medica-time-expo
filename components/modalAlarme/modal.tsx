import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '../ThemedText';
import MultiPicker from '../modais/multiplaescolha'; // Supondo que MultiPicker seja implementado corretamente
import { adicionaDados, consultaAlarmesId } from '@/app/service';

const options = ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'];

interface StaticQuestionnaireModalProps {
  onClose: () => void;
  visible: boolean;
}

const AlarmeModal: React.FC<StaticQuestionnaireModalProps> = ({ onClose, visible }) => {
  const [alarmes,setAlarmes]=useState([])
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [selectedHorarios, setSelectedHorarios] = useState<string[]>([]);
  const [isMultiPickerVisible, setMultiPickerVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState(1);
  async function verAlarmes() {
    setMultiPickerVisible(true)
    const dados = await  consultaAlarmesId()
    setAlarmes(dados)
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementFrequency = () => {
    setFrequency(frequency + 1);
  };

  const decrementFrequency = () => {
    if (frequency > 1) {
      setFrequency(frequency - 1);
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setAnswers({ ...answers, [id]: value });
  };

 

  const handleSubmit = () => {
    const result = {
      fields: {
        // 'horario id': '',
        'Quantidade': quantity,
        'Frequencia': frequency,
        'Notes': answers['notes'],
        'Name': answers['name'],
        'horario id': selectedHorarios,
      },
    };
    adicionaDados(result,'Medicamentos')

    alert(`Result: ${JSON.stringify(result)}`);
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
          <View style={styles.header}>
            <ThemedText style={styles.title}>Adicionar Medicamento</ThemedText>
            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
              <ThemedText style={styles.textClose}>X</ThemedText>
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View>
              <Text style={styles.label}>Medicamento: </Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome do Medicamento"
                value={answers['name'] || ''}
                onChangeText={(text) => handleInputChange('name', text)}
              />
            </View>
            <View>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite suas anotações"
                value={answers['notes'] || ''}
                onChangeText={(text) => handleInputChange('notes', text)}
              />
            </View>
            <View >
              <Text style={styles.label}>Quantidade:</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.button} onPress={decrementQuantity}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.inputNumber}
                  value={quantity.toString()}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    const numericValue = parseInt(text);
                    if (!isNaN(numericValue)) {
                      setQuantity(numericValue);
                    }
                  }}
                />
                <TouchableOpacity style={styles.button} onPress={incrementQuantity}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View >
              <Text style={styles.label}>Frequência:</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.button} onPress={decrementFrequency}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.inputNumber}
                  value={frequency.toString()}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    const numericValue = parseInt(text);
                    if (!isNaN(numericValue)) {
                      setFrequency(numericValue);
                    }
                  }}
                />
                <TouchableOpacity style={styles.button} onPress={incrementFrequency}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text style={styles.label}>Alarmes:</Text>
              <TouchableOpacity style={styles.input} onPress={() => verAlarmes()}>
                <Text style={styles.dropdownText}>Selecione os horários dos alarmes</Text>
              </TouchableOpacity>
              <MultiPicker
                options={alarmes}
                selectedOptions={selectedHorarios}
                setSelectedOptions={setSelectedHorarios}
                visible={isMultiPickerVisible}
                onClose={() => setMultiPickerVisible(false)}
              />
            </View>
          </ScrollView>
          <Button title="Submit" onPress={handleSubmit} />
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
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  buttonClose: {
    height: '80%',
    padding: 5,
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#00595f',
  },
  textClose: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
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
  
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  inputNumber: {
    flex: 1,
    height: 40,
    fontSize: 16,
    textAlign: 'center',
    borderColor: 'gray',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dropdownText: {
    height: "100%",
    width: "100%",
    color: 'black',
   
    alignContent: 'center',
    opacity: 0.7,
    padding: 10,
  },
  dropdownContainer:{
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#80808036',
  }
});

export default AlarmeModal;
