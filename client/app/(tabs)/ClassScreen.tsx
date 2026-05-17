import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Share,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import React, { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { ClassItem } from "@/types/classes";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

import {
  createClassroom,
  enrollClassroom,
  fetchClassrooms,
} from "@/redux/slice/classroomSlice";

export default function ClassScreen() {
  const [classes, setClasses] = useState<ClassItem[]>([]);

  const [isSearchEmpty, setIsSearchEmpty] = useState(true);

  const [searchParams, setSearchParams] = useState<string>();

  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);

  /* ======================================================
     FAB + FORM STATES
  ====================================================== */

  const [menuVisible, setMenuVisible] = useState(false);

  const [formVisible, setFormVisible] = useState(false);

  /* ======================================================
     FORM STATES
  ====================================================== */

  const [department, setDepartment] = useState("");

  const [section, setSection] = useState("");

  const [subjectName, setSubjectName] = useState("");

  const [subjectCode, setSubjectCode] = useState("");

  const [classId, setClassId] = useState("");

  const [generatedId, setGeneratedId] = useState<string | null>(null);

  /* ======================================================
     REDUX
  ====================================================== */

  const classrooms: ClassItem[] | null = useAppSelector(
    (state) => state.classroom.classrooms,
  );

  const currentUser = useAppSelector((state) => state.auth.authUser);

  const isEnrolling = useAppSelector((state) => state.classroom.isEnrolling);

  const dispatch = useAppDispatch();

  /* ======================================================
     ROLE
  ====================================================== */

  const role = currentUser?.role?.toUpperCase();

  /* ======================================================
     FETCH CLASSROOMS
  ====================================================== */

  const handleFetchClassrooms = async () => {
    setClasses(classrooms || []);
  };

  useEffect(() => {
    handleFetchClassrooms();
  }, [classrooms]);

  /* ======================================================
     SEARCH
  ====================================================== */

  const handleSearch = (text: string) => {
    setSearchParams(text);

    if (text.length > 0) setIsSearchEmpty(false);
    else setIsSearchEmpty(true);

    const data: ClassItem[] = classes.filter((item) =>
      item.subjectName.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredClasses(data);
  };

  /* ======================================================
     VALIDATIONS
  ====================================================== */

  const isCreateValid =
    department.trim() !== "" &&
    section.trim() !== "" &&
    subjectName.trim() !== "" &&
    subjectCode.trim() !== "";

  const isEnrollValid = classId.trim().length == 36;

  /* ======================================================
     CREATE CLASS
  ====================================================== */

  const handleCreate = async () => {
    try {
      const result = await dispatch(
        createClassroom({
          subjectName,
          subjectCode,
          department,
          section,
        }),
      ).unwrap();

      if (result && result.result) {
        setGeneratedId(result.result.classId);
        setDepartment("");
        setSection("");
        setSubjectName("");
        setSubjectCode("");
      }
    } catch (error) {
      console.log("Error creating class:", error);
    }
  };

  /* ======================================================
     SHARE CLASS ID
  ====================================================== */

  const handleShare = async () => {
    if (!generatedId) return;

    await Share.share({
      message: `Join my class using Class ID: ${generatedId}`,
    });
  };

  /* ======================================================
     ENROLL CLASS
  ====================================================== */

  const handleEnroll = async () => {
    try {
      await dispatch(enrollClassroom(classId)).unwrap();
      setClassId("");
      setFormVisible(false);
    } catch (error) {
      console.log("Error enrolling in class:", error);
    }
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <View className="px-6 pt-6 pb-2">
        <View className="flex-row justify-between items-end">
          <View>
            <Text className="text-4xl font-black text-foreground">
              Classes <Text className="text-primary">.</Text>
            </Text>

            <Text className="text-mutedForeground font-semibold mt-1 opacity-70">
              {role === "TEACHER"
                ? "Manage your created classes"
                : "Manage your enrolled classes"}
            </Text>
          </View>

          <View className="bg-primary/10 px-3 py-1.5 rounded-xl flex-row items-center">
            <Ionicons name="person" size={14} color="#059669" />

            <Text className="text-[10px] font-bold text-primary ml-1.5 uppercase tracking-tighter">
              {role}
            </Text>
          </View>
        </View>
      </View>

      {/* ======================================================
          SEARCH BAR
      ====================================================== */}

      <View className="flex-row items-center px-6 mt-6 mb-4 gap-4">
        <View className="flex-1 bg-white rounded-2xl px-5 py-4 flex-row items-center shadow-sm border border-border/40">
          <Ionicons name="search-outline" size={20} color="#94a3b8" />

          <TextInput
            onChangeText={handleSearch}
            placeholder="Search your classes..."
            placeholderTextColor="#94a3b8"
            className="flex-1 text-foreground font-medium ml-3"
          />
        </View>

        <TouchableOpacity className="bg-white p-4 rounded-2xl shadow-sm border border-border/40">
          <Ionicons name="options-outline" size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      {/* ======================================================
          CLASS LIST
      ====================================================== */}

      <FlatList
        data={isSearchEmpty ? classes : filteredClasses}
        keyExtractor={(item) => item.classId}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 120,
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="items-center justify-center mt-20 opacity-50">
            <Ionicons name="book-outline" size={80} color="#94a3b8" />

            <Text className="text-lg font-bold text-slate-400 mt-4">
              No classes found
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/[classID]/Announcements",
                params: {
                  classID: item.classId,
                  className: item.subjectName,
                },
              })
            }
            className="mb-6"
          >
            <View className="bg-white rounded-[32px] p-6 shadow-sm border border-border/30 relative overflow-hidden">
              <View className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8" />

              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-4">
                  <View className="flex-row items-center gap-2 mb-1">
                    <View className="bg-slate-100 px-2 py-0.5 rounded-lg">
                      <Text className="text-[10px] font-bold text-slate-500">
                        {item.subjectCode}
                      </Text>
                    </View>
                  </View>

                  <Text
                    className="text-2xl font-black text-foreground"
                    numberOfLines={1}
                  >
                    {item.subjectName}
                  </Text>

                  <View className="flex-row items-center mt-2">
                    <Text className="text-mutedForeground font-bold opacity-70">
                      Prof. {item.teacherName}
                    </Text>
                    <View className="w-1 h-1 rounded-full bg-slate-300 mx-2" />
                    <Text className="text-mutedForeground font-bold opacity-70">
                      {item.department} {item.section}
                    </Text>
                  </View>
                </View>

                <View className="bg-slate-50 p-3 rounded-2xl">
                  <Ionicons name="journal-outline" size={22} color="#475569" />
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />

      {/* ======================================================
          FAB MENU
      ====================================================== */}

      {menuVisible && (
        <View className="absolute bottom-28 right-8 items-end">
          <TouchableOpacity
            onPress={() => {
              setMenuVisible(false);
              setFormVisible(true);
            }}
            className="bg-white px-6 py-4 rounded-2xl border border-border/50 shadow-xl flex-row items-center"
          >
            <Text className="text-foreground font-black mr-4 text-base">
              {role === "TEACHER" ? "Create" : "Enroll"}
            </Text>

            <View
              className={`${
                role === "TEACHER" ? "bg-primary/20" : "bg-blue-100"
              } p-2 rounded-xl`}
            >
              <Ionicons
                name={role === "TEACHER" ? "add-circle" : "school"}
                size={24}
                color={role === "TEACHER" ? "#059669" : "#2563eb"}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* ======================================================
          DYNAMIC FORM MODAL
      ====================================================== */}

      <Modal visible={formVisible} animationType="slide" transparent>
        <View className="flex-1 bg-black/40 justify-end">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View className="bg-background rounded-t-[40px] px-6 pt-6 pb-10 max-h-[90%]">
              <ScrollView
                scrollEnabled={role === "TEACHER" && !generatedId}
                bounces={false}
                showsVerticalScrollIndicator={false}
              >
                {/* HEADER */}

                <View className="flex-row justify-between items-center mb-8">
                  <View>
                    <Text className="text-3xl font-black text-foreground">
                      {role === "TEACHER" ? "Create Class" : "Join Class"}
                    </Text>

                    <Text className="text-mutedForeground mt-1">
                      {role === "TEACHER"
                        ? "Create and share your classroom ID"
                        : "Enter classroom ID to join"}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      setFormVisible(false);
                      setGeneratedId(null);
                    }}
                    className="w-12 h-12 rounded-2xl bg-slate-100 items-center justify-center"
                  >
                    <Ionicons name="close" size={24} color="#0f172a" />
                  </TouchableOpacity>
                </View>

                {/* ======================================================
                    TEACHER FORM
                ====================================================== */}

                {role === "TEACHER" && !generatedId && (
                  <View className="gap-5">
                    {/* Department */}

                    <View>
                      <Text className="text-sm font-bold text-slate-500 mb-2 ml-1">
                        Department
                      </Text>

                      <TextInput
                        placeholder="Department"
                        value={department}
                        onChangeText={setDepartment}
                        placeholderTextColor="#94a3b8"
                        className="bg-white p-5 rounded-3xl border border-border text-foreground text-base"
                      />
                    </View>

                    {/* Section */}

                    <View>
                      <Text className="text-sm font-bold text-slate-500 mb-2 ml-1">
                        Section
                      </Text>

                      <TextInput
                        placeholder="Section"
                        value={section}
                        onChangeText={setSection}
                        placeholderTextColor="#94a3b8"
                        className="bg-white p-5 rounded-3xl border border-border text-foreground text-base"
                      />
                    </View>

                    {/* Subject Name */}

                    <View>
                      <Text className="text-sm font-bold text-slate-500 mb-2 ml-1">
                        Subject Name
                      </Text>

                      <TextInput
                        placeholder="Subject Name"
                        value={subjectName}
                        onChangeText={setSubjectName}
                        placeholderTextColor="#94a3b8"
                        className="bg-white p-5 rounded-3xl border border-border text-foreground text-base"
                      />
                    </View>

                    {/* Subject Code */}

                    <View>
                      <Text className="text-sm font-bold text-slate-500 mb-2 ml-1">
                        Subject Code
                      </Text>

                      <TextInput
                        placeholder="Subject Code"
                        value={subjectCode}
                        onChangeText={setSubjectCode}
                        placeholderTextColor="#94a3b8"
                        className="bg-white p-5 rounded-3xl border border-border text-foreground text-base"
                      />
                    </View>

                    <TouchableOpacity
                      disabled={!isCreateValid}
                      onPress={handleCreate}
                      className={`p-5 rounded-3xl items-center ${
                        isCreateValid ? "bg-primary" : "bg-slate-300"
                      }`}
                    >
                      <Text className="text-white font-black text-lg">
                        Create Class
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* ======================================================
                    AFTER CREATE
                ====================================================== */}

                {role === "TEACHER" && generatedId && (
                  <View className="items-center mt-8">
                    <View className="bg-white px-8 py-6 rounded-[32px] border border-border w-full items-center">
                      <Text className="text-sm text-slate-500 font-bold mb-2">
                        CLASS ID
                      </Text>

                      <Text className="text-4xl font-black tracking-[6px] text-primary">
                        {generatedId}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={handleShare}
                      className="mt-6 bg-primary w-full p-5 rounded-3xl items-center"
                    >
                      <Text className="text-white font-black text-lg">
                        Share ID
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* ======================================================
                    STUDENT FORM
                ====================================================== */}

                {role === "STUDENT" && (
                  <View className="gap-5 pb-10 ">
                    <TextInput
                      placeholder="Enter Class ID"
                      value={classId}
                      onChangeText={(text) => setClassId(text)}
                      className="bg-white p-5 rounded-3xl border border-border text-lg"
                    />

                    <TouchableOpacity
                      disabled={!isEnrollValid || isEnrolling}
                      onPress={handleEnroll}
                      className={`p-5 rounded-3xl items-center ${
                        !isEnrollValid || isEnrolling
                          ? "bg-slate-300"
                          : "bg-primary"
                      }`}
                    >
                      <Text className="text-white font-black text-lg">
                        {isEnrolling ? "Joining..." : "Join Class"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* ======================================================
          FLOATING BUTTON
      ====================================================== */}

      <TouchableOpacity
        onPress={() => {
          setMenuVisible(!menuVisible);
          if (role === "STUDENT") {
            setClassId("");
          }
        }}
        activeOpacity={0.9}
        className={`absolute bottom-8 right-8 w-16 h-16 rounded-3xl items-center justify-center shadow-2xl shadow-primary/40 ${
          menuVisible ? "bg-slate-900" : "bg-primary"
        }`}
      >
        <Ionicons
          name={menuVisible ? "close" : "add"}
          size={36}
          color="white"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
