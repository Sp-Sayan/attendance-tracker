import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { logoutUser } from "@/redux/slice/authSlice";
import { router } from "expo-router";
import { User } from "@/types/userType";

export default function ProfileScreen() {
  const dispatch = useAppDispatch();

  const isLoggedOut = useAppSelector((state) => state.auth.isLoggedOut);

  const currentUser: User | null = useAppSelector(
    (state) => state.auth.authUser,
  );

  const classes = useAppSelector((state) => state.classroom);

  /* ======================================================
     ROLE
  ====================================================== */

  const role = currentUser?.role || "TEACHER";

  const handleLogout = async () => {
    await dispatch(logoutUser());

    if (isLoggedOut) {
      router.replace("/login");
    }
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* ======================================================
            HEADER SECTION
        ====================================================== */}

        <View className="px-6 pt-6 pb-8 bg-white border-b border-slate-100 shadow-sm">
          <View className="flex-row justify-between items-center mb-10">
            <Text className="text-4xl font-black text-foreground">
              Profile <Text className="text-primary">.</Text>
            </Text>

            <TouchableOpacity className="bg-slate-50 p-3 rounded-2xl">
              <Ionicons name="settings-outline" size={22} color="#475569" />
            </TouchableOpacity>
          </View>

          {/* ======================================================
              PROFILE HEADER CARD
          ====================================================== */}

          <View className="items-center">
            <View className="relative">
              <View className="p-1 rounded-[40px] bg-primary/10 shadow-sm">
                <Image
                  source={require("../../assets/images/profile_pic.png")}
                  className="w-32 h-32 rounded-[36px] border-4 border-white"
                />
              </View>

              <TouchableOpacity className="absolute bottom-1 right-1 bg-primary p-2.5 rounded-2xl border-4 border-white shadow-lg">
                <Ionicons name="camera" size={18} color="white" />
              </TouchableOpacity>
            </View>

            <View className="items-center mt-6">
              <Text className="text-3xl font-black text-foreground">
                {currentUser?.name ||
                  (role === "TEACHER" ? "test" : "std-test")}
              </Text>

              <View className="flex-row items-center mt-1 bg-slate-50 px-3 py-1 rounded-full">
                <Ionicons name="business-outline" size={14} color="#64748b" />

                <Text className="text-slate-500 font-bold text-xs ml-2 uppercase tracking-tight">
                  {currentUser?.department}
                  {role === "TEACHER" ? " • Assistant Professor" : ""}
                </Text>
              </View>

              <Text className="text-slate-400 font-medium text-xs mt-2">
                {role === "TEACHER" ? "Teacher ID" : "Student ID"}:{" "}
                {currentUser?.institutionId}
              </Text>
            </View>
          </View>
        </View>

        {/* ======================================================
            STATS GRID
        ====================================================== */}

        <View className="px-6 -mt-4">
          <View className="flex-row flex-wrap justify-between">
            <StatCard
              icon="book"
              color="emerald"
              value={classes.classCount.toString()}
              label="Classes"
            />

            <StatCard
              icon="trending-up"
              color="blue"
              value={role === "TEACHER" ? "6" : "85%"}
              label={role === "TEACHER" ? "Total Subjects" : "Attendance"}
            />

            <StatCard
              icon="time"
              color="amber"
              value={role === "TEACHER" ? "248" : "142"}
              label={role === "TEACHER" ? "Total Students" : "Hours"}
            />

            <StatCard
              icon="flame"
              color="rose"
              value={role === "TEACHER" ? "92%" : "15"}
              label={role === "TEACHER" ? "Attendance Rate" : "Streak"}
            />
          </View>
        </View>

        {/* ======================================================
            MENU SECTION
        ====================================================== */}

        <View className="px-6 mt-8 mb-12">
          <Text className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">
            Account Settings
          </Text>

          <MenuButton
            icon="person-outline"
            label="Personal Details"
            onPress={() => {}}
          />

          <MenuButton
            icon="shield-checkmark-outline"
            label="Security & Privacy"
            onPress={() => {}}
          />

          <MenuButton
            icon="notifications-outline"
            label="Notification Settings"
            onPress={() => {}}
          />

          <View className="h-[1px] bg-slate-100 my-6 mx-2" />

          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.7}
            className="flex-row items-center justify-between bg-rose-50 px-6 py-5 rounded-[24px] border border-rose-100 shadow-sm"
          >
            <View className="flex-row items-center">
              <View className="bg-rose-500/10 p-2 rounded-xl">
                <Ionicons name="log-out" size={20} color="#e11d48" />
              </View>

              <Text className="ml-4 text-rose-600 font-black text-base">
                Sign Out
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#e11d48"
              opacity={0.5}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ======================================================
   REUSABLE STAT CARD
====================================================== */

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  color: "emerald" | "blue" | "amber" | "rose";
}) {
  const colorMap = {
    emerald: {
      bg: "bg-emerald-50",
      icon: "#059669",
      tint: "bg-emerald-500/10",
    },

    blue: {
      bg: "bg-blue-50",
      icon: "#2563eb",
      tint: "bg-blue-500/10",
    },

    amber: {
      bg: "bg-amber-50",
      icon: "#d97706",
      tint: "bg-amber-500/10",
    },

    rose: {
      bg: "bg-rose-50",
      icon: "#e11d48",
      tint: "bg-rose-500/10",
    },
  };

  const style = colorMap[color];

  return (
    <View className="bg-white w-[48%] rounded-[28px] p-5 mb-4 border border-slate-100 shadow-sm">
      <View
        className={`w-12 h-12 rounded-2xl ${style.tint} items-center justify-center mb-4`}
      >
        <Ionicons name={icon as any} size={24} color={style.icon} />
      </View>

      <Text className="text-2xl font-black text-foreground">{value}</Text>

      <Text className="text-slate-400 font-bold text-xs mt-1">{label}</Text>
    </View>
  );
}

/* ======================================================
   REUSABLE MENU BUTTON
====================================================== */

function MenuButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      className="flex-row items-center justify-between bg-white px-6 py-5 rounded-[24px] border border-slate-100 shadow-sm mb-4"
    >
      <View className="flex-row items-center">
        <View className="bg-slate-50 p-2 rounded-xl">
          <Ionicons name={icon as any} size={20} color="#475569" />
        </View>

        <Text className="ml-4 text-slate-700 font-bold text-base">{label}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
    </TouchableOpacity>
  );
}
