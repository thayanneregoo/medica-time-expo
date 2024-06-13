import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView,  } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const FormularioMedicamento = () => {
  const [nomeMedicamento, setNomeMedicamento] = useState('');
  const [informacao, setInformacao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [horario, setHorario] = useState(''); // Estado para armazenar o horário selecionado
  const horariosDisponiveis = ['08:00', '12:00', '16:00', '20:00']; // Lista de horários disponíveis

  const handleAdicionar = () => {
    const novoMedicamento = {
      fields: {
        Name: nomeMedicamento,
        Notes: informacao,
        Quantidade: quantidade,
        frequencia: frequencia,
        "horario id": ["reccxVNriUlUscn69"], // Coloque aqui a lógica para obter o ID do horário dinamicamente
        Horario: horario // Incluir o horário selecionado no objeto
      }
    };

    console.log('Novo medicamento:', novoMedicamento);
    // Aqui você pode adicionar lógica para enviar o objeto para o backend ou armazená-lo localmente

    // Limpar os campos do formulário após a submissão
    setNomeMedicamento('');
    setInformacao('');
    setQuantidade('');
    setFrequencia('');
    setHorario('');
  };

  return (
    <ParallaxScrollView>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedView style={styles.formContainer}>
          <ThemedText>Adicionar Medicamento</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nome do Medicamento"
            value={nomeMedicamento}
            onChangeText={setNomeMedicamento}
          />
          <TextInput
            style={styles.input}
            placeholder="Informação (ex: nome do médico ou para que serve)"
            value={informacao}
            onChangeText={setInformacao}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade por dose (números)"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Frequência (números)"
            value={frequencia}
            onChangeText={setFrequencia}
            keyboardType="numeric"
          />
          {/* <Picker
            selectedValue={horario}
            onValueChange={(itemValue, itemIndex) => setHorario(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Selecione um horário..." value="" />
            {horariosDisponiveis.map((horario, index) => (
              <Picker.Item key={index} label={horario} value={horario} />
            ))}
          </Picker> */}
          <Button title="Adicionar Medicamento" onPress={handleAdicionar} />
        </ThemedView>
      </ScrollView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default FormularioMedicamento;
