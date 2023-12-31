import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, StatusBar } from 'react-native'
import MMKVStorage, { MMKVInstance, MMKVLoader } from 'react-native-mmkv-storage';

import Animated,{FadeIn, FadeInDown, FadeInUp, FadeOut} from 'react-native-reanimated';

interface Props extends StackScreenProps<any,any>{};


interface Immkv{
    MMKV: MMKVInstance;
}

export const mmkv = new MMKVLoader().initialize()


export const SignUp = ({navigation}:Props) => {
    const[usuario, setUsuario] = useState('');
    const[password, setPassword] = useState('');



  return (
    <View className='bg-white h-full w-full'>
        

        <Image className="h-full w-full absolute" source={require('../assets/images/v904-nunny-010-f.jpg')}/>

        <View className='flex-row justify-around w-full absolute'>
            <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className='h-[225] w-[90]' source={require('../assets/images/light.png')}/>
            <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className='h-[160] w-[65]' source={require('../assets/images/light.png')}/>
        </View>

        <View className='h-full w-full flex justify-around pt-40 pb-10 xl:mt-4'>
            <View className='flex items-center'>
                <Animated.Text entering={FadeInUp.duration(1000)}className='text-blue-500 font-bold tracking-wider text-5xl '>
                    Sign Up
                </Animated.Text>
            </View>
        

            <View className='flex items-center mx-4 space-y-4'>
                <Animated.View entering = {FadeInDown.duration(1000).springify()} className='bg-black/5 p-5 rounded-2xl w-full'>
                    <TextInput className = 'text-black' placeholder='Usuario' placeholderTextColor={'gray'} value={usuario} onChangeText={(text) => setUsuario(text)}/>
                </Animated.View>

                <Animated.View entering = {FadeInDown.delay(200).duration(1000).springify()} className='bg-black/5 p-5 rounded-2xl w-full mb-3'>
                    <TextInput placeholder='Contraseña' placeholderTextColor={'gray'} value={password} onChangeText={(text) => setPassword(text)}/>
                </Animated.View>

                <Animated.View entering = {FadeInDown.delay(400).duration(1000).springify()} className='w-full'>
                    <TouchableOpacity className='w-full bg-purple-600 p-3 rounded-2xl mb-3'>
                        <Text className='text-xl font-bold text-white text-center'>Registrarse</Text>
                    </TouchableOpacity>
                </Animated.View>

              
            </View>
            
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titulo: {
        color: 'black',
        fontSize: 24,
        marginBottom: 16,
    },

    input:{
      backgroundColor:'gray',
      width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
      
    }
})


