import React, { useState } from 'react';
import '../global.css';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const departments = [
  'Computer Science (CSE)',
  'Information Technology (IT)',
  'Electronics & Communication (ECE)',
  'Mechanical Engineering',
  'Civil Engineering',
  'Food Technology',
];

const roles = ['Student', 'Teacher'];

const SignUp = () => {
  const [department, setDepartment] = useState('Select Department');
  const [role, setRole] = useState('Select Role');

  const [deptModal, setDeptModal] = useState(false);
  const [roleModal, setRoleModal] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="items-center mt-6 mb-8">
          <View className="w-32 h-32 rounded-full bg-primary/15 items-center justify-center">
            <Text className="text-5xl">🏫</Text>
          </View>
          <Text className="mt-4 text-xl font-bold text-foreground">
            Create Your Account
          </Text>
          <Text className="text-mutedForeground text-sm mt-1 text-center">
            Join the smart attendance system
          </Text>
        </View>

        {/* Full Name */}
        <View className="bg-card border border-border rounded-2xl px-4 py-4 mb-4">
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#6b7280"
            className="text-foreground"
          />
        </View>

        {/* Roll Number */}
        <View className="bg-card border border-border rounded-2xl px-4 py-4 mb-4">
          <TextInput
            placeholder="University Roll Number"
            placeholderTextColor="#6b7280"
            className="text-foreground"
          />
        </View>

        {/* Section */}
        <View className="bg-card border border-border rounded-2xl px-4 py-4 mb-4">
          <TextInput
            placeholder="Section (A / B / C)"
            placeholderTextColor="#6b7280"
            className="text-foreground"
          />
        </View>

        {/* Department Dropdown */}
        <TouchableOpacity
          className="bg-card border border-border rounded-2xl px-4 py-4 mb-4"
          onPress={() => setDeptModal(true)}
          activeOpacity={0.8}
        >
          <Text className="text-foreground">{department}</Text>
        </TouchableOpacity>

        {/* Role Dropdown */}
        <TouchableOpacity
          className="bg-card border border-border rounded-2xl px-4 py-4 mb-4"
          onPress={() => setRoleModal(true)}
          activeOpacity={0.8}
        >
          <Text className="text-foreground">{role}</Text>
        </TouchableOpacity>

        {/* Password */}
        <View className="bg-card border border-border rounded-2xl px-4 py-4 mb-3">
          <TextInput
            placeholder="Create New Password"
            placeholderTextColor="#6b7280"
            secureTextEntry
            className="text-foreground"
          />
        </View>

        <Text className="text-mutedForeground text-xs mb-4">
          Password must be at least 8 characters long
        </Text>

        {/* Confirm Password */}
        <View className="bg-card border border-border rounded-2xl px-4 py-4 mb-8">
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#6b7280"
            secureTextEntry
            className="text-foreground"
          />
        </View>

        {/* Submit */}
        <TouchableOpacity className="bg-primary py-4 rounded-2xl items-center">
          <Text className="text-primaryForeground text-lg font-bold">
            Create Account
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="items-center mt-8">
          <Text className="text-mutedForeground">
            Already have an account?{' '}
            <Text className="text-primary font-semibold">Login</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Department Modal */}
      <Modal visible={deptModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-card rounded-t-3xl p-6">
            {departments.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="py-4 border-b border-border"
                onPress={() => {
                  setDepartment(item);
                  setDeptModal(false);
                }}
              >
                <Text className="text-foreground">{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Role Modal */}
      <Modal visible={roleModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-card rounded-t-3xl p-6">
            {roles.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="py-4 border-b border-border"
                onPress={() => {
                  setRole(item);
                  setRoleModal(false);
                }}
              >
                <Text className="text-foreground">{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignUp;
