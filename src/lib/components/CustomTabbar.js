import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { MaterialTopTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { height, width } from '../utils';
import TabIcon from './TabIcon';
import { retrieveData } from './Helper';

var styles = StyleSheet.create({
  tabItem: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#e5e5e5',
    borderTopWidth: 0.8
  },
  tabOthers: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab4column: {
    width: '25%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#e5e5e5',
    borderTopWidth: 0.8

  },
  tab4columnOthers: {
    width: '25%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

let role = 0

const renderItem = () => {
  {
    this.props.roleId == 1 || this.props.roleId == 4 ?
      this.props.navigation.state.routes.map((element, i) => {
        return (
          <TouchableOpacity style={{ padding: 10 }} key={element.key} style={styles.tabItem} onPress={() => this.onPress(element.key, i)}>
            <TabIcon iconName={element.key} focused={this.props.tabIndex == i} />
          </TouchableOpacity>
        );
      })
      : null
  }
}

class CustomTabbar extends MaterialTopTabBar {
  constructor(props) {
    super(props);
    this.state = {
      role: 0
    }
  }

  async componentDidMount() {
    const roleId = await retrieveData('roleId')
    const plantId = await retrieveData('plantId')
    const plantName = await retrieveData('plantName')
    this.props.dispatch({ type: 'RoleId', roleId: roleId })
    this.props.dispatch({ type: 'PlantId', plantId: plantId })
    this.props.dispatch({ type: 'PlantName', plantName: plantName })
  }

  renderItem = async () => {
    const roleId = await this.props.roleId

    if (roleId == 1) {
      this.props.navigation.state.routes.map((element, i) => {
        return (
          <TouchableOpacity style={{ padding: 10 }} key={element.key} style={styles.tabItem} onPress={() => this.onPress(element.key, i)}>
            <TabIcon iconName={element.key} focused={this.props.tabIndex == i} />
          </TouchableOpacity>
        );
      })
    }
  }

  render() {
    return (
      <ImageBackground style={{ width, height: this.props.roleId == 5 ? 0.5 : height * 0.1 , flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
        {
          this.props.roleId == 1 || this.props.roleId == 4 ?
            this.props.navigation.state.routes.map((element, i) => {
              if (this.props.openOthers && element.key !== 'others') {
                return (
                  <View style={{ padding: 10 }} key={element.key} style={styles.tabItem}>
                    <TabIcon iconName={element.key} focused={this.props.tabIndex == i} />
                  </View>
                );
              } else {
                return (
                  <TouchableOpacity style={{ padding: 10 }} key={element.key} style={this.props.openOthers ? styles.tabOthers : styles.tabItem} onPress={() => this.onPress(element.key, i)}>
                    <TabIcon iconName={element.key} focused={this.props.tabIndex == i} />
                  </TouchableOpacity>
                );
              }
            })
            : null
        }
        {
          this.props.roleId == 2 &&
          this.props.navigation.state.routes.map((element, i) => {
            if (element.key !== 'efficiency') {
              if (this.props.openOthers && element.key !== 'others') {
                return (
                  <View style={{ padding: 10 }} key={element.key} style={styles.tab4column}>
                    <TabIcon iconName={element.key} focused={this.props.tabIndex == i} />
                  </View>
                );
              } else {
                return (
                  <TouchableOpacity style={{ padding: 10 }} key={element.key} style={this.props.openOthers ? styles.tab4columnOthers : styles.tab4column} onPress={() => this.onPress(element.key, i)}>
                    <TabIcon iconName={element.key} focused={this.props.tabIndex == i} />
                  </TouchableOpacity>
                );
              }
            }
          })
        }
        {
          this.props.roleId == 3 &&
          this.props.navigation.state.routes.map((element, i) => {
            if (element.key !== 'reliability') {
              if (this.props.openOthers && element.key !== 'others') {
                return (
                  <View style={{ padding: 10 }} key={element.key} style={styles.tab4column}>
                    <TabIcon iconName={element.key} focused={this.props.tabIndex == i} />
                  </View>
                );  
              } else {
                return (
                  <TouchableOpacity style={{ padding: 10 }} key={element.key} style={this.props.openOthers ? styles.tab4columnOthers : styles.tab4column} onPress={() => this.onPress(element.key, i)}>
                    <TabIcon iconName={element.key} focused={this.props.tabIndex == i} />
                  </TouchableOpacity>
                );  
              }
            }
          })
        }
        {
          this.props.roleId == 5 &&
          null
        }
      </ImageBackground>
    )
  }

  onPress(key, index) {
    if (key == 'others') {
      if (this.props.openOthers) {
        this.props.dispatch({ type: 'tab-others', openOthers: false })
        this.props.dispatch({ type: 'TAB-INDEX', tabIndex: 0 })
        Actions.dashboard()
      } else {
        this.props.dispatch({ type: 'tab-others', openOthers: true })
        this.props.dispatch({ type: 'TAB-INDEX', tabIndex: index })
        Actions[key].call()
      }
    } else {
      this.props.dispatch({ type: 'TAB-INDEX', tabIndex: index })
      Actions[key].call()
    }
  }
}

function mapStateToProps(state) {
  return {
    // loaded: state.items.loaded,
    tabIndex: state.items.tabIndex,
    roleId: state.items.roleId,
    openOthers: state.items.openOthers,
  };
}

export default connect(mapStateToProps)(CustomTabbar)

