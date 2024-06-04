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

  return (
    <ParallaxScrollView>
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Alarmes</ThemedText>
    </ThemedView>
    
          { horarios.map((tema:any)=> (
              <>
              
              {console.log(tema.id)}
              <ThemedView style={styles.titleContainer} key={tema.id}>
                <Collapsible title={tema.fields.Name}>    
                <ThemedText type="defaultSemiBold">Medicamentos :{tema.fields.Medicamentos}{' '}</ThemedText>             
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
