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
import { token } from '../service';

export default function Medicamentos() {

    const [listaMedicamentos,setListaMedicamentos]= useState([])
    useEffect ( 
      ()=>{
         async function consultadados () {
         try {
             const data = await fetch("https://api.airtable.com/v0/appNsRbWKK7L2FuqF/tblVXYRBCvv9iqPDD",{
                 method:"GET",
                 headers:{
                     "Authorization": `Bearer ${token}`, 
                     "Content-Type": "application/json"
                 }
             })
            
             const result = await data.json();
             setListaMedicamentos(result.records)
             console.log(result.records)
        
         } catch (error) {
             console.log(error)
         }}
          consultadados()
     },[])

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Meus Medicamentos</ThemedText>
      </ThemedView>
      
            { listaMedicamentos.map((tema:any,index)=> (
                <>
                
                {console.log(tema.id)}
                <ThemedView style={styles.titleContainer} key={index}>
                  <Collapsible title={tema.fields.Name}>    
                  <ThemedText type="defaultSemiBold" >Descrição do Medicamento</ThemedText> 

                  <ThemedText>{tema.fields.Notes ? tema.fields.Notes:'Ainda não há descrição'}{' '}</ThemedText>
                  <ThemedText type="defaultSemiBold">Horarios :{tema.fields.Horario}{' '}</ThemedText>   
                  <ThemedText type="defaultSemiBold">Quantidade por horario :{tema.fields.Quantidade}{' '}</ThemedText>              
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
