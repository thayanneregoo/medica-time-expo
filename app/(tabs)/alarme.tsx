import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { token } from '../service';


export default function TabTwoScreen() {
  const [horarios,setHorarios] = useState([])
  useState(
    ()=>{
    async function consultadados () {
      try {
          const data = await fetch("https://api.airtable.com/v0/appNsRbWKK7L2FuqF/tblKFo7nUY5ksEBNm",{
              method:"GET",
              headers:{
                  "Authorization": `Bearer ${token}`, 
                  "Content-Type": "application/json"
              }
          })
          const result = await data.json();
          setHorarios(result.records)
          console.log(result.records)
     
      } catch (error) {
          console.log(error)
      }}
       consultadados()
  },)

  const mapeamento = (medicamento:object, quantidade:string[]) => {
    // Converter o objeto em uma matriz de pares [key, value]
    const medicamentos = Object.entries(medicamento);
    let list: string[] = []
    medicamentos.map(([key, value], index) => list.push(` ${quantidade[index]} - ${value}`))

    // Mapear a matriz de pares para uma nova matriz de strings com o índice
    return list
  };

  return (
    <ParallaxScrollView>
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Alarmes</ThemedText>
    </ThemedView>
    
          { horarios.map((tema:any,index)=> (
              <>
              <ThemedView style={styles.titleContainer} key={index}>
                <Collapsible title={tema.fields.Name}>    
                <ThemedText type="defaultSemiBold">Medicamentos: {' '}</ThemedText>  
                <ThemedText>{mapeamento(tema.fields.Medicamentos, tema.fields.Quantidade).map((x:any)=> `${x} \n` )}</ThemedText>           
                </Collapsible> 
              </ThemedView>
         
              </>     
          )) }

    
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
