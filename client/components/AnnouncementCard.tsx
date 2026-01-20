import { View, Text, Image } from "react-native";
import React from "react";
import { Announcement } from "@/types/announcement";

export default function AnnouncementCard({ item }: { item: Announcement }) {
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
