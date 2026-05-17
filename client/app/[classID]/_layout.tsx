import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

function TabLabel({ focused, title }: { focused: boolean; title: string }) {
  return (
    <View
      style={{ borderRadius: 16, overflow: "hidden" }}
      className={`${focused ? "bg-primary" : "bg-transparent"} h-full w-full justify-center`}
    >
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        className={`${focused ? "text-background" : "text-mutedForeground"} font-bold text-center text-[13px] px-1`}
      >
        {title}
      </Text>
    </View>
  );
}

export default function InsideClassLayout() {
  return (
    <View className="flex-1 w-full bg-background">
      <Tabs
        screenOptions={{
          tabBarPosition: "top",
          tabBarStyle: {
            marginTop: 12,
            marginBottom: 8,
            alignSelf: "center",
            elevation: 5,
            paddingTop: 0,
            borderRadius: 20,
            height: 60,
            width: "92%",
          },

          tabBarIconStyle: {
            display: "none",
          },
          tabBarItemStyle: {
            borderRadius: 16,
            overflow: "hidden",
            marginHorizontal: 4,
          },
        }}
      >
        <Tabs.Screen
          name="Announcements"
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <TabLabel focused={focused} title="Announcements" />
            ),
          }}
        />
        <Tabs.Screen
          name="Attendance"
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <TabLabel focused={focused} title="Attendance" />
            ),
          }}
        />
        <Tabs.Screen
          name="People"
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <TabLabel focused={focused} title="People" />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
