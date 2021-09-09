import React, { Component } from 'react';
import { View, Text, Image, Platform } from 'react-native';

import MIIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default class TabIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var FONT = Platform.OS === 'ios' ? 2 : 0
    var color = this.props.focused ? '#0099BC' : '#999FA0';
    var color2 = this.props.focused ? 'red' : '#999FA0';
    var width = 20;
    var height = 20;
    var icon;
    
    if (this.props.iconName == 'dashboard') {
      // icon = <MIIcon name="dashboard" size={30} color={color} />
      icon = <Image source={require('../../Assets/images/icon/new/Dashboard.png')} style={{ width: width + 8, height, tintColor: color }} resizeMode="contain" tintColor={color} />
    } else if (this.props.iconName == 'reliability') {
      // icon = <MCIcon name="file-document-box" size={30} color={color} />
      icon = <Image source={require('../../Assets/images/icon/new/Reliability.png')} style={{ width: width + 8, height, tintColor: color }} resizeMode="contain" tintColor={color} />
    } else if (this.props.iconName == 'efficiency') {
      // icon = <MCIcon name="bell" size={30} color={color} />
      icon = <Image source={require('../../Assets/images/icon/new/mdi_access_time.png')} style={{ width: width + 8, height, tintColor: color }} resizeMode="contain" tintColor={color} />
    } else if (this.props.iconName == 'tuning') {
      // icon = <MCIcon name="account-circle" size={30} color={color} />
      icon = <Image source={require('../../Assets/images/icon/new/mdi_tune.png')} style={{ width: width + 8, height, tintColor: color }} resizeMode="contain" tintColor={color} />
    } else if (this.props.iconName == 'others') {
      // icon = <MCIcon name="account-circle" size={30} color={color} />
      icon =
        <Image
          source={!this.props.focused ? require('../../Assets/images/icon/new/more_horiz.png') : require('../../Assets/images/icon/new/close-circle.png')}
          style={{ width: width + 8, height, tintColor: color2 }} resizeMode="contain" tintColor={color}
        />
    }

    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
        <View style={{ paddingVertical: 5 }}>
          {icon}
        </View>
        <Text style={{ color: color, fontSize: RFValue(12) }}>{this.props.iconName == 'tuning' ? 'Auto Tuning' : this.props.iconName.charAt(0).toUpperCase() + this.props.iconName.slice(1)}</Text>
        {/* {
          this.props.focused ?
          <Text style={{color: color, fontSize: RFValue(12)}}>{this.props.iconName == 'tuning' ? 'Auto Tuning' : this.props.iconName}</Text>
          :
          <Text style={{color: color, fontSize: RFValue(12)}}>{this.props.iconName == 'tuning' ? 'Auto Tuning' : this.props.iconName}</Text>
        } */}
      </View>
    );
  }
}
