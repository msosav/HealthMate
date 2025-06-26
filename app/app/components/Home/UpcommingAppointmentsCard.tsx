import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";

type UpcommingAppointmentsCardProps = {
  squareColor?: string;
  name: string;
  date: string;
  time: string;
  location: string;
};

const UpcommingAppointmentsCard: React.FC<UpcommingAppointmentsCardProps> = ({
  squareColor = "bg-blue-100",
  name,
  date,
  time,
  location,
}: UpcommingAppointmentsCardProps) => (
  <TouchableOpacity
    className={`w-60 h-60 rounded-xl items-center justify-center m-2 ${squareColor}`}
  >
    <View className="items-center">
      <Text className="text-base text-primary font-bold">{name}</Text>
      <Text className="text-base text-primary">{date}</Text>
      <Text className="text-base text-primary">{time}</Text>
      <Text className="text-base text-primary">{location}</Text>
    </View>
  </TouchableOpacity>
);

export default UpcommingAppointmentsCard;
