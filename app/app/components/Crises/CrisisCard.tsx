import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";

type CrisisCardProps = {
  squareColor?: string;
  info: {
    [key: string]: any;
  };
};

const CrisisCard: React.FC<CrisisCardProps> = ({
  squareColor = "bg-blue-100",
  info,
}: CrisisCardProps) => (
  <TouchableOpacity
    className={`h-60 rounded-xl items-center justify-center m-2 ${squareColor}`}
  >
    <View className="items-start p-8">
      <Text className="text-base text-primary font-bold">{info.name}</Text>
      <Text className="text-base text-primary">
        {info.startDate} - {info.endDate}
      </Text>
      <Text className="text-base text-primary underline">Notes:</Text>
      <Text className="text-base text-primary pl-4">{info.comments}</Text>
    </View>
  </TouchableOpacity>
);

export default CrisisCard;
