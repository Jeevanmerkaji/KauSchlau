import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { router } from 'expo-router';
import images from '@/constants/images';
import icons from '@/constants/icons';
import Checkbox from 'expo-checkbox';
import { format, formatDistanceToNow } from 'date-fns';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';





interface DataPoint {
  period: string;
  level: number;
}



const SymptomsTab = () => {
  const { colorScheme } = useColorScheme();
  const [jawPain, setJawPain] = useState(0);
  const [jawStiffness, setJawStiffness] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const symptomOptions = [
    "Headache",
    "Facial pain",
    "Earache",
    "Sensitive teeth",
    "Difficulty opening mouth",
    "Disrupted sleep"
  ];

  const symptomHistory = [
    { id: '1', date: 'Today', jawPain: 3, jawStiffness: 2 },
    { id: '2', date: 'Yesterday', jawPain: 4, jawStiffness: 3 },
    { id: '3', date: 'May 13', jawPain: 2, jawStiffness: 1 }
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom) 
        : [...prev, symptom]
    );
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    console.log({
      jawPain,
      jawStiffness,
      selectedSymptoms,
      notes
    });
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or show success
    }, 1000);
  };

  return (
    <ScrollView className="px-5 pt-0">
      {/* Symptom Tracking Form */}
      <View className="border border-gray-200 rounded-lg p-4 bg-white dark:bg-dark-card mb-6">
        <Text className="text-lg font-rubik-bold mb-4 dark:text-white">Today's Symptoms</Text>
        
        {/* Jaw Pain Rating */}
        <View className="mb-6">
          <Text className="text-gray-800 dark:text-gray-200 mb-2">
            Jaw Pain: {jawPain}/5
          </Text>
          <Slider
            minimumValue={0}
            maximumValue={5}
            step={1}
            value={jawPain}
            onValueChange={setJawPain}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#B0C4DE"
            thumbTintColor="#007AFF"
          />
        </View>

        {/* Jaw Stiffness Rating */}
        <View className="mb-6">
          <Text className="text-gray-800 dark:text-gray-200 mb-2">
            Jaw Stiffness: {jawStiffness}/5
          </Text>
          <Slider
            minimumValue={0}
            maximumValue={5}
            step={1}
            value={jawStiffness}
            onValueChange={setJawStiffness}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#B0C4DE"
            thumbTintColor="#007AFF"
          />
        </View>

        {/* Symptom Checklist */}
        <View className="mb-6">
          <Text className="text-gray-800 dark:text-gray-200 mb-3 font-rubik-medium">
            Additional Symptoms
          </Text>
          {symptomOptions.map(symptom => (
            <View key={symptom} className="flex-row items-center mb-2">
              <Checkbox
                value={selectedSymptoms.includes(symptom)}
                onValueChange={() => handleSymptomToggle(symptom)}
                color={selectedSymptoms.includes(symptom) ? '#007AFF' : undefined}
              />
              <Text className="ml-2 text-gray-800 dark:text-gray-200">
                {symptom}
              </Text>
            </View>
          ))}
        </View>

        {/* Notes Field */}
        <View className="mb-6">
          <Text className="text-gray-800 dark:text-gray-200 mb-2 font-rubik-medium">
            Notes
          </Text>
          <TextInput
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-background"
            placeholder="Record any additional notes..."
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-primary py-3 rounded-lg items-center"
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text className="text-white font-rubik-bold text-lg">
            {isSubmitting ? "Saving..." : "Save Symptoms"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Symptom History */}
      <View className="border border-gray-200 rounded-lg p-4 bg-white dark:bg-dark-card mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-rubik-bold dark:text-white">
            Recent History
          </Text>
          <TouchableOpacity 
            onPress={() => router.push('/properties/[id2]')}
            className="flex-row items-center"
          >
            <Text className="text-primary font-rubik-medium mr-1">
              View All
            </Text>
            <Image 
              source={icons.rightArrow} 
              className="w-4 h-4 tint-primary"
            />
          </TouchableOpacity>
        </View>

        {symptomHistory.map(entry => (
          <View key={entry.id} className="py-3 border-b border-gray-100 dark:border-gray-700">
            <View className="flex-row justify-between">
              <Text className="text-gray-800 dark:text-gray-200">
                {entry.date}
              </Text>
              <View className="flex-row">
                <Text className="text-gray-600 dark:text-gray-400 mr-4">
                  Pain: {entry.jawPain}/5
                </Text>
                <Text className="text-gray-600 dark:text-gray-400">
                  Stiffness: {entry.jawStiffness}/5
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};


const TrackingTab = () => {
  const { colorScheme } = useColorScheme();
  
  // Sample pain level data over 6 weeks
  const painData = [
    { week: '1', level: 100 },
    { week: '2', level: 90 },
    { week: '3', level: 60 },
    { week: '4', level: 25 },
    { week: '5', level: 0 },
    { week: '6', level: 0 },
  ];

  // Check if pain has reduced
  const hasPainReduced = painData[0].level > painData[painData.length - 1].level;

  return (
    <ScrollView className="px-5 pt-0">
      {/* Progress Header */}
      <View className="bg-primary-100 dark:bg-dark-primary rounded-lg p-4 mb-6">
        <Text className="text-lg font-rubik-bold text-center dark:text-white">
          {hasPainReduced 
            ? "Deine Schmerzen haben sich reduziert! Weiter so!" 
            : "Tracke deine Fortschritte"}
        </Text>
      </View>

      {/* Time Period Selection */}
      <View className="mb-6">
        <Text className="text-md font-rubik-medium mb-2 dark:text-white">Zeitraum auswählen</Text>
        <View className="flex-row justify-between">
          {['Woche', 'Monat', 'Jahr'].map((period) => (
            <TouchableOpacity 
              key={period}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <Text className="dark:text-white">{period}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="flex flex-row items-center">
      {/* Y-Axis Label (Closer & Centered) */}
      <Text
        className="text-sm font-bold text-gray-600 dark:text-gray-300 absolute left-2 -rotate-90"
        style={{ transform: [{ translateX: -15 }], top: "40%" }} // Adjusted position
      >
        Pain Level (%)
      </Text>

      {/* Adjusted margin for better graph positioning */}
      <View className="ml-1 flex-1">
        <BarChart
          data={{
            labels: painData.map((item) => item.week),
            datasets: [
              {
                data: painData.map((item) => item.level),
              },
            ],
          }}
          width={Dimensions.get("window").width - 50} // Adjust width to fit screen better
          height={220}
          yAxisLabel="" // Keep empty to avoid repetition
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: colorScheme === "dark" ? "#1E293B" : "#FFFFFF",
            backgroundGradientFrom: colorScheme === "dark" ? "#1E293B" : "#FFFFFF",
            backgroundGradientTo: colorScheme === "dark" ? "#1E293B" : "#FFFFFF",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(29, 78, 216, ${opacity})`, // Blue bars
            labelColor: (opacity = 1) =>
              colorScheme === "dark"
                ? `rgba(255, 255, 255, ${opacity})`
                : `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.6, // Slightly thicker bars
            propsForBackgroundLines: {
              stroke: colorScheme === "dark" ? "#64748B" : "#E2E8F0",
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colorScheme === "dark" ? "#334155" : "#E2E8F0",
          }}
        />

        {/* X-Axis Label */}
        <Text className="text-sm font-bold text-center mt-0 text-gray-600 dark:text-gray-300">
          Weeks
        </Text>
      </View>
    </View>

      {/* Achievement Badge */}
      <View className="border border-primary-200 dark:border-primary-500 rounded-lg p-4 bg-primary-50 dark:bg-dark-primary/20 mb-8">
        <Text className="text-lg font-bold text-center text-primary-600 dark:text-primary-200 mb-3">
          Super, du hast Level 6 freigeschaltet!
        </Text>
        <View>
          <Image 
            source={icons.prize} 
            className="w-16 h-16 mx-auto"
            resizeMode="contain"
          />

        </View>

    </View>
    </ScrollView>
  );
};


interface PainAssessmentAppProps {
  initialTab?: 'assessment' | 'exercises' | 'symptoms' | 'tracking';
}


const PainAssessmentApp = ({ initialTab = 'assessment' }: PainAssessmentAppProps) => {
  const [painLevel, setPainLevel] = useState<number>(0);
  // const [activeTab, setActiveTab] = useState<'assessment' | 'exercises' | 'symptoms' | 'tracking'>('assessment');
  const [activeTab, setActiveTab] = useState(initialTab);
  const { colorScheme } = useColorScheme();
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);
  const handlePainLevelChange = (value: number) => {
    setPainLevel(value);
  };

  const AssessmentTab = () => (
    <ScrollView className="px-5 pt-0">
      {/* Image and Instructions Section */}
      <View className="mb-8">
        <View className="border border-gray-200 rounded-lg p-4 bg-white dark:bg-dark-card shadow-sm">
          <View className="flex items-center justify-center mb-3">
            <Image 
              source={images.assessment} 
              className="w-full h-64 object-contain rounded-md"
            />
          </View>
          
          <Text className="text-base text-center text-gray-800 dark:text-gray-300 mb-4">
            Taste den markierten Kaumuskel im Bild ab und schätze dein Schmerzlevel auf
            der folgenden Skala ab
          </Text>
        </View>

        <View className="mt-4 border border-gray-200 rounded-md p-3 bg-gray-50 dark:bg-dark-card mb-5">
          <Text className="text-gray-600 dark:text-gray-300 text-center">
            Wie ertaste ich meine Muskulatur am besten?
          </Text>
        </View>
      </View>

      {/* Pain Level Slider Section */}
      <View className="mb-8">
        <Text className="text-xl font-rubik-bold mb-3 text-black dark:text-white">
          Leiste zur Schmerzbeurteilung
        </Text>

        <View className="border border-gray-200 rounded-md p-3 bg-gray-50 dark:bg-dark-card">
          <Slider
            minimumValue={0}
            maximumValue={2}
            step={1}
            value={painLevel}
            onValueChange={handlePainLevelChange}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#B0C4DE"
            thumbTintColor="#007AFF"
            style={{ height: 70 }}
          />
        </View>

        <View className="flex flex-row justify-between mt-2">
          <Text className="text-sm text-gray-600 dark:text-gray-300">Kein Schmerz</Text>
          <Text className="text-sm text-gray-600 dark:text-gray-300">Mittlere Schmerz</Text>
          <Text className="text-sm text-gray-600 dark:text-gray-300">Starker Schmerz</Text>
        </View>
      </View>
    </ScrollView>
  );

  const ExercisesTab = () => {
    const exercises = [
      {
        id: '1',
        title: 'Jaw Relaxation',
        description: 'Gentle exercises to relax jaw muscles',
        image: images.exercise1,
        duration: '5 mins',
        difficulty: 'Beginner'
      },
      {
        id: '2',
        title: 'Tongue Positioning',
        description: 'Proper tongue placement techniques',
        image: images.exercise2,
        duration: '3 mins',
        difficulty: 'Easy'
      },
      {
        id: '3',
        title: 'Masseter Stretch',
        description: 'Stretches for jaw muscle relief',
        image: images.exercise3,
        duration: '7 mins',
        difficulty: 'Intermediate'
      },
    ];

    return (
      <FlatList
        data={exercises}
        ListHeaderComponent={
          <View className="px-5 pt-2 pb-4">
            <Text className="text-xl font-rubik-bold dark:text-white">
              Recommended Exercises
            </Text>
          </View>
        }
        contentContainerClassName="px-5 pb-6"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="mb-4 p-4 border border-gray-200 rounded-lg bg-white dark:bg-dark-card"
            onPress={() => router.push({
              pathname: "/properties/[id]",
              params: { id: item.id }
            })}
          >
            <View className="flex-row items-center">
              <Image 
                source={item.image} 
                className="w-20 h-20 rounded-md mr-4"
              />
              <View className="flex-1">
                <Text className="text-lg font-rubik-bold dark:text-white">
                  {item.title}
                </Text>
                <Text className="text-gray-600 dark:text-gray-300 mb-1">
                  {item.description}
                </Text>
                <View className="flex-row">
                  <Text className="text-sm text-gray-500 dark:text-gray-400 mr-3">
                    ⏱️ {item.duration}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    🏋️ {item.difficulty}
                  </Text>
                </View>
              </View>
              <Image 
                source={icons.rightArrow} 
                className="w-5 h-5 tint-gray-400 dark:tint-gray-500"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  




  const renderContent = () => {
    switch (activeTab) {
      case 'exercises': return <ExercisesTab />;
      case 'symptoms': return <SymptomsTab />;
      case 'tracking': return <TrackingTab />;
      default: return <AssessmentTab />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark-background">
      {/* Static Header */}
      <View className="p-5 pb-0">
        <Text className="text-2xl font-rubik-bold text-black dark:text-white">
          {activeTab === 'assessment' ? 'Schmerzabfrage Kaumuskulatur' : 
           activeTab === 'exercises' ? 'Bruxism Übungen' :
           activeTab === 'symptoms' ? 'Symptome' : 'Verlauf'}
        </Text>
      </View>

      {/* Static Tabs */}
      <View className="flex-row justify-between px-5 pt-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        <TouchableOpacity
          className={`pb-2 px-3 ${activeTab === 'assessment' ? 'border-b-2 border-primary' : ''}`}
          onPress={() => setActiveTab('assessment')}
        >
          <Text className={`font-rubik-medium ${activeTab === 'assessment' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
            Assessment
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className={`pb-2 px-3 ${activeTab === 'exercises' ? 'border-b-2 border-primary' : ''}`}
          onPress={() => setActiveTab('exercises')}
        >
          <Text className={`font-rubik-medium ${activeTab === 'exercises' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
            Exercises
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className={`pb-2 px-3 ${activeTab === 'symptoms' ? 'border-b-2 border-primary' : ''}`}
          onPress={() => setActiveTab('symptoms')}
        >
          <Text className={`font-rubik-medium ${activeTab === 'symptoms' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
            Symptoms
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className={`pb-2 px-3 ${activeTab === 'tracking' ? 'border-b-2 border-primary' : ''}`}
          onPress={() => setActiveTab('tracking')}
        >
          <Text className={`font-rubik-medium ${activeTab === 'tracking' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
            Tracking
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area - Each tab manages its own scrolling */}
      {renderContent()}
    </SafeAreaView>
  );
};

// export default PainAssessmentApp;


export default function Explore() {
  const params = useLocalSearchParams();
  const initialTab = params.initialTab as 'assessment' | 'exercises' | 'symptoms' | 'tracking';
  
  return <PainAssessmentApp initialTab={initialTab} />;
}
