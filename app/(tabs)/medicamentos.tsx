import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
// import {token} from '@/.env' //veriricar como podemos inportar o token doa rquivo .env
import { Link, useRouter } from 'expo-router';
import { consultadados, token } from '../service';
import { AddButton } from '@/components/button/AddButton';
import QuestionnaireModal from '@/components/helper/modal';
import QuestionnaireModalDinamic from '@/components/helper/modaldinamica';
import StaticQuestionnaireModal from '@/components/modais/modalmedicamentos';

const questions = [
  { id: 'quantidade', label: 'Quantidade', placeholder: 'Digite a quantidade' },
  { id: 'notes', label: 'Notes', placeholder: 'Digite a descrição' },
  { id: 'name', label: 'Name', placeholder: 'Digite o nome do medicamento' },
  { id: 'horario', label: 'Horário', placeholder: 'Escolha os horários' },  // Este campo será tratado como uma lista de opções no modal
];

export default function Medicamentos() {
  const [listaMedicamentos, setListaMedicamentos] = useState([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [atualizaPagina, setAtualizaPagina] = useState(false)
  const router = useRouter()
  useEffect(
    () => {
      const fetchDados = async () => {
        setListaMedicamentos(await consultadados('Medicamentos/'))
      }
      fetchDados()
    }, [atualizaPagina])

    const closeModal = () => {
      setModalVisible(false);
      setAtualizaPagina(prev => !prev)
    }
  const mapeamento = (medicamento: object) => {
    // Converter o objeto em uma matriz de pares [key, value]
    const medicamentos = Object.entries(medicamento);

    // Mapear a matriz de pares para uma nova matriz de strings com o índice
    return medicamentos.map(([key, value], index) => `${value} `);
  }
  const handleClick = () => {
    router.push('/medicamento')
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Meus Medicamentos</ThemedText>
      </ThemedView>
      {listaMedicamentos ? listaMedicamentos.map((tema: any, index) => (
        <>
          <ThemedView style={styles.titleContainer} key={index}>
            <Collapsible title={tema.fields.Name}>
              <ThemedText type="defaultSemiBold" >Descrição do Medicamento</ThemedText>
              <ThemedText>{tema.fields.Notes ? tema.fields.Notes : 'Ainda não há descrição'}{' '}</ThemedText>
              <ThemedText >Horarios: {tema.fields.Horario? mapeamento(tema.fields.Horario): 
                <ThemedText>Ainda não há horarios definidos</ThemedText>}{' '}</ThemedText>
              <ThemedText >Quantidade por horario: {tema.fields.Quantidade ? tema.fields.Quantidade : 
            <ThemedText>Ainda não há quantidade definida</ThemedText>}{' '}</ThemedText>
            </Collapsible>
          </ThemedView>
        </>
      )) :
        <ThemedText type='defaultSemiBold' > Ainda não há medicamentos cadastrados</ThemedText>}
      <AddButton text='Adicionar Medicamento' onPress={() => setModalVisible(true)} />
      <StaticQuestionnaireModal   visible={isModalVisible} onClose={() => closeModal()} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
