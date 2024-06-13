// screens/LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { AddButton } from '@/components/button/AddButton';
import { Link, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ExternalLink } from '@/components/ExternalLink';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const router = useRouter()

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um email válido.');
      return;
    } if (!password || password.length < 8) {
      setPasswordError('Por favor, insira sua senha corretamente');
      return;
    }
    setEmailError('');
    alert(`Email: ${email}, Password: ${password}`);
    router.push('/alarme')
  };


  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Login</ThemedText>
      </ThemedView>

      <ThemedView>
        {/* <Text style={styles.label}>Email</Text> */}
        <ThemedText type="subtitle" >Email</ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError(''); // Limpar mensagem de erro ao digitar
          }}
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        {/* <Text style={styles.label} >Senha</Text> */}
        <ThemedText type="subtitle" >Senha</ThemedText>


        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
        <ExternalLink href="">
           <ThemedText type="link" >Esqueci senha</ThemedText>
         </ExternalLink>
      </ThemedView>

      <AddButton text='Login' onPress={handleLogin} icon='none' />


    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize:15,
    paddingBottom:10,
    fontWeight:'500',
    color:'#00595f'
  },
  input: {
    opacity:0.7,
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  }, titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  }
  , title:
    { paddingBottom: 10 }, error: {
      color: 'red',
      marginBottom: 10,

    }
});

export default LoginScreen;
