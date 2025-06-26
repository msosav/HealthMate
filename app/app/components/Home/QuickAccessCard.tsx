import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

type QuickAccessCardProps = {
  squareColor?: string; // Tailwind color class, e.g. 'bg-blue-100'
  circleColor?: string; // Tailwind color class, e.g. 'bg-blue-500'
  iconName: keyof typeof FontAwesome5.glyphMap;
  iconColor?: string;
  label: string;
};

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  squareColor = "bg-blue-100",
  circleColor = "bg-blue-500",
  iconName,
  iconColor = "#fff",
  label,
}: QuickAccessCardProps) => (
  <TouchableOpacity
    className={`w-60 h-60 rounded-xl items-center justify-center m-2 ${squareColor}`}
  >
    <View className="items-center">
      <View
        className={`w-24 h-24 rounded-full items-center justify-center mb-2 ${circleColor}`}
      >
        <FontAwesome5 name={iconName} size={30} color={iconColor} />
      </View>
      <Text className="text-base text-white text-center">{label}</Text>
    </View>
  </TouchableOpacity>
);

export default QuickAccessCard;
