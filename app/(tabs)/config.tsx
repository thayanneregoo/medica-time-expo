import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform, Button, TouchableOpacity, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { consultadados, token } from '../service';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { AddButton } from '@/components/button/AddButton';
import { usePathname } from 'expo-router';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';




export default function TabTwoScreen() {
  const [horarios,setHorarios] = useState([])

  useEffect ( 
    ()=>{
      const fetchDados = async () => {
        try {
          const data = await consultadados('Alarmes/');
          setHorarios(data);
          console.log(horarios)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
     fetchDados()
  },[])



  return (
    <ParallaxScrollView>
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title" style={styles.title}>Configurações</ThemedText>
    </ThemedView>
    <ThemedView style={styles.tag}>
    <FontAwesome6 name="user-gear" size={24} style={styles.icon} />
        <ThemedText type="subtitle" style={styles.title}>Perfil</ThemedText>
    </ThemedView>
    <ThemedView style={styles.tag}>
    <FontAwesome6 name="user-gear" size={24} style={styles.icon} />
        <ThemedText type="subtitle" style={styles.title}>Conta</ThemedText>
    </ThemedView>
    <ThemedView style={styles.tag}>
    <FontAwesome6 name="user-gear" size={24} style={styles.icon} />
        <ThemedText type="subtitle" style={styles.title}>Definições</ThemedText>
    </ThemedView>
    <ThemedView style={styles.tag}>
    <FontAwesome6 name="user-gear" size={24} style={styles.icon} />
        <ThemedText type="subtitle" style={styles.title}>Ajuda</ThemedText>
    </ThemedView>
    <ThemedView style={styles.tag}>
    <FontAwesome6 name="user-gear" size={24} style={styles.icon} />
        <ThemedText type="subtitle" style={styles.title}>Localizar Farmacias</ThemedText>
    </ThemedView>
    <ThemedView style={styles.tag}>
    <FontAwesome6 name="user-gear" size={24} style={styles.icon} />
        <ThemedText type="subtitle" style={styles.title}>Sair</ThemedText>
    </ThemedView>
    


  </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  icon:{
    opacity:0.7,
    borderRadius:20,
    paddingLeft:2,
    color:'#001b1c',
    paddingRight: 10
  },tag:{
    display:'flex',
    flexDirection:'row'
    
  }, title:{
    color:'#001b1c',
    opacity:.9,
    paddingBottom:20
  }
});
