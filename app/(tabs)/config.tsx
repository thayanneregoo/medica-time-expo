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
import { Link, usePathname } from 'expo-router';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';




export default function TabTwoScreen() {



    return (
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={styles.title}>Configurações</ThemedText>
                <FontAwesome6 name="gear" size={24} style={styles.icon} />
            </ThemedView>
            <ThemedView style={styles.tag}>
                <FontAwesome6 name="user-gear" size={24} style={styles.icon} />
                <ThemedText type="subtitle" style={styles.title}>Perfil</ThemedText>
            </ThemedView>
            <ThemedView style={styles.tag}>
                <MaterialCommunityIcons name="email-edit" size={24} style={styles.icon} />
                <ThemedText type="subtitle" style={styles.title}>Conta</ThemedText>
            </ThemedView>
            <ThemedView style={styles.tag}>
                <Entypo name="sound-mix" size={24} style={styles.icon} />
                <ThemedText type="subtitle" style={styles.title}>Definições</ThemedText>
            </ThemedView>
            <ThemedView style={styles.tag}>
                <Entypo name="help-with-circle" size={24} style={styles.icon} />                
                <ThemedText type="subtitle" style={styles.title}>Ajuda</ThemedText>
            </ThemedView>
            <ThemedView style={styles.tag}><MaterialCommunityIcons name="map-marker-radius" size={24} style={styles.icon} />
                <ThemedText type="subtitle" style={styles.title}>Localizar Farmacias</ThemedText>
            </ThemedView>
            <ThemedView style={styles.tag}>
                <Link href={'/'}>

                <MaterialCommunityIcons name="exit-to-app" size={24} style={styles.icon} />
                    <ThemedText type="subtitle" style={styles.title}>Sair</ThemedText> </Link>
            </ThemedView>



        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    icon: {
        opacity: 0.7,
        borderRadius: 20,
        paddingLeft: 2,
        color: '#001b1c',
        paddingRight: 10
    }, tag: {
        display: 'flex',
        flexDirection: 'row'

    }, title: {
        color: '#001b1c',
        opacity: .9,
        paddingBottom: 20
    }
});
