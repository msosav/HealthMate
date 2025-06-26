import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import NewAppointmentModal from "@/app/components/Appointments/NewAppointmentModal";

type QuickAccessCardProps = {
  squareColor?: string;
  circleColor?: string;
  iconName: keyof typeof FontAwesome5.glyphMap;
  iconColor?: string;
  info: {
    [key: string]: any;
  };
};

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  squareColor = "bg-blue-100",
  circleColor = "bg-blue-500",
  iconName,
  iconColor = "#fff",
  info,
}: QuickAccessCardProps) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <TouchableOpacity
        className={`w-60 h-60 rounded-xl items-center justify-center m-2 ${squareColor}`}
        onPress={() => setModalVisible(true)}
      >
        <View className="items-center">
          <View
            className={`w-24 h-24 rounded-full items-center justify-center mb-2 ${circleColor}`}
          >
            <FontAwesome5 name={iconName} size={30} color={iconColor} />
          </View>
          <Text className="text-base text-white text-center">{info.label}</Text>
        </View>
      </TouchableOpacity>
      {info.type === "appointment" && (
        <NewAppointmentModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </>
  );
};

export default QuickAccessCard;
