import { View, Text, Pressable } from "react-native";
import React from "react";
import { Tabs, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

export default function MainTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#09862f",
        tabBarInactiveTintColor: "#5c635e",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ClassScreen"
        options={{
          title: "Classes",
          headerShown: false,
          tabBarButton: (props) => <SpecialTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

//BUG
const SpecialTabButton = ({ onPress }: any) => {
  const pathName = usePathname();
  const focused = pathName.startsWith("/ClassScreen");

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          position: "absolute",
          top: -30,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Pressable
          onPress={onPress}
          style={{
            height: 60,
            width: 60,
            borderRadius: 35,
            backgroundColor: focused ? colors.primary : colors.mutedForeground,
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
          }}
        >
          <Ionicons name="book-outline" size={32} color="white" />
        </Pressable>
      </View>

      <Text
        style={{
          marginTop: 35,
          fontSize: 12,
          color: focused ? colors.primary : colors.mutedForeground,
        }}
      >
        Classes
      </Text>
    </View>
  );
};
