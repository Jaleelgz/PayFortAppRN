import 'react-native-gesture-handler';
import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Provider as StoreProvider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import {store} from './src/store/store';
import {theme} from './src/constants/theme';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ToastConfig} from './src/constants/toastConfig';
import {ErrorHandler} from './src/common/ErrorBoundary';
import Main from './src/Main';
import {COLORS} from './src/constants/colors';

const App = () => {
  return (
    <View style={{height: '100%', width: '100%', flex: 1}}>
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StatusBar style="auto" backgroundColor={COLORS.DISABLED_F2} />

            <ErrorHandler>
              <Main />

              <Toast
                visibilityTime={4000}
                config={ToastConfig}
                position="bottom"
              />
            </ErrorHandler>
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
