import { router, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Pressable, StatusBar, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"default"} />
      <Stack
        screenOptions={{
          contentStyle: {
            flex: 1,
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[classID]"
          options={({ route }) => {
            const params = route.params as {
              classID?: string;
              className?: string;
            };

            return {
              headerShown: true,
              title: params?.className ?? "Class",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "#e9faee",
              },

              headerLeft: () => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      router.back();
                    }}
                    className="text-center p-2 rounded-full bg-white  mr-4"
                  >
                    <Ionicons name="arrow-back-outline" size={20} />
                  </TouchableOpacity>
                );
              },
            };
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
