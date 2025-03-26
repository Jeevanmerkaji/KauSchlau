import React from "react";
import {View, Text, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import { SafeAreaView } from 'react-native';
import images from '@/constants/images';
import { Redirect, router } from 'expo-router';
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";

const SignIn = () => {

  const {refetch, loading, isLogged} = useGlobalContext();

  if(!loading && isLogged) return <Redirect href="/"/>
  
  const handleLogin = async () =>{
    const result = await login();
    
    if(result) {
      refetch({});
    }
    else {
      Alert.alert('Error' , 'Failed to login');
    }
  }
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName='h-full'>
        <Image source={images.jawpain} className='w-full h-4/6' resizeMode='contain'/>
        <View className= "px-10">
          <Text  className='text-base text-center uppercase font-rubik text-black-200'>Welcome To the Self Care App</Text>
          <Text  className="text-3xl font-rubik-bold text-black-300 text-center mt-2">Let's get you closer to {'\n'}</Text>
          <Text  className='text-primary-300 text-center'>Your Idea Place for Self care of your Tooth</Text>
          <Text  className="text-lg font-rubik text-black-200 text-center mt-12"> Login to ReState with google</Text>
          <TouchableOpacity onPress={handleLogin} className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5">
            <View className="flex flex-row items-center justify-center">
              <Image source={icons.google} className="w-5 h-5" resizeMode="contain"></Image>
              <Text className="text-lg font-rubik-medium text-black-300 ml-2" >Continue With Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
} 

export default SignIn