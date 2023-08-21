// import {useEffect, useState} from 'react';
// import {ScrollView, Text, View} from 'react-native';
// import {
//   getDeviceId,
//   FortRequestObject,
//   StandardCheckout,
//   DirectPayButton,
//   FortRequestObjectDirectPay,
//   CustomCheckoutView,
// } from 'rn-amazon-payment-services';
// import {getSignature, postData} from './utils/restServices';
// import {} from "@env"
// // 
// // ...

// export default function App() {
//   const [deviceId, setDeviceId] = useState<string>('');
//   const [showCustomScreen, setShowCustomScreen] = useState(false);
//   const [showStandardCheckout, setShowStandardCheckout] =
//     useState<boolean>(false);

//   const [sdkToken, setSdkToken] = useState('');


//   console.log("Process :",process?.env)

//   const setupDeviceId = async () => {
//     const id: string = await getDeviceId();
//     setDeviceId(id);
//   };

//   const onSuccess = (response: any) => {
//     console.log('success ::::::::', response);
//     setShowCustomScreen(false);
//   };

//   const onFailure = (response: any) => {
//     console.log('failure :::::::::', response);
//     setShowCustomScreen(false);
//   };

//   const onCancel = (response: any) => {
//     console.log('cancel ::::::::', response);
//     setShowStandardCheckout(false);
//   };

//   const requestObjectDirectPay: FortRequestObjectDirectPay = {
//     command: 'AUTHORIZATION',
//     merchant_reference: JSON.stringify(new Date().getMilliseconds()),
//     amount: '100',
//     currency: 'AED',
//     language: 'en',
//     customer_email: 'sam@gmail.com',
//     sdk_token: sdkToken,
//     payment_option: 'VISA',
//     token_name: '6600ee4c1aae4905ade15c0cdb2d9244',
//     card_security_code: '123',
//   };

//   // request object example for standard and custom ui checkout
//   const requestObject: FortRequestObject = {
//     command: 'PURCHASE',
//     merchant_reference: "ORD-fgsdfgs3453fg34",
//     amount: '1000',
//     currency: 'AED',
//     language: 'en',
//     customer_email: 'sam234@gmail.com',
//     sdk_token: sdkToken,
//     payment_option: 'VISA',
//   };

//   const getSdkToken = async () => {
//     const device_id: string = await getDeviceId();

//     console.log('DeviceId :', deviceId);

//     const requestData = {
//       access_code: 'VPh7LduEdykKBlDWOvKv',
//       device_id: device_id,
//       language: 'en',
//       merchant_identifier: 'vqAuMkuO',
//       service_command: 'SDK_TOKEN',
//     };

//     const signature = await getSignature(requestData);

//     const token = await postData('', {...requestData, signature});

//     console.log('Token Res :', token?.sdk_token);

//     setSdkToken(token?.sdk_token ?? '');
//   };

//   useEffect(() => {
//     getSdkToken();
//   }, []);

//   //...

//   // Standard Checkout component
//   return (
//     <ScrollView>
//       <Text>Hello</Text>
//       <Text>Hello</Text>
//       <Text>Hello</Text>
//       <Text>Hello</Text>
//       <Text>Hello</Text>
//       <Text>Hello</Text>
//       <Text>Hello</Text>
//       <Text>Hello</Text>

//       {sdkToken && typeof sdkToken === 'string' && sdkToken?.trim() !== '' && (
//         <>
//           <Text>Jaleel</Text>
//           <View
//             style={{
//               height: '100%',
//               width: '100%',
//               minHeight: 5000,
//               backgroundColor: 'red',
//             }}>
//             <StandardCheckout
//               showStandardCheckoutPage={showStandardCheckout}
//               environment={'TEST'}
//               requestCode={new Date().getMilliseconds()}
//               showLoading={true}
//               showResponsePage={true}
//               requestObject={{...requestObject, sdk_token: sdkToken}}
//               onSuccess={onSuccess}
//               onFailure={onFailure}
//               onCancel={onCancel}
//             />

//             <CustomCheckoutView
//               requestObject={requestObject}
//               environment={'TEST'}
//               style={{width: 300, height: 400}}
//               payButtonProps={{
//                 marginLeft: 20,
//                 marginTop: 20,
//                 backgroundColor: '#026cff',
//                 text: 'Pay',
//                 textSize: 20,
//                 textColor: '#ffffff',
//                 buttonWidth: 40,
//                 buttonHeight: 40,
//                 borderRadius: 20,
//                 borderWidth: 1,
//                 borderColor: '#383333',
//               }}
//               onFailure={onFailure}
//               onSuccess={onSuccess}
//             />

//             <DirectPayButton
//               requestObject={requestObjectDirectPay}
//               environment={'TEST'}
//               style={{width: 200, height: 100}}
//               payButtonProps={{
//                 marginLeft: 20,
//                 marginTop: 20,
//                 backgroundColor: '#026cff',
//                 text: 'Pay',
//                 textSize: 20,
//                 textColor: '#ffffff',
//                 buttonWidth: 40,
//                 buttonHeight: 40,
//                 borderRadius: 20,
//                 borderWidth: 1,
//                 borderColor: '#383333',
//               }}
//               onFailure={onFailure}
//               onSuccess={onSuccess}
//             />
//           </View>
//         </>
//       )}
//     </ScrollView>
//   );
// }
