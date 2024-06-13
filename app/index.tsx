// screens/LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { AddButton } from '@/components/button/AddButton';
import { Link, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  

  const handleLogin = () => {
    alert(`Email: ${email}, Password: ${password}`);
    router.push('/alarme')
  };

  return (
    <ParallaxScrollView>
    <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Login</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />


        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <AddButton text='Login' onPress={handleLogin} icon='none'/>

      </ThemedView>

    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },  titleContainer: {
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center',
    gap: 8,
  },button:{width:60},title:{paddingBottom:20}
});

export default LoginScreen;
