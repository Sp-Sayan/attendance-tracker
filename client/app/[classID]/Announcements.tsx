import {
  View,
  Text,
  StatusBar,
  Pressable,
  Modal,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Announcement } from "@/types/announcement";
import { useLocalSearchParams } from "expo-router";

export default function Announcements() {
  //extract class id from params
  const { classID } = useLocalSearchParams<{ classID: string }>();

  const [modalVisible, setModalVisible] = useState(false);
  const [announcementData, setAnnouncementData] = useState<Announcement[]>([
    {
      id: 1,
      senderName: "John Doe",
      senderProfession: "Professor",
      senderProfilePic: require("@/assets/images/profile_pic.png"),
      message:
        "Don't forget that the mid-term project submission deadline has been extended to next Friday. Please check the updated guidelines in the resources folder.",
      timestamp: "10:42AM",
    },
    {
      id: 2,
      senderName: "John Doe",
      senderProfession: "Professor",
      senderProfilePic: require("@/assets/images/profile_pic.png"),
      message:
        "Don't forget that the mid-term project submission deadline has been extended to next Friday. Please check the updated guidelines in the resources folder.",
      timestamp: "10:42AM",
    },
    {
      id: 3,
      senderName: "John Doe",
      senderProfession: "Professor",
      senderProfilePic: require("@/assets/images/profile_pic.png"),
      message:
        "Don't forget that the mid-term project submission deadline has been extended to next Friday. Please check the updated guidelines in the resources folder.",
      timestamp: "10:42AM",
    },
  ]);

  const handleOnPressAddAnnouncements = () => {
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };

  //TODO - MODAL FOR ADDING ANNOUNCEMENTS

  return (
    <SafeAreaView className="w-full flex-1 bg-background">
      <StatusBar barStyle={"default"} />
      <View className="w-full h-full items-center">
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View className="modal-page flex-1 w-full justify-center items-center ">
            <View className="modal-container p-5 elevation-lg rounded-xl bg-white">
              <View className="modal-header w-[70%]  flex-row justify-between ">
                <Text className="font-bold text-xl"> New Announcement </Text>
                <Ionicons
                  onPress={handleModalClose}
                  name="close-outline"
                  size={24}
                />
              </View>
              <View className="title ">{/* Title Input here */}</View>
            </View>
          </View>
        </Modal>

        {/* Create Announcement Button */}
        <Pressable
          onPress={handleOnPressAddAnnouncements}
          className="bg-primary/30 w-[90%] border-2 border-dashed border-primary/40 p-5 mt-2 flex justify-center items-center rounded-xl active:bg-primary/50"
        >
          <View className="flex-row justify-center items-center gap-2">
            <Text className="font-bold text-primary text-3xl">+</Text>
            <Text className="font-bold text-primary">
              Create New Announcement
            </Text>
          </View>
        </Pressable>

        {/* Announcements List */}
        <FlatList
          className="w-full"
          contentContainerClassName="items-center"
          data={announcementData}
          renderItem={({ item }) => <AnnouncementCard item={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

function AnnouncementCard({ item }: { item: Announcement }) {
  return (
    <View className="announcement-container p-5 w-[90%] min-h-[30%] mt-5 mb-5 bg-white rounded-xl">
      <View className="announcement-header w-full flex-row items-center gap-4">
        <Image
          className="object-cover h-16 w-16 rounded-full"
          source={item.senderProfilePic}
        />
        <View className="sender-info">
          <Text className="sender-name font-bold text-xl">
            {item.senderName}
          </Text>
          <Text className="sender-profession text-mutedForeground/60 text-sm">
            {item.senderProfession}
          </Text>
        </View>
      </View>
      <View className="w-full h-fit my-3">
        <Text className="p-2 text-justify">{item.message}</Text>
      </View>
      <View className="w-full items-start p-2 ">
        <Text className="text-sm text-mutedForeground/60">
          {item.timestamp}
        </Text>
      </View>
    </View>
  );
}
