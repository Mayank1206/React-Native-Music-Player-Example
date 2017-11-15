import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { 
  Asset, 
  Audio,
  Constants, 
  Font } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';


export default class App extends Component {

  constructor(props){
    super(props);
    this.playbackInstance = null;
    this.state = {
      shouldPlay: false,
      isPlaying: false,
    };
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });

      this._loadNewPlaybackInstance(false);
  }

  async _loadNewPlaybackInstance(playing) {

      const { sound, status } = await Audio.Sound.create(
          require('./assets/sounds/hello.mp3'),
          { shouldPlay: false,
          volume: 1.0,
          rate: 1.0,          
          },
          this._onPlaybackStatusUpdate
        );

      this.playbackInstance = sound;
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
      });
    }
  };

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };


  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this._onPlayPausePressed}
        >
        <View>
          {this.state.isPlaying ? (
            <MaterialIcons
              name="pause"
              size={40}
              color="#56D5FA"
            />
          ) : (
            <MaterialIcons
              name="play-arrow"
              size={40}
              color="#56D5FA"
            />
          )}
        </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,

  },
  buttonAlert: {
    marginTop: 50,
  }
});
