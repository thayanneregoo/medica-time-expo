import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform, Button, TouchableOpacity, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { token } from '../service';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import {AddButton} from '@/components/AddButton';
import { usePathname } from 'expo-router';


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
    <AddButton />

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
  button:{
    marginTop:10,
    height: 60,
    backgroundColor: '#24a9ac',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity:20,
    shadowColor: '#ccc'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
  },
  icon:{
    opacity:0.7,
    borderRadius:20,
    paddingLeft:2
  }
});
