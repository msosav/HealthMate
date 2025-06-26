import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import ExamInfoModal from "./ExamInfoModal";

type ExamCardProps = {
  squareColor?: string;
  info: {
    [key: string]: any;
  };
};

const ExamCard: React.FC<ExamCardProps> = ({
  squareColor = "bg-blue-100",
  info,
}: ExamCardProps) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <TouchableOpacity
        className={`h-30 rounded-xl m-2 ${squareColor}`}
        onPress={() => setModalVisible(true)}
      >
        <View className="items-start p-5">
          <Text className="text-base text-primary font-bold">{info.name}</Text>
          <Text className="text-base text-primary">{info.formattedDate}</Text>
        </View>
      </TouchableOpacity>
      <ExamInfoModal
        visible={modalVisible}
        info={info}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default ExamCard;
