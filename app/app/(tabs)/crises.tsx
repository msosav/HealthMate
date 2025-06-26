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
import CrisisCard from "@/app/components/Crises/CrisisCard";
import NewCrisisModal from "@/app/components/Crises/NewCrisisModal";
import CrisesService from "@/app/services/crises";

export default function CrisesScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [crises, setCrises] = React.useState<any[]>([]);

  const fetchCrises = async () => {
    try {
      const response = await CrisesService.list();
      setCrises(response.data);
    } catch (e) {
      setCrises([]);
    }
  };

  React.useEffect(() => {
    fetchCrises();
  }, []);

  // Group crises by month and year
  const groupedCrises = React.useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    crises.forEach((crisis) => {
      if (!crisis.start_date) return;
      const [year, month] = crisis.start_date.split("-");
      const key = `${new Date(Number(year), Number(month) - 1).toLocaleString(
        undefined,
        { month: "long" }
      )} ${year}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(crisis);
    });
    // Sort by year and month descending
    return Object.entries(groups)
      .sort((a, b) => {
        const [aMonth, aYear] = a[0].split(" ");
        const [bMonth, bYear] = b[0].split(" ");
        if (aYear !== bYear) return Number(bYear) - Number(aYear);
        return (
          new Date(`${bMonth} 1, 2000`).getMonth() -
          new Date(`${aMonth} 1, 2000`).getMonth()
        );
      })
      .map(([title, data]) => ({ title, data }));
  }, [crises]);

  // Helper to format date as 'Day, Month Date'
  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <NewCrisisModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreated={fetchCrises}
      />
      <ScrollView
        className="p-8 bg-white"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-4xl text-primary font-bold">My crises</Text>
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
        {groupedCrises.map((section) => (
          <View key={section.title}>
            <Text className="text-2xl text-primary mb-2">{section.title}</Text>
            {section.data.map((crisis, idx) => (
              <CrisisCard
                key={crisis.id || idx}
                info={{
                  name: crisis.name,
                  comments: crisis.comments,
                  startDate: formatDate(crisis.start_date),
                  endDate: formatDate(crisis.end_date),
                }}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
