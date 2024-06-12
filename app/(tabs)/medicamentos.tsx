import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
// import {token} from '@/.env' //veriricar como podemos inportar o token doa rquivo .env
import { Link } from 'expo-router';
import { consultadados, token } from '../service';
import { AddButton } from '@/components/AddButton';

export default function Medicamentos() {

    const [listaMedicamentos,setListaMedicamentos]= useState([])
    useEffect ( 
       ()=>{
        const fetchDados = async ()=>{
          setListaMedicamentos(await consultadados('Medicamentos/'))
        }
        fetchDados()
     },[])
     const mapeamento = (medicamento:object) => {
      // Converter o objeto em uma matriz de pares [key, value]
      const medicamentos = Object.entries(medicamento);
    
      // Mapear a matriz de pares para uma nova matriz de strings com o índice
      return medicamentos.map(([key, value], index) => `${value} `);
    }

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Meus Medicamentos</ThemedText>
      </ThemedView>
      
            { listaMedicamentos.map((tema:any,index)=> (
                <>
                <ThemedView style={styles.titleContainer} key={index}>
                  <Collapsible title={tema.fields.Name}>    
                  <ThemedText type="defaultSemiBold" >Descrição do Medicamento</ThemedText> 

                  <ThemedText>{tema.fields.Notes ? tema.fields.Notes:'Ainda não há descrição'}{' '}</ThemedText>
                  <ThemedText >Horarios: {mapeamento(tema.fields.Horario)}{' '}</ThemedText>   
                  <ThemedText >Quantidade por horario :{tema.fields.Quantidade}{' '}</ThemedText>              
                  </Collapsible> 
                </ThemedView>
                </>     
            )) }
      <AddButton/>
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
