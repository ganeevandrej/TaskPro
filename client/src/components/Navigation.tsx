// import * as React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { useNavigationState } from '@react-navigation/native';

// const CustomBottomTabBar = ({ navigation }) => {
//   const [activeTab, setActiveTab] = React.useState(0);

//   const handlePress = (screenName, index) => {
//     navigation.navigate(screenName);
//     setActiveTab(index);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={[styles.tabButton, activeTab === 0 && styles.activeTabButton]}
//         onPress={() => handlePress('Home', 0)}
//       >
//         <Text style={[styles.tabText, activeTab === 0 && styles.activeTabText]}>Home</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.tabButton, activeTab === 1 && styles.activeTabButton]}
//         onPress={() => handlePress('Settings', 1)}
//       >
//         <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>Settings</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#6200EE',
//     height: 60,
//   },
//   tabButton: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   activeTabButton: {
//     backgroundColor: '#fff',
//   },
//   tabText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   activeTabText: {
//     color: '#6200EE',
//     fontWeight: 'bold',
//   },
// });

// export default CustomBottomTabBar;
