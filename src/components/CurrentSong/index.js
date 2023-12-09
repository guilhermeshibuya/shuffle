import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Player } from "../../../PlayerContext";
import { colors } from "../../styles";

export default function CurrentSong() {
  const { currentSong } = useContext(Player);

  const truncateText = (text, maxChars) => {
    if (text?.length > maxChars) {
      return text.substring(0, maxChars) + "...";
    }
    return text;
  };

  return (
    currentSong && (
      <Pressable
        style={{
          width: "90%",
          borderRadius: 16,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 16,
          position: "absolute",
          left: 20,
          bottom: 100,
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            padding: 12,
            borderRadius: 16,
          }}
          colors={[colors.p2, colors.p3, "#482ABF"]}
          locations={[0.2, 0.4, 1]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Image
              style={{ width: 48, height: 48, borderRadius: 8 }}
              source={{ uri: currentSong?.albumCoverImgUrl }}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 12,
                color: colors.c1,
                fontFamily: "NotoSans_600SemiBold",
              }}
            >
              {truncateText(
                currentSong?.name + " · " + currentSong?.artists[0],
                30
              )}
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    )
  );
}
