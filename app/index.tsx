import { useState } from "react";
import { Text, View, Modal, Button, Image, TouchableOpacity } from "react-native";
import Game from '../section/Game'
import { styles } from "@/style/styles";

export default function Index() {
  
  const [isModalVisible, SetIsModalVisible] = useState(true)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
      }}
    >
      {!isModalVisible && <Game />}
      <Modal visible={isModalVisible}>
        <View style={{ display: 'flex', flex: 1, backgroundColor: 'rgba(50, 46, 48, 0.8)', justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{ width: 300, height: 340, borderRadius: 20}} source={require('../assets/images/hero.jpg')}></Image>
          <TouchableOpacity style={styles.btn_go} onPress={() => SetIsModalVisible(false)}>
            <Text style={{ color: 'white'}}>Chơi ngay</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
