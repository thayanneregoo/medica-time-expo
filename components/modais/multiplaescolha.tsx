// components/MultiPicker.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import Checkbox from 'expo-checkbox';

interface MultiPickerProps {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  visible: boolean;
  onClose: () => void;
}

const MultiPicker: React.FC<MultiPickerProps> = ({ options, selectedOptions, setSelectedOptions, visible, onClose }) => {
  const handleToggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(o => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
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
              <View key={index} style={styles.optionContainer}>
                <Checkbox
                  value={selectedOptions.includes(option)}
                  onValueChange={() => handleToggleOption(option)}
                />
                <Text style={styles.optionLabel}>{option}</Text>
              </View>
            ))}
          </ScrollView>
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default MultiPicker;
