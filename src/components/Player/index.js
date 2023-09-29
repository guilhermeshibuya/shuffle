import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../styles";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "635cb84ecc27482ea1d559e98461c89f",
  clientSecret: "151f0c4dee504fdb9ff71c2eb2b10c80",
  redirectUri: "https://localhost:3000",
});

function generateRandomString(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

async function generateCodeChallenge(codeVerifier) {
  function base64encode(string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

export default function Player({ index }) {
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    spotifyApi.play().then();
  }, [index]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.c11 }}>
      <TouchableOpacity
        onPress={() => {
          spotifyApi.pause().then(function () {
            setPlaying(false);
            console.log("Música pausada");
          });
        }}
        style={{
          display: playing ? "flex" : "none",
        }}
      >
        <MaterialIcons name="pause" size={64} color={colors.c1} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          spotifyApi.play().then(function () {
            setPlaying(true);
            console.log("Música tocando");
          });
        }}
        style={{
          display: playing ? "none" : "flex",
        }}
      >
        <MaterialIcons name="play-arrow" size={64} color={colors.c1} />
      </TouchableOpacity>
    </View>
  );
}
