import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as LocalAuthentication from "expo-local-authentication";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "@/redux/hooks/hooks";
import { User } from "@/types/userType";
import { useGlobalSearchParams } from "expo-router";

const rooms: string[] = ["Room 101", "Room 102", "Room 103", "Room 104"];

const Attendance: React.FC = () => {
  const { classID, className } = useGlobalSearchParams<{
    classID: string;
    className: string;
  }>();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [attendanceMarked, setAttendanceMarked] = useState<boolean>(false);
  const [isAttendanceEnabled, setIsAttendanceEnabled] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  const authUser: User | null = useAppSelector((state) => state.auth.authUser);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
      setCurrentDate(now.toDateString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBiometric = async () => {
    if (!selectedRoom) return;

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert(
        "Error",
        "Biometric authentication is not supported on this device.",
      );
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert(
        "Not Set Up",
        "No biometric records found. Please set up Face ID or Fingerprint in your device settings.",
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Verify identity to mark attendance",
      fallbackLabel: "Use Passcode",
    });

    if (result.success) {
      setAttendanceMarked(true);
    } else {
      Alert.alert(
        "Failed",
        "Authentication was unsuccessful. Please try again.",
      );
    }
  };

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="px-6 pt-6">
          {/* Class Info */}
          <View className="mb-6">
            <Text className="text-slate-400 font-bold text-xs text-center uppercase tracking-widest mt-1">
              ID: {classID}
            </Text>
          </View>

          {/* Header Card */}
          <View className="bg-slate-900 rounded-[40px] p-8 mb-10 shadow-2xl relative overflow-hidden">
            <View className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-10 -mt-10 blur-2xl" />

            <View className="flex-row justify-between items-center mb-8">
              <View className="bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
                <Text className="text-white font-bold text-xs uppercase tracking-widest">
                  Live Terminal
                </Text>
              </View>
              <Ionicons name="radio-outline" size={20} color="#059669" />
            </View>

            <View className="items-center py-4">
              <Text className="text-white text-5xl font-black tracking-tighter">
                {currentTime}
              </Text>
              <Text className="text-slate-400 font-bold mt-2 uppercase tracking-[4px] text-[10px]">
                {currentDate}
              </Text>
            </View>

            <View className="h-[1px] bg-white/5 my-8" />

            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="text-slate-500 text-[10px] font-black uppercase mb-1">
                  Status
                </Text>
                <Text className={`${isAttendanceEnabled ? "text-emerald-400" : "text-amber-400"} font-bold`}>
                  {isAttendanceEnabled ? "ACTIVE" : "READY"}
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-slate-500 text-[10px] font-black uppercase mb-1">
                  Secure
                </Text>
                <Ionicons name="shield-checkmark" size={16} color={isAttendanceEnabled ? "#059669" : "#94a3b8"} />
              </View>
            </View>
          </View>

          {/* User Info */}
          <View className="flex-row items-center bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm mb-10">
            <View className="bg-slate-50 p-1 rounded-2xl border border-slate-100">
              <View className="w-16 h-16 bg-primary/10 rounded-xl items-center justify-center">
                <Ionicons name="person" size={32} color="#059669" />
              </View>
            </View>
            <View className="ml-5 flex-1">
              <Text className="text-2xl font-black text-foreground">
                {authUser?.name}
              </Text>
              <Text className="text-slate-400 font-bold text-xs uppercase tracking-wider mt-1">
                {authUser?.role === "TEACHER" ? "Instructor Privileges" : "Verification Required"}
              </Text>
            </View>
          </View>

          {/* Selection Area */}
          <Text className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 ml-4">
            {authUser?.role === "TEACHER" ? "Session Control" : "Terminal Selection"}
          </Text>

          <TouchableOpacity
            onPress={() => setShowDropdown(!showDropdown)}
            activeOpacity={0.8}
            className={`flex-row justify-between items-center bg-white rounded-[24px] px-6 py-6 border-2 transition-all shadow-sm ${selectedRoom ? "border-primary" : "border-slate-100"}`}
          >
            <View className="flex-row items-center">
              <View
                className={`p-2 rounded-xl mr-4 ${selectedRoom ? "bg-primary/10" : "bg-slate-50"}`}
              >
                <Ionicons
                  name="location"
                  size={20}
                  color={selectedRoom ? "#059669" : "#94a3b8"}
                />
              </View>
              <Text
                className={`text-lg font-bold ${selectedRoom ? "text-foreground" : "text-slate-400"}`}
              >
                {selectedRoom || "Choose your room"}
              </Text>
            </View>
            <Ionicons
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color="#94a3b8"
            />
          </TouchableOpacity>

          {showDropdown && (
            <View className="mt-4 bg-white rounded-[28px] p-3 border border-slate-100 shadow-xl">
              {rooms.map((room, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedRoom(room);
                    setShowDropdown(false);
                  }}
                  className={`p-5 rounded-2xl mb-2 flex-row justify-between items-center ${selectedRoom === room ? "bg-primary/5" : "bg-transparent"}`}
                >
                  <Text
                    className={`font-bold text-base ${selectedRoom === room ? "text-primary" : "text-slate-600"}`}
                  >
                    {room}
                  </Text>
                  {selectedRoom === room && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#059669"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Action Button */}
          <View className="mt-12">
            {authUser?.role === "TEACHER" ? (
              <TouchableOpacity
                disabled={!selectedRoom}
                onPress={() => setIsAttendanceEnabled(!isAttendanceEnabled)}
                activeOpacity={0.9}
                className={`rounded-[32px] overflow-hidden shadow-2xl ${selectedRoom ? (isAttendanceEnabled ? "shadow-amber-400/40" : "shadow-primary/40") : ""}`}
              >
                <View
                  className={`p-8 items-center flex-row justify-center ${selectedRoom ? (isAttendanceEnabled ? "bg-amber-500" : "bg-primary") : "bg-slate-200"}`}
                >
                  <Ionicons
                    name={isAttendanceEnabled ? "stop-circle" : "play-circle"}
                    size={28}
                    color={selectedRoom ? "white" : "#94a3b8"}
                  />
                  <Text
                    className={`ml-4 text-xl font-black tracking-wide ${selectedRoom ? "text-white" : "text-slate-400"}`}
                  >
                    {isAttendanceEnabled ? "DISABLE ATTENDANCE" : "ENABLE ATTENDANCE"}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={!selectedRoom}
                onPress={handleBiometric}
                activeOpacity={0.9}
                className={`rounded-[32px] overflow-hidden shadow-2xl ${selectedRoom ? "shadow-primary/40" : ""}`}
              >
                <View
                  className={`p-8 items-center flex-row justify-center ${selectedRoom ? "bg-primary" : "bg-slate-200"}`}
                >
                  <Ionicons
                    name="finger-print"
                    size={28}
                    color={selectedRoom ? "white" : "#94a3b8"}
                  />
                  <Text
                    className={`ml-4 text-xl font-black tracking-wide ${selectedRoom ? "text-white" : "text-slate-400"}`}
                  >
                    VERIFY & MARK
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {!selectedRoom && (
              <Text className="text-center text-slate-400 font-bold text-xs mt-4">
                Please select a {authUser?.role === "TEACHER" ? "room" : "terminal"} to {authUser?.role === "TEACHER" ? "start session" : "enable scan"}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal transparent visible={attendanceMarked} animationType="fade">
        <View className="flex-1 justify-center items-center bg-slate-900/90 px-10">
          <View className="bg-white p-10 rounded-[48px] w-full items-center shadow-2xl border-4 border-emerald-500/20">
            <View className="w-24 h-24 bg-emerald-100 rounded-[36px] items-center justify-center mb-8 shadow-inner">
              <Ionicons name="checkmark-done" size={48} color="#059669" />
            </View>

            <Text className="text-3xl font-black text-foreground text-center mb-2">
              Verified!
            </Text>
            <Text className="text-slate-500 font-bold text-center mb-10 leading-6">
              Attendance for {selectedRoom} has been logged in the system.
            </Text>

            <TouchableOpacity
              onPress={() => setAttendanceMarked(false)}
              className="bg-slate-900 w-full py-5 rounded-3xl items-center shadow-lg"
            >
              <Text className="text-white font-black text-lg">Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Attendance;
