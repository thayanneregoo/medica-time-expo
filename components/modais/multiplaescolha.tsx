import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import Checkbox from 'expo-checkbox'; // Importando o componente Checkbox do Expo
import { AddButton } from '../button/AddButton';

interface Alarme {
  id: string;
  nome: string;
}

interface MultiPickerProps {
  options: Alarme[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  visible: boolean;
  onClose: () => void;
}

const MultiPicker: React.FC<MultiPickerProps> = ({ options, selectedOptions, setSelectedOptions, visible, onClose }) => {
  const handleToggleOption = (option: Alarme) => {
    if (selectedOptions.includes(option.id)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option.id]);
    }
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
          <ScrollView>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionContainer}
                onPress={() => handleToggleOption(option)}
              >
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    style={styles.checkbox}
                    value={selectedOptions.includes(option.id)}
                    onValueChange={() => handleToggleOption(option)}
                  />
                  <Text style={styles.optionLabel}>{option.nome}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <AddButton text={'Adicionar horário'} onPress={onClose}/>
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
  optionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  optionLabel: {
    fontSize: 16,
  },
});

export default MultiPicker;
