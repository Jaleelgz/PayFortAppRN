import * as React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

const myErrorHandler = error => {
  if (__DEV__) {
    console.log('error in handler :', error);
  }
};

const ErrorFallback = ({resetErrorBoundary}) => {
  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>
        <Text style={{fontWeight: 'bold'}}>Oops!</Text> Something went Wrong.
      </Text>
      <Text>Please try again.</Text>
      <View style={{paddingTop: 30}}>
        <TouchableOpacity
          style={{
            height: 40,
            flexDirection: 'row',
            width: 110,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: COLORS.PRIMARY,
          }}
          onPress={resetErrorBoundary}>
          <Ionicons name="reload" size={20} color="white" />
          <Text style={{color: 'white', paddingLeft: 5}}>Try again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const ErrorHandler = props => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {props.children}
  </ErrorBoundary>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 12,
  },
});
