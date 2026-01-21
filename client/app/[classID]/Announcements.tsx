import {
  View,
  Text,
  StatusBar,
  Pressable,
  Modal,
  FlatList,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableHighlight,
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
      <View className="w-full h-full items-center">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View className="modal-page flex-1 w-full justify-center items-center ">
            <View className="modal-container w-[80%] p-5 elevation-lg rounded-xl bg-white">
              <View className="modal-header w-full flex-row justify-between ">
                <Text className="font-bold text-xl"> New Announcement </Text>
                <Ionicons
                  onPress={handleModalClose}
                  name="close-outline"
                  size={24}
                />
              </View>
              {/* Title section */}
              <View className="title w-full">
                <Text className="mt-8 mb-2 text-mutedForeground">Title</Text>
                <View className="w-full min-h-12 flex-row items-center border border-border rounded-lg px-2">
                  <Ionicons
                    className="w-[10%]"
                    size={20}
                    name="chatbox-outline"
                    color={"#888"}
                  />
                  <TextInput
                    multiline
                    editable
                    numberOfLines={3}
                    placeholder="Announcement Title"
                    className=" w-[90%] placeholder:text-mutedForeground/50 p-2 rounded-lg"
                  />
                </View>
              </View>
              {/* Message Section */}
              <View className="message w-full ">
                <Text className="mt-2 mb-2 text-mutedForeground">Message</Text>
                <View className="w-full min-h-24 border border-border rounded-lg">
                  <TextInput
                    multiline
                    editable
                    numberOfLines={8}
                    placeholder="What would you like to share with your class ?"
                    className="w-full placeholder:text-mutedForeground/50 px-4 rounded-lg"
                  />
                </View>
              </View>
              {/* Submit Modal Button */}
              <TouchableOpacity className="submit-button-container  bg-primary w-full elevation-lg border border-border mt-4 p-5 rounded-lg">
                <Text className="text-center text-background">
                  Post Announcement
                </Text>
              </TouchableOpacity>
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
          contentContainerStyle={{ paddingBottom: 30 }}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          data={announcementData}
          renderItem={({ item }) => <AnnouncementCard item={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

function AnnouncementCard({ item }: { item: Announcement }) {
  return (
    <View className="announcement-container shadow-sm elevation-sm p-5 w-[90%] min-h-[30%] mt-5 bg-white rounded-xl">
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
