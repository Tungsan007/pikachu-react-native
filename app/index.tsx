import { useState } from "react";
import { Text, View, Modal, Button, Image } from "react-native";
import Game from '../section/Game'

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
          <Image style={{ width: 90, height: 90}} source={require('../assets/images/hero.jpg')}></Image>
          <Button title="Chơi ngay" onPress={() => SetIsModalVisible(false)}/>
        </View>
      </Modal>
    </View>
  );
}
