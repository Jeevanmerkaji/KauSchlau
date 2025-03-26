import {
  ActivityIndicator,
  FlatList,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import { useColorScheme } from "nativewind";
import { Card, FeaturedCard } from "@/components/Cards";
import { useAppwrite } from "@/lib/useAppwrite";
import { useGlobalContext } from "@/lib/global-provider";
import images from "@/constants/images";

// Function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const Home = () => {
  const videoUrl = "https://www.youtube.com/watch?v=RU2m_W40ijc";
  const videoId = getYouTubeVideoId(videoUrl); // Extract video ID from URL

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const { user } = useGlobalContext();
  const { colorScheme, toggleColorScheme } = useColorScheme();


  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  const dummyData = [
    { id: '1', title: 'Featured Content 1' },
   
  ];
 return (
    <SafeAreaView className="h-full bg-white dark:bg-dark-background">
      <FlatList
        data={dummyData}
        numColumns={1}
        renderItem={({ item }) => (
          <View className="px-5">
            {/* Header Section */}
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row">
                <Image 
                  source={{ uri: user?.avatar }} 
                  className="size-12 rounded-full" 
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-gray-500 dark:text-gray-300">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black dark:text-white">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row items-center gap-4">
                <Image 
                  source={icons.bell} 
                  className="size-6 tint-black dark:tint-white" 
                />
                <Switch 
                  value={colorScheme == 'dark'} 
                  onChange={toggleColorScheme} 
                />
              </View>
            </View>

            <Search />

            {/* Featured Section */}
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black dark:text-white">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary dark:text-white">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {/* YouTube Video Section */}
              <View className="mt-5">
                <View className="flex-row items-center justify-center mb-3">
                  <Image 
                    source={icons.info} 
                    className="w-5 h-5 mr-2 tint-primary" 
                  />
                  <Text className="text-2xl font-rubik-bold text-black dark:text-white">
                    Learn About Bruxism
                  </Text>
                </View>
                {videoId ? (
                  <YoutubePlayer
                    height={200}
                    play={false}
                    videoId={videoId}
                  />
                ) : (
                  <Text className="text-gray-500">No video available</Text>
                )}
              </View>

              {/* Image Section */}
              <View className="mt-5">
                <Image 
                  source={images.leon} 
                  className="w-full h-48 object-contain mb-5 rounded-lg"
                />
                <Image 
                  source={images.bruxism} 
                  className="w-full h-48 object-contain rounded-lg" 
                />
              </View>
            </View>

            {/* Recommendations Section */}
            <View className="mt-5 mb-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black dark:text-white">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary dark:text-white">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              <Filters />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};


export default Home;
