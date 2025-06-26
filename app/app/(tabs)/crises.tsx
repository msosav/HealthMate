import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React = require("react");
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  SectionList,
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

  // Group crises by month and year for SectionList
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

  // Helper to format date as 'Friday, April 27' with capitalized weekday and month
  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    let formatted = d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    // Capitalize first letter of weekday and month
    formatted = formatted.replace(
      /^(\w)(\w+), (\w)(\w+)/,
      (m, a, b, c, d) => `${a.toUpperCase()}${b}, ${c.toUpperCase()}${d}`
    );
    return formatted;
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
      <View
        className="p-8 bg-white"
        style={{
          flex: 1,
          padding: 32,
          backgroundColor: "#fff",
          paddingBottom: 80,
        }}
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
        <SectionList
          sections={groupedCrises}
          keyExtractor={(item, idx) => item.id?.toString() || idx.toString()}
          renderSectionHeader={({ section: { title } }) => (
            <Text className="text-2xl text-primary mb-2">{title}</Text>
          )}
          renderItem={({ item }) => (
            <CrisisCard
              info={{
                name: item.name,
                comments: item.comments,
                startDate: formatDate(item.start_date),
                endDate: formatDate(item.end_date),
              }}
            />
          )}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
    </SafeAreaView>
  );
}
