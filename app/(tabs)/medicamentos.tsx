import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import {token} from '@/app/service'
import { Link } from 'expo-router';

export default function TabTwoScreen() {

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
        <ThemedText type="title">Medicamentos</ThemedText>
      </ThemedView>
      <ThemedView>
            { listaMedicamentos.map((tema:any)=> (
                <>
                {console.log(tema.id)}
                <Link href={`nivelamento/${tema.id}`}>
                <div className="flex">
                <Image src={tema.fields.Imagens[0].url}
                    height={100} width={100} alt={tema.fields.Name}/>
                <ThemedText>{tema.fields.Name}</ThemedText>  
                </div>
                </Link>                 
                </>     
            )) }

      </ThemedView>
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
