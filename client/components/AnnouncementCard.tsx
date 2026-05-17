import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Announcement } from "@/types/announcement";
import { Ionicons } from "@expo/vector-icons";

export default function AnnouncementCard({ item }: { item: Announcement }) {
  return (
    <View className="bg-white rounded-[32px] p-6 mb-6 shadow-sm border border-border/30 overflow-hidden relative">
      {/* Accent decoration */}
      <View className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-8 -mt-8" />

      <View className="flex-row items-center mb-5">
        <View className="ml-4 flex-1">
          <Text className="text-xl font-black text-foreground">
            {item.senderName}
          </Text>
          <View className="flex-row items-center mt-0.5">
            <Text className="text-xs font-bold text-primary uppercase tracking-wider">
              {item.senderProfession}
            </Text>
            <View className="w-1 h-1 rounded-full bg-slate-300 mx-2" />
            <Text className="text-xs font-bold text-slate-400">
              {item.timestamp}
            </Text>
          </View>
        </View>
        <TouchableOpacity className="p-2">
          <Ionicons name="ellipsis-horizontal" size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      <View className="bg-slate-50/50 p-4 rounded-2xl">
        <Text className="text-slate-600 leading-6 font-medium text-[15px]">
          {item.message}
        </Text>
      </View>

      <View className="flex-row mt-5 items-center justify-between">
        <View className="flex-row -space-x-2">
          {[1, 2, 3].map((i) => (
            <View
              key={i}
              className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white items-center justify-center"
            >
              <Ionicons name="person" size={12} color="#94a3b8" />
            </View>
          ))}
          <View className="pl-10">
            <Text className="text-[10px] font-bold text-slate-400 uppercase">
              Seen by 24 others
            </Text>
          </View>
        </View>

        <TouchableOpacity className="flex-row items-center bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
          <Ionicons name="chatbubble-outline" size={14} color="#64748b" />
          <Text className="text-[11px] font-bold text-slate-600 ml-2">
            Reply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
