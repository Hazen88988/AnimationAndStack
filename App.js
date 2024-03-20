import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Screen1 = ({ navigation }) => { //this prop provides nav functions like goBack, push, top
  const [numTickets, setNumTickets] = useState('');

  // handle purchase button function
  const handlePurchase = () => {
    if (numTickets !== '' && !isNaN(numTickets)) { 
      navigation.navigate('Screen2', { numTickets: parseInt(numTickets) });  //pass number of tickets as parameter to 2nd screen
    } else {
      // Handle invalid input
      alert('Please enter a valid number of tickets.');
    }
  };
  //screen one view
  return (
    <View style={styles.container}>
      <Text>Your Name: Patrick Wildgen</Text>
      <Text>Student ID: n01586789</Text>
      <TextInput
        style={styles.input}
        placeholder="Number of Tickets"
        keyboardType="numeric"
        value={numTickets}
        onChangeText={setNumTickets}
      />
      <Button title="Purchase" onPress={handlePurchase} />
    </View>
  );
};

const Screen2 = ({ route }) => { //screen two route needs access to information from screen 1 stack
  const { numTickets } = route.params; //catching numTickets from screen one
  const ticketPrice = 12.97;
  const discountThreshold = 5;
  const discountPercentage = 0.1;
  let discount = 0;
  let finalPrice = numTickets * ticketPrice;
  //handle discount
  if (numTickets > discountThreshold) {
    discount = finalPrice * discountPercentage;
    finalPrice -= discount;
  }

  //Animated is lib, Animated.method() will let use use a method from the lib
  const fadeAnim = useRef(new Animated.Value(0)).current; //init anim with value of 0 using useRef() method to render it

  
  const fadeIn = () => {
    Animated.timing(fadeAnim, { //handeling timing animation 
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };
  
  //handles the opacity based on value of fadeAnim, as fadeAnim value changes the opactity would change to
  const animatedStyle = {
    opacity: fadeAnim,
  };

  return (
    <View style={styles.container}>
      <Text>Number of Tickets: {numTickets}</Text>
      <Text>Ticket Price: ${ticketPrice.toFixed(2)}</Text>
      <Text>Discount: ${discount.toFixed(2)}</Text>
      {/* Animated text makes text able to be animated and apply animated style to control opactity*/}
      <Animated.Text style={[styles.finalPrice, animatedStyle]}>Final Ticket Price: ${finalPrice.toFixed(2)}</Animated.Text>  
      {/* apply fadein animation to opPress even */}
      <TouchableOpacity onPress={fadeIn}> 
        <View style={styles.highlightButton}>
          <Text style={styles.highlightButtonText}>Show Final Ticket Price</Text> 
        </View>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: 200,
  },
  highlightButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'yellow',
  },
  highlightButtonText: {
    fontWeight: 'bold',
  },
});

export default App;
