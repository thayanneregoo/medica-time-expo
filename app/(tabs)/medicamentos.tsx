import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text, TouchableOpacity, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
// import {token} from '@/.env' //veriricar como podemos inportar o token doa rquivo .env
import { Link, useRouter } from 'expo-router';
import { consultadados, deletadados, token } from '../service';
import { AddButton } from '@/components/button/AddButton';
import QuestionnaireModal from '@/components/helper/modal';
import QuestionnaireModalDinamic from '@/components/helper/modaldinamica';
import StaticQuestionnaireModal from '@/components/modais/modalMedicamentos';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const questions = [
  { id: 'quantidade', label: 'Quantidade', placeholder: 'Digite a quantidade' },
  { id: 'notes', label: 'Notes', placeholder: 'Digite a descrição' },
  { id: 'name', label: 'Name', placeholder: 'Digite o nome do medicamento' },
  { id: 'horario', label: 'Horário', placeholder: 'Escolha os horários' },  // Este campo será tratado como uma lista de opções no modal
];
const deleta = (nome:string)=>{
  deletadados('Medicamentos',nome)
}

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


  return (
    <ParallaxScrollView>

        <ThemedText type="title">Meus Medicamentos</ThemedText>
     
      {listaMedicamentos ? listaMedicamentos.map((tema: any, index) => (
        <>
          <ThemedView style={styles.titleContainer} key={index}>    
                     
            {/* <TouchableOpacity style={styles.buttonDel} onPress={()=>deleta(tema.id)}>
            <EvilIcons name="trash" size={24} color="black" />            
            </TouchableOpacity> */}
            <Collapsible title={tema.fields.Name}>
            <View >
            <ThemedText type="defaultSemiBold" >Descrição do Medicamento</ThemedText>
            </View>

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
  },buttonDel:{
    opacity:1,
    borderRadius:5,
    alignItems:'center',
    padding:2,
    width:80
  },container:{
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row-reverse',
    width:'100%'
  }
});
