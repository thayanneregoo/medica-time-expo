import type { PropsWithChildren, ReactElement } from 'react';
import { ImageBackground, StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from './ThemedText';


const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{}>; // verificar se realmente é necessario 

export default function ParallaxScrollView({children}: Props) { //tentar entender melhor o uso de Props
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            headerAnimatedStyle
          ]}>
          <ThemedText style={styles.logotext}>MEDICA TIME</ThemedText>


        {/* <img src='./assets/images/medica-time3.png' height={100} /> */}
        
        </Animated.View>
        
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    overflow: 'hidden',
    backgroundColor:'#178288'
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  logotext:{
    color:'#fff',
    height:50,
    fontSize:50,
    padding:20,

    }
});
