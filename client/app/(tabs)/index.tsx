import React, { useEffect } from "react";
import "../global.css";

import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

import { fetchClassrooms } from "@/redux/slice/classroomSlice";

import { Ionicons } from "@expo/vector-icons";

import { User } from "@/types/userType";

const Index = () => {
  const currentUser: User | null = useAppSelector(
    (state) => state.auth.authUser,
  );

  const classCount = useAppSelector((state) => state.classroom.classCount);

  const dispatch = useAppDispatch();

  const handleClassFetch = async () => {
    await dispatch(fetchClassrooms());
  };

  useEffect(() => {
    handleClassFetch();
  }, []);

  /* ======================================================
     ROLE
  ====================================================== */

  const role = currentUser?.role?.toUpperCase() || "STUDENT";

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ======================================================
            HEADER
        ====================================================== */}

        <View className="flex-row justify-between items-start mb-10">
          <View className="flex-1">
            <Text className="text-mutedForeground text-base font-semibold tracking-wide uppercase opacity-70">
              Welcome Back
            </Text>

            <Text className="text-4xl font-black text-foreground mt-1 leading-tight">
              {currentUser?.name}
              <Text className="text-primary">.</Text>
            </Text>

            {role === "TEACHER" && (
              <View className="flex-row items-center mt-3">
                <View className="w-3 h-3 bg-primary rounded-full mr-2" />

                <Text className="text-primary font-bold text-lg">Active</Text>
              </View>
            )}
          </View>
          </View>
          

        {/* ======================================================
            HERO CARD
        ====================================================== */}

        <View className="bg-slate-950 rounded-[36px] p-8 mb-10 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
          {/* Background Decoration */}

          <View className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

          <View
            className={`absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl`}
          />

          {/* TOP */}

          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">
              {role === "TEACHER" ? "Teaching Overview" : "Attendance Reminder"}
              </Text>

              <View className="flex-row items-end">
               {role === "TEACHER" ? (
  <>
    <Text className="text-7xl font-black text-white">
      {classCount}
    </Text>

    <Text className="text-2xl font-bold text-white ml-3 mb-2">
      Active Classes
    </Text>
  </>
) : (
  <Text className="text-white text-2xl font-black leading-9 max-w-[280px]">
    Classes may be optional in your heart, but 75% isn't ;)
  </Text>
)}
              </View>

              {role === "TEACHER" && (
                <Text className="text-slate-400 mt-2 font-semibold text-center">
  Students brought excuses, so we brought automation. Let that register retire!
</Text>
              )}
            </View>
          </View>

          {/* DIVIDER */}

          <View className="h-[1px] bg-slate-800 my-8" />

          {/* STATS */}

          {role === "TEACHER" ? (
            <View className="justify-center items-center">
              <View className="items-center">
                <Ionicons name="people-outline" size={32} color="#22c55e" />

                <Text className="text-white text-5xl font-black mt-4">248</Text>

                <Text className="text-slate-400 font-semibold mt-2 text-center text-base">
                  Total Students
                </Text>
              </View>
            </View>
       ) : (
  <View>
    <Text className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
      Total Classes
    </Text>

    <Text className="text-xl font-bold text-white">
      {classCount}
    </Text>
  </View>
)}

          {/* TEACHER BADGE */}

          {role === "TEACHER" && (
            <View className="items-center mt-8">
              <View className="bg-primary/20 px-6 py-3 rounded-full border border-primary/20 flex-row items-center">
                <Ionicons name="star-outline" size={20} color="#22c55e" />

                <Text className="text-primary font-black text-lg ml-2">
                  Teaching Efficiently
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* ======================================================
            SECTION HEADER
        ====================================================== */}

        <View className="flex-row justify-between items-center mb-6">
          <View>
           <Text className="text-2xl font-black text-foreground">
  Upcoming
</Text>

            <View className="h-1 w-10 bg-primary rounded-full mt-1" />
          </View>

        </View>

        {/* ======================================================
            CLASS CARD
        ====================================================== */}

        <TouchableOpacity
          activeOpacity={0.9}
          className="bg-white p-7 rounded-[32px] border border-border/40 shadow-sm mb-10"
        >
          <View className="flex-row justify-between items-start mb-6">
            <View className="bg-primary/10 p-4 rounded-3xl">
              <Ionicons
                name={role === "TEACHER" ? "book-outline" : "wifi-outline"}
                size={32}
                color="#059669"
              />
            </View>

            <View className="bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              <Text className="text-emerald-700 text-xs font-bold">
                LIVE NOW
              </Text>
            </View>
          </View>

          <Text className="text-3xl font-black text-foreground">
            {role === "TEACHER" ? "Compiler Design" : "Digital Communication"}
          </Text>

          <Text className="text-mutedForeground font-semibold mt-2 opacity-70 text-base">
            {role === "TEACHER"
              ? "Section A • Room 302"
              : "Prof. Moumita Sengupta"}
          </Text>

          <View className="flex-row mt-8">
          

            <View className="flex-row items-center bg-slate-50 px-4 py-3 rounded-2xl">
              <Ionicons name="people-outline" size={18} color="#64748b" />

              <Text className="text-slate-600 font-bold text-sm ml-2">
                {role === "TEACHER" ? "62 Students" : "34 Enrolled"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* ======================================================
            RECENT ACTIVITY
        ====================================================== */}

        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-black text-foreground">
              Recent Activity
            </Text>

            <View className="h-1 w-10 bg-primary rounded-full mt-1" />
          </View>

          <TouchableOpacity>
            <Text className="text-primary font-bold text-lg">View All</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white p-6 rounded-[32px] border border-border/40 shadow-sm flex-row justify-between items-center mb-8">
          <View className="flex-row items-center flex-1">
            <View className="w-16 h-16 bg-primary/10 rounded-3xl items-center justify-center">
              <Ionicons name="checkbox-outline" size={30} color="#059669" />
            </View>

            <View className="ml-5 flex-1">
              <Text className="font-black text-foreground text-xl">
                {role === "TEACHER"
                  ? "Attendance marked for DBMS"
                  : "Analog Circuit"}
              </Text>

              <Text className="text-mutedForeground text-sm font-medium opacity-70 mt-1">
                {role === "TEACHER" ? "Today, 10:30 AM" : "Marked at 09:45 AM"}
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={24} color="#94a3b8" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
