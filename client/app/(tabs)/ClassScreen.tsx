import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ClassItem } from "@/types/classes";
export default function ClassScreen() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  const [searchParams, setSearchParams] = useState<string>();
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);

  useEffect(() => {
    // Simulating backend / input data
    setClasses([
      {
        id: "1",
        title: "Digital Communication",
        teacher: "Prof. Moumita Sengupta",
        startTime: "10:00 AM",
        endTime: "11:30 AM",
        studentCount: 34,
      },

      {
        id: "2",
        title: "Applied Physics",
        teacher: "Prof. James Miller",
        startTime: "12:00 PM",
        endTime: "01:30 PM",
        studentCount: 28,
      },

      {
        id: "3",
        title: "Computer Science",
        teacher: "Dr. Emily Chen",
        startTime: "02:00 PM ",
        endTime: "03:00 PM",
        studentCount: 42,
      },
      {
        id: "4",
        title: "English Literature",
        teacher: "Prof. Robert Brown",
        startTime: "04:00 PM",
        endTime: "05:30 PM",
        studentCount: 64,
      },
      {
        id: "5",
        title: "Computer Science",
        teacher: "Dr. Emily Chen",
        startTime: "02:00 PM ",
        endTime: "03:00 PM",
        studentCount: 42,
      },
      {
        id: "6",
        title: "Advanced Mathematics",
        teacher: "Dr. Sarah Wilson",
        startTime: "10:00 AM",
        endTime: "11:30 AM",
        studentCount: 34,
      },
      {
        id: "7",
        title: "English Literature",
        teacher: "Prof. Robert Brown",
        startTime: "04:00 PM",
        endTime: "05:30 PM",
        studentCount: 64,
      },
    ]);
  }, []);

  const handleSearch = (text: string) => {
    //set search
    setSearchParams(text);
    //check for empty search bar
    if (text.length > 0) setIsSearchEmpty(false);
    else setIsSearchEmpty(true);

    //search for classes
    const data: ClassItem[] = classes.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase()),
    );

    //set filtered list
    setFilteredClasses(data);
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      {/* ---------- HEADER ---------- */}
      <View className="flex-row justify-between items-center px-5 pt-4">
        <Text className="text-2xl font-bold text-foreground">My Classes</Text>

        <View className="flex-row items-center gap-2 p-1 rounded-lg">
          <Ionicons name="people-outline" size={18} color="black" />
          <Text className="text-sm text-foreground">Student Mode</Text>
        </View>
      </View>

      {/* ---------- SEARCH BAR ---------- */}
      <View className="flex-row items-center px-5 mt-4 mb-1 gap-3">
        <View className="flex-1 bg-white rounded-xl px-4 py-3 shadow-sm elevation-sm">
          <TextInput
            onChangeText={handleSearch}
            placeholder="Search classes..."
            placeholderTextColor="#000"
            className="text-foreground "
          />
        </View>

        <TouchableOpacity className="bg-primary p-3 rounded-xl">
          <Ionicons name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* ---------- CLASS LIST ---------- */}
      <FlatList
        className="pt-2"
        data={isSearchEmpty ? classes : filteredClasses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: `/[classID]/Announcements`,
                params: {
                  classID: item.id,
                  className: item.title,
                },
              })
            }
            className="mb-4 rounded-2xl"
          >
            <View className="bg-white shadow-lg elevation-lg rounded-2xl p-4 mb-4 ">
              {/* Title & Icon */}
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-bold text-foreground">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-mutedForeground mt-1">
                    {item.teacher}
                  </Text>
                </View>

                <Ionicons name="people-outline" size={20} color="black" />
              </View>

              {/* Time, Students & Arrow */}
              <View className="flex-row justify-between mt-4">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="time-outline" size={16} color="black" />
                  <Text className="text-sm text-foreground">
                    {item.startTime} - {item.endTime}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2">
                  <Ionicons name="people-outline" size={16} color="black" />
                  <Text className="text-sm text-foreground">
                    {item.studentCount} Students
                  </Text>
                </View>

                {/* Arrow Icon */}
                <Ionicons
                  name="arrow-forward-outline"
                  size={18}
                  color="black"
                />
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
