import * as React from "react";
import { Text, View, Modal, Pressable } from "react-native";
import { BlurView } from "expo-blur";

type ExamInfoModalProps = {
  visible: boolean;
  info: {
    [key: string]: any;
  };
  onClose: () => void;
};

const ExamInfoModal: React.FC<ExamInfoModalProps> = ({
  visible,
  info,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1">
        <BlurView intensity={20} tint="prominent" className="flex-1">
          <View className="flex-1 items-center justify-center">
            <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-2xl text-primary font-bold">
                  {info.name}
                </Text>
                <Pressable
                  onPress={() => {
                    onClose();
                  }}
                  hitSlop={10}
                  className="ml-2"
                >
                  <Text className="text-2xl text-primary font-bold">×</Text>
                </Pressable>
              </View>
              <View>
                <Text className="text-xl">{info.date}</Text>
              </View>
              <View>
                <Text>File goes here</Text>
              </View>
              <View>
                <Text className="text-xl mt-4 underline">AI summary</Text>
                <Text className="text-muted italic">
                  AI responses are not always accurate.
                </Text>
                <Text className="mt-4 pl-4">
                  {info.ai_summary || "No AI summary available."}
                </Text>
              </View>
            </View>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

export default ExamInfoModal;
