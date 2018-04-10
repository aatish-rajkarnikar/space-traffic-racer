/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import {
  Body,
  Loop,
  Stage,
  World,
} from 'react-game-kit/native';
import PropTypes from 'prop-types';


export default class App extends Component {
  static contextTypes = {
    loop: PropTypes.object,
  };

  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  update() {
    // tick logic
  };
  
  handleUpdate = () => {

  }

  constructor(props) {
    super(props);

    this.state = {
      gravity: 1,
      ballPosition: {
        x: 0,
        y: 0,
      },
      ballAngle: 0,
    };
  }

  getBallStyles() {
    return {
      height: 75,
      width: 75,
      position: 'absolute',
      transform: [
        { translateX: this.state.ballPosition.x },
        { translateY: this.state.ballPosition.y },
        { rotate: (this.state.ballAngle * (180 / Math.PI)) + 'deg'}
      ],
    };
  }

  render() {
    const dimensions = Dimensions.get('window');
    return (
      <Loop>
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          style={{ backgroundColor: '#3a9bdc' }}
        >
          <World
            onInit={this.physicsInit}
            onUpdate={this.handleUpdate}
            gravity={{ x: 0, y: this.state.gravity, scale: 0.001 }}
          >
            <Body
              shape="circle"
              args={[0, dimensions.height - 75, 75]}
              density={0.003}
              friction={1}
              frictionStatic={0}
              restitution={0.5}
              ref={(b) => { this.body = b; }}
              >
                <View style={{
                  height: 75,
                  width: 75,
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  backgroundColor: 'red'
                }}>
                <Image
                  source={require('./plane/Fly (2).png')}
                  height={75}
                  width = {75}
                  style={{backgroundColor: 'blue',height: 75,
                  width: 75,}}
                />
              </View>
            </Body>
          </World>
        </Stage>
      </Loop>
    );
  }
}

const styles = StyleSheet.create({

});
