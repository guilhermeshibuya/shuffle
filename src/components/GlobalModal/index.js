import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, Text, View } from "react-native";
import { BottomModal, ModalContent } from "react-native-modals";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function GlobalModal({
  currentSong,
  isModalVisible,
  setIsModalVisible,
  playPreviousSong,
  handlePlayPause,
  playNextSong,
  formatTime,
  currentTime,
  totalDuration,
  progress,
}) {
  return (
    <BottomModal
      visible={isModalVisible}
      onHardwareBackPress={() => setIsModalVisible(false)}
      swipeDirection={["up", "down"]}
      swipeThreshold={100}
    >
      <LinearGradient colors={[colors.c10, colors.c11]}>
        <ModalContent style={{ height: "100%", width: "100%" }}>
          <View
            style={{
              height: "100%",
              width: "100%",
              alignContent: "center",
            }}
          >
            <Pressable
              style={{ marginBottom: 32 }}
              onPress={() => setIsModalVisible(false)}
            >
              <MaterialIcons
                name="keyboard-arrow-down"
                color={colors.c2}
                size={36}
              />
            </Pressable>
            <View style={{ elevation: 10 }}>
              {currentSong?.albumCoverImgUrl ? (
                <Image
                  source={{ uri: currentSong?.albumCoverImgUrl }}
                  style={{
                    width: "100%",
                    height: Dimensions.get("window").width - 48,
                    borderRadius: Dimensions.get("window").width / 2,
                    marginBottom: 40,
                  }}
                />
              ) : (
                <View
                  style={{
                    backgroundColor: colors.c1,
                    width: "100%",
                    height: Dimensions.get("window").width - 48,
                    borderRadius: Dimensions.get("window").width / 2,
                    marginBottom: 40,
                  }}
                />
              )}
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: "auto",
                marginBottom: 32,
              }}
            >
              <Pressable>
                <MaterialIcons name="more-vert" color={colors.c2} size={36} />
              </Pressable>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    color: colors.c1,
                    fontSize: 20,
                    fontFamily: "NotoSans_600SemiBold",
                  }}
                >
                  {truncateText(currentSong?.name, 20)}
                </Text>
                <Text
                  style={{
                    color: colors.c5,
                    fontSize: 16,
                    fontFamily: "NotoSans_400Regular",
                  }}
                >
                  {Array.isArray(currentSong?.artists)
                    ? currentSong?.artists.join(", ")
                    : currentSong?.artists}
                </Text>
              </View>
              <Pressable>
                <MaterialIcons name="favorite" color={colors.p2} size={36} />
              </Pressable>
            </View>
            <View style={styles.progressBarBack}>
              <View
                style={[styles.progressBar, { width: `${progress * 100}%` }]}
              />
              <View
                style={{
                  position: "absolute",
                  top: -4,
                  width: 11,
                  height: 11,
                  borderRadius: 11 / 2,
                  backgroundColor: colors.c1,
                  left: `${progress * 100}%`,
                  marginLeft: -11 / 2,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Text style={{ color: colors.c5, fontSize: 12 }}>
                {formatTime(currentTime)}
              </Text>
              <Text style={{ color: colors.c5, fontSize: 12 }}>
                {formatTime(totalDuration)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Pressable>
                <MaterialIcons name="shuffle" color={colors.c2} size={24} />
              </Pressable>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 24,
                }}
              >
                <Pressable onPress={playPreviousSong}>
                  <MaterialIcons
                    name="skip-previous"
                    color={colors.c1}
                    size={48}
                  />
                </Pressable>
                <Pressable onPress={handlePlayPause}>
                  {isPlaying ? (
                    <MaterialIcons name="pause" color={colors.c1} size={64} />
                  ) : (
                    <MaterialIcons
                      name="play-arrow"
                      color={colors.c1}
                      size={64}
                    />
                  )}
                </Pressable>
                <Pressable onPress={playNextSong}>
                  <MaterialIcons name="skip-next" color={colors.c1} size={48} />
                </Pressable>
              </View>
              <Pressable>
                <MaterialIcons name="repeat" color={colors.c2} size={24} />
              </Pressable>
            </View>
          </View>
        </ModalContent>
      </LinearGradient>
    </BottomModal>
  );
}
