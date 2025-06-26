import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";

type AppointmentCardProps = {
  squareColor?: string;
  info: {
    [key: string]: any;
  };
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  squareColor = "bg-blue-100",
  info,
}: AppointmentCardProps) => (
  <TouchableOpacity className={`rounded-xl justify-center m-2 ${squareColor}`}>
    <View className="items-start p-7">
      <Text className="text-base text-primary font-bold">{info.name}</Text>
      <Text className="text-base text-primary">
        {info.time} - {info.location}
      </Text>

      {info.comments && (
        <>
          <Text className="text-base text-primary underline">Notes:</Text>
          <Text className="text-base text-primary pl-4">{info.comments}</Text>
        </>
      )}
    </View>
  </TouchableOpacity>
);

export default AppointmentCard;
