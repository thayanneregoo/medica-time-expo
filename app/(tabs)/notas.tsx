import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { token } from '../service';
import { useState } from 'react';
import { formatDatetime } from '@/components/helper/formatdata';
import { AddButton } from '@/components/AddButton';

export default function TabTwoScreen() {
    const [horarios,setHorarios] = useState([])
    useState(
      ()=>{
      async function consultadados () {
        try {
            const data = await fetch("https://api.airtable.com/v0/appNsRbWKK7L2FuqF/tblUn0hycSWAXNaQ7",{
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
        <ThemedText type="title">Anotações</ThemedText>
      </ThemedView>
      
            { horarios.map((tema:any)=> (
                <>
                <ThemedView style={styles.titleContainer} key={tema.id}>
                  <Collapsible title={tema.fields.Title}>    
                  <ThemedText type="defaultSemiBold">Hgt: {tema.fields.HGT}{' '}</ThemedText>   
                  <ThemedText type="defaultSemiBold">Pressão Arterial: {tema.fields.PA}{' '}</ThemedText>             
                  <ThemedText type="defaultSemiBold">Data: {formatDatetime(tema.fields.Horario)}{' '}</ThemedText>
                  <ThemedText type="defaultSemiBold">Jejum: {tema.fields.Jejum}{' '}</ThemedText>           
                  <ThemedText type="defaultSemiBold">Observações: {tema.fields.Obs}{' '}</ThemedText>             
  
             

                  </Collapsible> 
                </ThemedView>
           
                </>     
            )) }

<AddButton/>

  
      
    </ParallaxScrollView>
    );
  }
  
  // return (
  //   <ParallaxScrollView>      
  //       <ThemedView style={styles.titleContainer}>
  //       <ThemedText type="title">Explore</ThemedText>
  //     </ThemedView>
  //     <ThemedText>This app includes example code to help you get started.</ThemedText>
  //     <Collapsible title="File-based routing">
  //       <ThemedText>
  //         This app has two screens:{' '}
  //         <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
  //         <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
  //       </ThemedText>
  //       <ThemedText>
  //         The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
  //         sets up the tab navigator.
  //       </ThemedText>
  //       <ExternalLink href="https://docs.expo.dev/router/introduction">
  //         <ThemedText type="link">Learn more</ThemedText>
  //       </ExternalLink>
  //     </Collapsible>
  //     <Collapsible title="Android, iOS, and web support">
  //       <ThemedText>
  //         You can open this project on Android, iOS, and the web. To open the web version, press{' '}
  //         <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
  //       </ThemedText>
  //     </Collapsible>
  //     <Collapsible title="Images">
  //       <ThemedText>
  //         For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
  //         <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
  //         different screen densities
  //       </ThemedText>
  //       <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
  //       <ExternalLink href="https://reactnative.dev/docs/images">
  //         <ThemedText type="link">Learn more</ThemedText>
  //       </ExternalLink>
  //     </Collapsible>
  //     <Collapsible title="Custom fonts">
  //       <ThemedText>
  //         Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
  //         <ThemedText style={{ fontFamily: 'SpaceMono' }}>
  //           custom fonts such as this one.
  //         </ThemedText>
  //       </ThemedText>
  //       <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
  //         <ThemedText type="link">Learn more</ThemedText>
  //       </ExternalLink>
  //     </Collapsible>
  //     <Collapsible title="Light and dark mode components">
  //       <ThemedText>
  //         This template has light and dark mode support. The{' '}
  //         <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
  //         what the user's current color scheme is, and so you can adjust UI colors accordingly.
  //       </ThemedText>
  //       <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
  //         <ThemedText type="link">Learn more</ThemedText>
  //       </ExternalLink>
  //     </Collapsible>
  //     <Collapsible title="Animations">
  //       <ThemedText>
  //         This template includes an example of an animated component. The{' '}
  //         <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
  //         the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
  //         to create a waving hand animation.
  //       </ThemedText>
  //       {Platform.select({
  //         ios: (
  //           <ThemedText>
  //             The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
  //             component provides a parallax effect for the header image.
  //           </ThemedText>
  //         ),
  //       })}
  //     </Collapsible>
  //   </ParallaxScrollView>
  // );


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
