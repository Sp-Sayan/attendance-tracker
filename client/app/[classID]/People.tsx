import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Share,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useGlobalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchStudentsInClass } from "@/redux/slice/classroomSlice";

export default function People() {
  const { classID, className } = useGlobalSearchParams<{
    classID: string;
    className: string;
  }>();
  const dispatch = useAppDispatch();

  const { students, isFetchingStudents: loading } = useAppSelector(
    (state) => state.classroom,
  );

  function handleFetchStudents() {
    dispatch(fetchStudentsInClass(classID as string));
  }

  useEffect(() => {
    if (classID) {
      handleFetchStudents();
    }
  }, [classID]);

  const handleShare = async () => {
    await Share.share({
      message: `Join our class using Class ID: ${classID}`,
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#059669" />
      </View>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-background">
      <View className="flex-1 px-6">
        {/* Header Section with Class ID */}
        <View className="bg-primary/5 rounded-[32px] p-6 my-8 border border-primary/10">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-sm font-bold text-primary opacity-60 uppercase tracking-widest">
                Shareable Class ID
              </Text>
              <Text className="text-lg font-black text-foreground mt-1">
                {classID.slice(0, 20)}...
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleShare}
              className="bg-primary p-3 rounded-2xl shadow-sm"
            >
              <Ionicons name="share-social" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View className="h-[1px] bg-primary/10 w-full mb-4" />

          <View className="flex-row items-center">
            <View className="bg-primary/10 p-2 rounded-xl mr-3">
              <Ionicons name="people" size={20} color="#059669" />
            </View>
            <Text className="text-base font-bold text-foreground">
              {students.length} Students enrolled
            </Text>
          </View>
        </View>

        {/* Students List */}
        <Text className="text-2xl font-black text-foreground mb-6">
          Classmates <Text className="text-primary">.</Text>
        </Text>

        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={() => (
            <View className="items-center justify-center mt-10 opacity-40">
              <Ionicons name="people-outline" size={60} color="#94a3b8" />
              <Text className="text-lg font-bold text-slate-400 mt-4">
                No students enrolled yet
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="flex-row items-center bg-white p-4 rounded-3xl mb-4 border border-border/30 shadow-sm">
              <View className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden items-center justify-center mr-4">
                {item.profilePic && item.profilePic !== "null" ? (
                  <Image
                    source={{ uri: item.profilePic }}
                    className="w-full h-full"
                  />
                ) : (
                  <Ionicons name="person" size={24} color="#94a3b8" />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-foreground">
                  {item.name}
                </Text>
                <Text className="text-xs font-semibold text-mutedForeground opacity-70">
                  {item.department} • {item.section}
                </Text>
              </View>
              <View className="bg-slate-50 px-3 py-1 rounded-full">
                <Text className="text-[10px] font-bold text-slate-400 uppercase">
                  {item.role}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
