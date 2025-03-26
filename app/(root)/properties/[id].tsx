import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import icons from '@/constants/icons';
import images from '@/constants/images';

type Exercise = {
  id: string;
  title: string;
  description: string;
  image: any;
  duration: string;
  difficulty: string;
  steps: string[];
  tips: string[];
  videoUrl?: string;
};

const ExerciseDetail = () => {
  const { id } = useLocalSearchParams();
  const { colorScheme } = useColorScheme();

  // Mock data - replace with your actual data fetching
  const exercise: Exercise | undefined = {
    id: '1',
    title: 'Jaw Relaxation Exercise',
    description: 'This exercise helps relieve tension in your jaw muscles caused by bruxism.',
    image: images.exercise1,
    duration: '5 minutes',
    difficulty: 'Beginner',
    steps: [
      'Place your tongue gently on the roof of your mouth',
      'Let your teeth come apart while relaxing your jaw muscles',
      'Hold for 5 seconds, then relax completely',
      'Repeat 5-10 times'
    ],
    tips: [
      'Perform this exercise several times daily',
      'Combine with deep breathing for better relaxation',
      'Stop immediately if you feel pain'
    ],
    videoUrl: 'https://youtu.be/jaw-example-video'
  };

  if (!exercise) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white dark:bg-dark-background">
        <Text className="text-lg dark:text-white">Exercise not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark-background">
      <ScrollView className="p-4">
        {/* Header with back button */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-2 rounded-full bg-gray-100 dark:bg-dark-card mr-4"
          >
            <Image 
              source={icons.backArrow} 
              className="w-5 h-5 tint-black dark:tint-white"
            />
          </TouchableOpacity>
          <Text className="text-xl font-rubik-bold dark:text-white">
            Exercise Details
          </Text>
        </View>

        {/* Exercise Image */}
        <Image
          source={exercise.image}
          className="w-full h-64 rounded-xl mb-6"
          resizeMode="cover"
        />

        {/* Basic Info */}
        <View className="mb-6">
          <Text className="text-2xl font-rubik-bold dark:text-white mb-2">
            {exercise.title}
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-300 mb-4">
            {exercise.description}
          </Text>
          
          <View className="flex-row">
            <View className="bg-primary-100 dark:bg-dark-card px-4 py-2 rounded-full mr-3">
              <Text className="text-primary dark:text-primary-300">
                ⏱️ {exercise.duration}
              </Text>
            </View>
            <View className="bg-primary-100 dark:bg-dark-card px-4 py-2 rounded-full">
              <Text className="text-primary dark:text-primary-300">
                🏋️ {exercise.difficulty}
              </Text>
            </View>
          </View>
        </View>

        {/* Steps Section */}
        <View className="mb-8">
          <Text className="text-xl font-rubik-bold dark:text-white mb-4">
            How To Perform
          </Text>
          {exercise.steps.map((step, index) => (
            <View key={index} className="flex-row mb-3">
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-3">
                <Text className="text-white font-rubik-bold">{index + 1}</Text>
              </View>
              <Text className="flex-1 text-base text-gray-800 dark:text-gray-200">
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* Tips Section */}
        <View className="mb-8">
          <Text className="text-xl font-rubik-bold dark:text-white mb-4">
            Pro Tips
          </Text>
          {exercise.tips.map((tip, index) => (
            <View key={index} className="flex-row mb-2">
              <Image 
                source={icons.tips} 
                className="w-6 h-6 mr-3 tint-primary"
              />
              <Text className="flex-1 text-base text-gray-800 dark:text-gray-200">
                {tip}
              </Text>
            </View>
          ))}
        </View>

        {/* Video Section (if available) */}
        {/* {exercise.videoUrl && (
          <TouchableOpacity 
            className="flex-row items-center bg-red-50 dark:bg-dark-card p-4 rounded-lg mb-8"
            onPress={() => router.navigate(exercise.videoUrl)}
          >
            <Image 
              source={icons.youtube} 
              className="w-10 h-10 mr-3"
            />
            <Text className="text-red-500 dark:text-red-400 font-rubik-medium">
              Watch Video Tutorial
            </Text>
          </TouchableOpacity>
        )} */}
      </ScrollView>

      {/* Start Exercise Button */}
      <View className="p-4 border-t border-gray-200 dark:border-dark-card">
        <TouchableOpacity 
          className="bg-primary py-4 rounded-lg items-center"
          onPress={() => console.log('Exercise started')}
        >
          <Text className="text-white font-rubik-bold text-lg">
            Start This Exercise
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ExerciseDetail;