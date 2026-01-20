import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

function TabLabel({ focused, title }: { focused: boolean; title: string }) {
  return (
    <View
      className={`${focused ? "bg-primary " : "bg-transparent"} h-full w-full justify-center rounded-2xl`}
    >
      <Text
        className={`${focused ? "text-background" : "text-mutedForeground"} font-bold text-center`}
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
            width: "90%",
          },

          tabBarIconStyle: {
            display: "none",
          },
          tabBarItemStyle: {
            width: "auto",
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
      </Tabs>
    </View>
  );
}
