import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

interface ClassItem {
  id: string;
  title: string;
  teacher: string;
  startTime: string;
  endTime: string;
  studentCount: number;
}

export default function ClassScreen() {
  const [classes, setClasses] = React.useState<ClassItem[]>([]);

  useEffect(() => {
    // Simulating backend / input data
    setClasses([
      {
        id: "1",
        title: "Advanced Mathematics",
        teacher: "Dr. Sarah Wilson",
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
    ]);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* ---------- HEADER ---------- */}
      <View className="flex-row justify-between items-center px-5 pt-4">
        <Text className="text-2xl font-bold text-foreground">My Classes</Text>

        <View className="flex-row items-center gap-2">
          <Ionicons name="people-outline" size={18} color="black" />
          <Text className="text-sm text-foreground">Student Mode</Text>
        </View>
      </View>

      {/* ---------- SEARCH BAR ---------- */}
      <View className="flex-row items-center px-5 mt-4 gap-3">
        <View className="flex-1 bg-card rounded-xl px-4 py-3">
          <TextInput
            placeholder="Search classes..."
            placeholderTextColor="#000"
            className="text-foreground"
          />
        </View>

        <TouchableOpacity className="bg-primary p-3 rounded-xl">
          <Ionicons name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* ---------- CLASS LIST ---------- */}
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View className="bg-card rounded-2xl p-4 mb-4 border border-border">
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

              <View className="bg-accent p-2 rounded-full">
                <Ionicons name="people" size={18} color="black" />
              </View>
            </View>

            {/* Time & Students */}
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
            </View>
          </View>
        )}
      />

      {/* Inside Class */}
      <View className="flex-1 justify-center items-center">
        <Pressable
          onPress={() => {
            router.push("/class-details/Announcements");
          }}
        >
          <Text>Inside Class</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
