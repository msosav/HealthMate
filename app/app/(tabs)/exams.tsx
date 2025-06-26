import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React = require("react");
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import ExamCard from "@/app/components/Exams/ExamCard";
import NewExamModal from "@/app/components/Exams/NewExamModal";

export default function ExamsScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <NewExamModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <ScrollView
        className="p-8 bg-white"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-4xl text-primary font-bold">My exams</Text>
          <Pressable
            onPress={() => setModalVisible(true)}
            hitSlop={10}
            className="bg-primary text-white w-1/4 rounded-lg py-2 px-6 mt-2"
          >
            <Text className="text-white font-bold text-center">
              <FontAwesome5 name="plus" size={24} color="white" />
            </Text>
          </Pressable>
        </View>
        <View>
          <Text className="text-2xl text-primary mb-2">June 2025</Text>
          <ExamCard
            info={{
              name: "Complete Blood Count",
              ai_summary:
                "Your iron levels are low—consider dietary changes or supplements",
              date: "Monday, June 9",
            }}
          ></ExamCard>
          <ExamCard
            info={{
              name: "Complete Blood Count",
              ai_summary:
                "Your iron levels are low—consider dietary changes or supplements",
              date: "Monday, June 9",
            }}
          ></ExamCard>
        </View>
        <View>
          <Text className="text-2xl text-primary mb-2">May 2025</Text>
          <ExamCard
            info={{
              name: "Complete Blood Count",
              ai_summary:
                "Your iron levels are low—consider dietary changes or supplements",
              date: "Monday, June 9",
            }}
          ></ExamCard>
          <ExamCard
            info={{
              name: "Complete Blood Count",
              ai_summary:
                "Your iron levels are low—consider dietary changes or supplements",
              date: "Monday, June 9",
            }}
          ></ExamCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
