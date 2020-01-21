import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';

const list  = [];
for(let i = 0; i < 100; i++) {
  list.push(i);
}

export default class ExampleApp extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={{
          height: 200,
          backgroundColor: 'rgba(0, 0, 0, .4)'
        }}>
        </View>
        <ScrollView style={{
          flex: 1
        }}>
          {
            list.map(item => {
              return (
                <Text key={item}>{item}</Text>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});