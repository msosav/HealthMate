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

export default function CrisesScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
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
      />
      <ScrollView className="p-8 bg-white">
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
        <View>
          <Text className="text-2xl text-primary mb-2">June 2025</Text>
          <CrisisCard
            info={{
              name: "Cold",
              comments:
                "I went outside when I was raining and forgot to wear an umbrella",
              startDate: "Monday, June 9",
              endDate: "Friday, June 13",
            }}
          ></CrisisCard>
          <CrisisCard
            info={{
              name: "Cold",
              comments:
                "I went outside when I was raining and forgot to wear an umbrella",
              startDate: "Monday, June 9",
              endDate: "Friday, June 13",
            }}
          ></CrisisCard>
        </View>
        <View>
          <Text className="text-2xl text-primary mb-2">May 2025</Text>
          <CrisisCard
            info={{
              name: "Cold",
              comments:
                "I went outside when I was raining and forgot to wear an umbrella",
              startDate: "Monday, May 9",
              endDate: "Friday, May 13",
            }}
          ></CrisisCard>
          <CrisisCard
            info={{
              name: "Cold",
              comments:
                "I went outside when I was raining and forgot to wear an umbrella",
              startDate: "Monday, May 9",
              endDate: "Friday, May 13",
            }}
          ></CrisisCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
