import React, { useState } from "react";
import "../global.css";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { loginUser } from "@/redux/slice/authSlice";
import { loginData } from "@/types/authForms";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const dispatch = useAppDispatch();
  const { isLoggingIn } = useAppSelector((state) => state.auth);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async () => {
    const data: loginData = {
      institutionId: id,
      password: password,
    };
    const result = await dispatch(loginUser(data));
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ padding: 24, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          {/* Header Section */}
<View className="items-center mt-12 mb-12">
  <View className="w-32 h-32 rounded-full bg-primary/10 items-center justify-center shadow-sm">
    <Ionicons
      name="school-outline"
      size={60}
      color="#059669"
    />
  </View>

  <Text className="mt-6 text-3xl font-black text-foreground tracking-tight">
    Attendance Tracker
  </Text>

  <Text className="text-mutedForeground mt-2 text-sm font-medium opacity-70">
    Smart Attendance Management System
  </Text>
</View>

          {/* Welcome Text */}
          <View className="mb-10">
            <Text className="text-4xl font-black text-foreground">
              Welcome Back
            </Text>
            <Text className="text-mutedForeground mt-2 text-lg font-medium opacity-80">
              Please sign in to your account
            </Text>
          </View>

          {/* Form Section */}
          <View className="space-y-4">
            {/* ID Input */}
            <View className="bg-card border border-border/50 rounded-2xl px-5 py-4 flex-row items-center shadow-sm">
              <Ionicons name="card-outline" size={20} color="#94a3b8" />
              <TextInput
                onChangeText={setId}
                placeholder="University Roll / Employee ID"
                placeholderTextColor="#94a3b8"
                className="flex-1 text-foreground text-base ml-3 font-medium"
              />
            </View>

            {/* Password Input */}
            <View className="bg-card border border-border/50 rounded-2xl px-5 py-4 mt-4 flex-row items-center shadow-sm">
              <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
              <TextInput
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showPassword}
                className="flex-1 text-foreground text-base ml-3 font-medium"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#94a3b8"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me & Forgot Password */}
          <View className="flex-row items-center justify-between mt-6 mb-10 px-1">
            <TouchableOpacity className="flex-row items-center">
              <View className="w-5 h-5 rounded-md border border-primary/50 items-center justify-center bg-primary/5">
                <View className="w-3 h-3 rounded-sm bg-primary" />
              </View>
              <Text className="text-mutedForeground ml-3 font-medium text-sm">
                Remember me
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-primary font-semibold text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoggingIn}
            activeOpacity={0.8}
            className={`py-5 rounded-2xl items-center shadow-lg ${isLoggingIn ? "bg-primary/70" : "bg-primary shadow-primary/30"}`}
          >
            <Text className="text-primaryForeground text-lg font-bold tracking-wide">
              {isLoggingIn ? "Logging in..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <View className="items-center mt-auto py-6">
            <Text className="text-mutedForeground font-medium">
              Don't have an account?{" "}
              <Text
                onPress={() => router.replace("/signUp")}
                className="text-primary font-bold"
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

