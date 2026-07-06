import {
  View,
  Text,
  StatusBar,
  Pressable,
  Modal,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Announcement } from "@/types/announcement";
import { useLocalSearchParams } from "expo-router";
import AnnouncementCard from "@/components/AnnouncementCard";

export default function Announcements() {
  const { classID, className } = useLocalSearchParams<{
    classID: string;
    className: string;
  }>();

  const [modalVisible, setModalVisible] = useState(false);
  const [announcementData, setAnnouncementData] = useState<Announcement[]>([
    {
      id: 1,
      senderName: "Dr. John Doe",
      senderProfession: "Department Head",
      senderProfilePic: require("@/assets/images/profile_pic.png"),
      message:
        "Attention all students! The mid-term project submission deadline has been extended to next Friday. Please review the updated rubrics on the dashboard.",
      timestamp: "10:42 AM",
    },
    {
      id: 2,
      senderName: "Prof. Moumita Sengupta",
      senderProfession: "Lecturer",
      senderProfilePic: require("@/assets/images/profile_pic.png"),
      message:
        "The lecture for 'Digital Communication' today will be moved to the virtual auditorium. Please use the link provided in the course syllabus.",
      timestamp: "09:15 AM",
    },
    {
      id: 3,
      senderName: "Admin Office",
      senderProfession: "Administration",
      senderProfilePic: require("@/assets/images/profile_pic.png"),
      message:
        "Campus maintenance will be active this weekend. Library services will be restricted on Sunday between 10 AM and 4 PM.",
      timestamp: "Yesterday",
    },
  ]);

  const handleOnPressAddAnnouncements = () => {
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-background">
      <View className="flex-1 px-6">
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/60 px-6">
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="w-full"
            >
              <View className="bg-white w-full rounded-[36px] overflow-hidden shadow-2xl">
                <View className="bg-primary/5 p-8 border-b border-slate-100 flex-row justify-between items-center">
                  <View>
                    <Text className="text-2xl font-black text-foreground">
                      New Post
                    </Text>
                    <Text className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                      Class Announcement
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={handleModalClose}
                    className="bg-white p-2 rounded-xl shadow-sm border border-slate-100"
                  >
                    <Ionicons name="close" size={24} color="#0f172a" />
                  </TouchableOpacity>
                </View>

                <View className="p-8">
                  <View className="mb-6">
                    <Text className="text-sm font-bold text-slate-500 mb-2 ml-1">
                      Subject
                    </Text>
                    <View className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 flex-row items-center">
                      <Ionicons
                        name="bookmark-outline"
                        size={20}
                        color="#94a3b8"
                      />
                      <TextInput
                        placeholder="What's this about?"
                        placeholderTextColor="#94a3b8"
                        className="flex-1 text-foreground font-semibold ml-3"
                      />
                    </View>
                  </View>

                  <View className="mb-8">
                    <Text className="text-sm font-bold text-slate-500 mb-2 ml-1">
                      Message Body
                    </Text>
                    <View className="bg-slate-50 border border-slate-100 rounded-[24px] px-4 py-4 min-h-[160px]">
                      <TextInput
                        multiline
                        placeholder="Write your announcement here..."
                        placeholderTextColor="#94a3b8"
                        className="text-foreground font-medium leading-6"
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="bg-primary py-5 rounded-2xl items-center shadow-lg shadow-primary/30"
                  >
                    <Text className="text-primaryForeground text-lg font-black tracking-wide">
                      Publish Announcement
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>

        {/* Announcements List */}
        <FlatList
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          data={announcementData}
          ListHeaderComponent={() => (
            <View>
              {/* Create Announcement Action */}
              <TouchableOpacity
                onPress={handleOnPressAddAnnouncements}
                activeOpacity={0.9}
                className="mt-6 mb-8"
              >
                <View className="bg-white border-2 border-dashed border-primary/30 p-8 items-center rounded-[32px] shadow-sm">
                  <View className="bg-primary/10 w-12 h-12 rounded-2xl items-center justify-center mb-3">
                    <Ionicons name="megaphone" size={24} color="#059669" />
                  </View>
                  <Text className="font-black text-primary text-lg">
                    Share with the class
                  </Text>
                  <Text className="text-slate-400 font-bold text-xs mt-1 opacity-70">
                    Tap to create a new announcement
                  </Text>
                </View>
              </TouchableOpacity>

              <View className="mb-6 flex-row items-center">
                <Text className="text-sm font-black text-slate-400 uppercase tracking-[3px]">
                  Recent Updates
                </Text>
                <View className="flex-1 h-[1px] bg-slate-100 ml-4" />
              </View>
            </View>
          )}
          renderItem={({ item }) => <AnnouncementCard item={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
