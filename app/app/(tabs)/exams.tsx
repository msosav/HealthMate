import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React = require("react");
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  SectionList,
  RefreshControl,
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
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchExams = async () => {
    try {
      const res = await ExamsService.list();
      setExams(res.data);
    } catch (e) {
      console.error("Failed to fetch exams", e);
    }
  };

  React.useEffect(() => {
    fetchExams();
  }, [modalVisible]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchExams();
    setRefreshing(false);
  };

  // Group exams by month and year for SectionList
  type GroupedExams = { title: string; data: any[] }[];
  const groupedExams: GroupedExams = React.useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    exams.forEach((exam: any) => {
      const date = new Date(exam.date);
      const monthYear = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(exam);
    });
    // Sort monthYear keys by date descending
    const sortedMonthYears = Object.keys(groups).sort((a, b) => {
      const aDate = new Date(groups[a][0].date);
      const bDate = new Date(groups[b][0].date);
      return bDate.getTime() - aDate.getTime();
    });
    return sortedMonthYears.map((monthYear) => ({
      title: monthYear,
      data: groups[monthYear],
    }));
  }, [exams]);

  const renderSectionHeader = ({ section }: any) => (
    <Text className="text-2xl text-primary mb-2" style={{ marginTop: 16 }}>
      {section.title}
    </Text>
  );

  const renderItem = ({ item }: any) => {
    const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    return (
      <Pressable
        key={item.id}
        onPress={() => {
          setSelectedExam(item);
          setInfoModalVisible(true);
        }}
      >
        <ExamCard info={{ ...item, formattedDate }} />
      </Pressable>
    );
  };

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
      <View className="p-8 bg-white" style={{ flex: 1 }}>
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
        <SectionList
          sections={groupedExams}
          keyExtractor={(item) => item.id.toString()}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={<Text>No exams found.</Text>}
        />
      </View>
    </SafeAreaView>
  );
}
