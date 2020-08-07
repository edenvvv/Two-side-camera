import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { Camera as Camera1 } from "expo-camera";
import { Camera as Camera2 } from "expo-camera";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type1, setType1] = useState(Camera1.Constants.Type.back);
  const [type2, setType2] = useState(Camera2.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera1.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera1 style={{ flex: 0.5 }} type={type1}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
            }}
            onPress={() => {
              setType1(
                type1 === Camera1.Constants.Type.back
                  ? Camera1.Constants.Type.front
                  : Camera1.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Camera1>

      <Camera2
        style={{ flex: 0.5 }}
        type={type2}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
            }}
            onPress={() => {
              setType2(
                type2 === Camera2.Constants.Type.back
                  ? Camera2.Constants.Type.front
                  : Camera2.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={
              (sharePost = () => {
                Share.share(
                  {
                    message: `Hey look at this screenshot`,
                    url: Expo.takeSnapshotAsync(),
                    title: `Screen Shot`,
                  },
                  {
                    dialogTitle: "Share your screenshot",
                  }
                );
              })
            }
          >
            <SafeAreaView
              style={{
                borderWidth: 2,
                borderRadius: "50%",
                borderColor: "white",
                height: 50,
                width: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SafeAreaView
                style={{
                  borderWidth: 2,
                  borderRadius: "50%",
                  borderColor: "white",
                  height: 40,
                  width: 40,
                  backgroundColor: "white",
                }}
              ></SafeAreaView>
            </SafeAreaView>
          </TouchableOpacity>
        </SafeAreaView>
      </Camera2>
    </SafeAreaView>
  );
}
