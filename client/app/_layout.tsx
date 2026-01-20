import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
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
            const params = route.params as { classID?: string };

            return {
              headerShown: true,
              title: params?.classID ?? "Class",
              headerShadowVisible: true,
              headerStyle: {
                backgroundColor: "transparent",
              },
            };
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
