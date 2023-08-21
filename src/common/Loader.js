import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator
        style={styles.indicatorStyle}
        size={30}
        color={COLORS.PRIMARY}
        animating={true}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  indicatorStyle: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.DISABLED_F2,
    elevation: 3,
  },
});
