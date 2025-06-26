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
import ExamsService from "@/app/services/exams";
import ExamInfoModal from "@/app/components/Exams/ExamInfoModal";

export default function ExamsScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [exams, setExams] = React.useState<any[]>([]);
  const [selectedExam, setSelectedExam] = React.useState<any>(null);
  const [infoModalVisible, setInfoModalVisible] = React.useState(false);

  React.useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await ExamsService.list();
        setExams(res.data);
      } catch (e) {
        console.error("Failed to fetch exams", e);
      }
    };
    fetchExams();
  }, [modalVisible]);

  // Group exams by month and year
  type GroupedExams = { [key: string]: any[] };
  const groupedExams: GroupedExams = exams.reduce(
    (acc: GroupedExams, exam: any) => {
      const date = new Date(exam.date);
      const monthYear = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[monthYear]) acc[monthYear] = [];
      acc[monthYear].push(exam);
      return acc;
    },
    {}
  );

  // Sort monthYear keys by date descending
  const sortedMonthYears = Object.keys(groupedExams).sort((a, b) => {
    const aDate = new Date(groupedExams[a][0].date);
    const bDate = new Date(groupedExams[b][0].date);
    return bDate.getTime() - aDate.getTime();
  });

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
      <ExamInfoModal
        visible={infoModalVisible}
        info={selectedExam || {}}
        onClose={() => setInfoModalVisible(false)}
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
        {sortedMonthYears.map((monthYear) => (
          <View key={monthYear}>
            <Text className="text-2xl text-primary mb-2">{monthYear}</Text>
            {groupedExams[monthYear].map((exam) => (
              <Pressable
                key={exam.id}
                onPress={() => {
                  setSelectedExam(exam);
                  setInfoModalVisible(true);
                }}
              >
                <ExamCard info={exam} />
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
