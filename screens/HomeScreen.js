import { View, Text, SafeAreaView, Image, TextInput } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-gray-white">
      <View className="px-4">
        <View className="flex-row space-x-2 items-center">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="w-12 h-12 rounded-full bg-gray-300"
          />
          <View className="justify-between flex-1">
            <Text className="text-xs text-gray-400 font-bold">
              Deliver now!
            </Text>
            <Text className="font-bold text-xl">
              Current location
              <ChevronDownIcon size={20} color="#00CCBB" />
            </Text>
          </View>
          <UserIcon size={35} color="#00CCBB" />
        </View>
        <View>
          <View>
            <MagnifyingGlassIcon />
            <TextInput
              placeholder="Restaurants and cuisines"
              keyboardType="default"
            />
          </View>
          <AdjustmentsVerticalIcon size={20} color="#00CCBB" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
