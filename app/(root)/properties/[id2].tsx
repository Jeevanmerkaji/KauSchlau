// app/symptom-history/index.tsx
import React from 'react';
import { View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'nativewind';
import { router } from 'expo-router';
import { format, formatDistanceToNow } from 'date-fns';
import icons from '@/constants/icons';

type Symptom = {
  id: string;
  date: Date;
  jawPain: number;
  jawStiffness: number;
  otherSymptoms?: string[];
};

const SymptomHistory = () => {
  const { colorScheme } = useColorScheme();
  
  // Mock data - replace with your actual data fetching
  const symptoms: Symptom[] = [
    {
      id: '1',
      date: new Date(2023, 5, 15),
      jawPain: 3,
      jawStiffness: 2,
      otherSymptoms: ['Headache', 'Earache']
    },
    {
      id: '2',
      date: new Date(2023, 5, 14),
      jawPain: 4,
      jawStiffness: 3,
      otherSymptoms: ['Facial pain']
    },
    // Add more history items
  ];

  const formatDate = (date: Date) => {
    return format(date, 'MMM dd, yyyy');
  };

  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const getPainEmoji = (level: number) => {
    if (level <= 2) return '😊';
    if (level <= 3) return '😐';
    return '😣';
  };

  const renderItem = ({ item }: { item: Symptom }) => (
    <View className="py-4 border-b border-gray-100 dark:border-gray-700">
      <View className="flex-row justify-between mb-2">
        <Text className="font-rubik-medium text-gray-800 dark:text-gray-200">
          {formatDate(item.date)}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {getTimeAgo(item.date)}
        </Text>
      </View>
      
      <View className="flex-row mb-2">
        <View className="flex-row items-center mr-4">
          <Text className="mr-1">{getPainEmoji(item.jawPain)}</Text>
          <Text className="text-sm text-gray-600 dark:text-gray-300">Pain: </Text>
          <Text className="text-sm font-rubik-bold ml-1">{item.jawPain}/5</Text>
        </View>
        
        <View className="flex-row items-center">
          <Image 
            source={icons.bell} // Add this to your icons
            className="w-4 h-4 mr-1 tint-primary"
          />
          <Text className="text-sm text-gray-600 dark:text-gray-300">Stiffness: </Text>
          <Text className="text-sm font-rubik-bold ml-1">{item.jawStiffness}/5</Text>
        </View>
      </View>
      
      {item.otherSymptoms && item.otherSymptoms.length > 0 && (
        <View className="flex-row flex-wrap mt-1">
          {item.otherSymptoms.map((symptom, index) => (
            <View 
              key={`symptom-${index}`}
              className="bg-primary-100 dark:bg-dark-card px-3 py-1 rounded-full mr-2 mb-2"
            >
              <Text className="text-xs text-primary dark:text-primary-300">
                {symptom}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-white dark:bg-dark-background">
      {/* Header */}
      <View className="p-5 border-b border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Image 
              source={icons.backArrow} 
              className="w-6 h-6 tint-black dark:tint-white"
            />
          </TouchableOpacity>
          <Text className="text-xl font-rubik-bold dark:text-white">
            Symptom History
          </Text>
          <View className="w-6" /> {/* Spacer for alignment */}
        </View>
      </View>

      {/* History List */}
      <FlatList
        data={symptoms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-5"
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center pt-10">
            <Text className="text-gray-500 dark:text-gray-400">
              No symptom history recorded yet
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default SymptomHistory;