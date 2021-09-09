import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import AssetHealth from '../../Screen/AssetHealth'
import ReliabilityAnalysis from '../../Screen/ReliabilityAnalysis'

const FirstRoute = () => (
  // <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
  <AssetHealth data={this.props} />
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  // });

  const renderScene = ({ route, props }) => {
    switch (route.key) {
      case 'first':
        return <AssetHealth data={props} />;
      case 'second':
        return <ReliabilityAnalysis data={2} />;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});