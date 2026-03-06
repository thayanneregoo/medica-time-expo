import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { consultadados, token } from '../service';
import { useEffect, useState } from 'react';
import { formatDatetime } from '@/components/helper/formatdata';
import { AddButton } from '@/components/button/AddButton';

export default function TabTwoScreen() {
    const [notas,setNotas] = useState([])
    useEffect ( 
      ()=>{
        const fetchDados = async () => {
          try {
            const data = await consultadados('Anotações/');
            setNotas(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
       fetchDados()
    },[])
  
    return (
      <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Anotações</ThemedText>
      </ThemedView>
      
            { notas.map((tema:any)=> (
                <>
                <ThemedView style={styles.titleContainer} key={tema.id}>
                  <Collapsible title={tema.fields.Title}>    
                  <ThemedText >Hgt: {tema.fields.HGT}{' '}</ThemedText>   
                  <ThemedText >Pressão Arterial: {tema.fields.PA}{' '}</ThemedText>             
                  <ThemedText >Data: {formatDatetime(tema.fields.Horario)}{' '}</ThemedText>
                  <ThemedText >Jejum: {tema.fields.Jejum}{' '}</ThemedText>           
                  <ThemedText >Observações: {tema.fields.Obs}{' '}</ThemedText>             
  
             

                  </Collapsible> 
                </ThemedView>
           
                </>     
            )) }

<AddButton text='Adicionar Anotação'/>

  
      
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
