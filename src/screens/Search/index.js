import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  FlatList,
  Image,
  TextInput,
  View,
  Text,
  Pressable,
} from "react-native";
import styles from "./styles";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const navigation = useNavigation();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  let timeoutId;

  const handleInputChange = (text) => {
    setSearchInput(text);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      search();
    }, 800);
  };

  const search = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("token");

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=album,artist,track&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const tracks = data.tracks.items;
        const artists = data.artists.items;
        const albums = data.albums.items;

        const results = [...tracks, ...artists, ...albums];
        setSearchResults(results);
        console.log(results);
      } else {
        console.log("Erro na resposta da API");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderResults = useCallback(({ item }) => {
    return searchInput === "" ? (
      <View></View>
    ) : (
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}
        onPress={() =>
          navigation.navigate("Info", {
            item: {
              id: item?.id,
              name: item?.name,
              artists:
                item?.type === "artist" ? item.name : item?.artists[0]?.name,
              albumCoverImgUrl:
                item?.type === "track"
                  ? item?.album?.images[1]?.url
                  : item?.images[1]?.url,
              albumUrl: item?.uri,
            },
          })
        }
      >
        <View>
          <Image
            style={[
              item?.type === "artist"
                ? { borderRadius: 32 }
                : { borderRadius: 8 },
              {
                width: 64,
                height: 64,
              },
            ]}
            source={{
              uri:
                item?.type === "track"
                  ? item?.album?.images[2]?.url
                  : item?.images[2]?.url,
            }}
          />
        </View>
        <View>
          <Text style={styles.musicName}>{item?.name}</Text>
          <Text style={styles.artist}>
            {item?.type === "track"
              ? "Música - " + item?.artists[0]?.name
              : item?.type === "album"
              ? "Album - " + item?.artists[0]?.name
              : ""}
          </Text>
        </View>
      </Pressable>
    );
  });

  return (
    <LinearGradient
      colors={["#222222", "#111111"]}
      locations={[0.22, 1]}
      style={[styles.container, { paddingBottom: 100 }]}
    >
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            gap: 12,
          },
          styles.input,
          isFocused ? styles.inputFocused : null,
        ]}
      >
        <MaterialIcons name="search" size={32} color={colors.c2} />
        <TextInput
          style={{ color: colors.c2 }}
          placeholder="Explore melodias encantadoras"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleInputChange}
          placeholderTextColor={colors.c5}
          value={searchInput}
        ></TextInput>
      </View>
      <View>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={renderResults}
        ></FlatList>
      </View>
    </LinearGradient>
  );
}
