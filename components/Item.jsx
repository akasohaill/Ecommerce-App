import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const Item = ({ itemId, itemName, itemPrice, itemImage }) => {
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [modalVisible, setModalVisible] = useState(false); // State for modal
  const [inCheckout, setInCheckout] = useState(false); // State for checkout/payment view

  // Add item to cart
  const handleAdd = () => {
    const existingItemIndex = cartItems.findIndex(item => item.id === itemId);

    if (existingItemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].count += 1;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { id: itemId, price: itemPrice, count: 1 }]);
    }

    setModalVisible(true); // Show modal after adding item
  };

  // Increase item count
  const handleIncrease = (id) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    setCartItems(updatedItems);
  };

  // Decrease item count
  const handleDecrease = (id) => {
    const updatedItems = cartItems.map(item =>
      item.id === id
        ? item.count > 1
          ? { ...item, count: item.count - 1 }
          : null // Remove if count reaches 0
        : item
    ).filter(item => item !== null); // Filter out null items
    setCartItems(updatedItems);

    if (updatedItems.length === 0) {
      setModalVisible(false); // Close modal if cart is empty
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.count * item.price, 0);

  // Handle Proceed to Checkout
  const handleProceedToCheckout = () => {
    setInCheckout(true);
  };

  // Handle back to cart
  const handleBackToCart = () => {
    setInCheckout(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={itemImage ? { uri: itemImage } : require('./../assets/images/vege.jpeg')}
        style={styles.image}
      />
      <TouchableOpacity onPress={handleAdd}>
        <Text style={styles.addButton}>+ ADD</Text>
      </TouchableOpacity>

      <Text style={styles.description}>
        {itemName.length > 15 ? `${itemName.substring(0, 15)}...` : itemName}
      </Text>

      <Text style={styles.price}>₹{itemPrice}.00</Text>

      {/* Modal for cart display */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {inCheckout ? (
              // Payment view
              <View>
                <Text style={styles.modalTitle}>Proceed to Payment</Text>
                <Text style={styles.paymentText}>Total Amount: ₹{totalPrice}.00</Text>
                <Text style={styles.paymentText}>Select Payment Method:</Text>

                <TouchableOpacity style={styles.paymentOption}>
                  <Text style={styles.paymentOptionText}>Credit/Debit Card</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.paymentOption}>
                  <Text style={styles.paymentOptionText}>UPI</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.paymentOption}>
                  <Text style={styles.paymentOptionText}>Net Banking</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={handleBackToCart}>
                  <Text style={styles.closeButtonText}>Back to Cart</Text>
                </TouchableOpacity>
              </View>
            ) : (
              // Cart view
              <View>
                <Text style={styles.modalTitle}>Items in Cart: 🛒🛍️</Text>
                {cartItems.length === 0 ? (
                  <Text>No items in cart</Text>
                ) : (
                  cartItems.map(item => (
                    <View key={item.id} style={styles.cartItem}>
                      <Text style={{ color: 'white', fontWeight: '500', fontSize: 15 }}>
                        {itemName}: {item.count} x ₹{item.price} = ₹{item.count * item.price}
                      </Text>
                     <View>
                     <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.modifyButton}>
                          <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.modifyButton}>
                          <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                     </View>
                    </View>
                  ))
                )}
                <View style={styles.cartFooter}>
                  <Text style={styles.modalText}>Total: ₹{totalPrice}.00</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                      <Text style={styles.closeButtonText}>Cancel ❌</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={handleProceedToCheckout}>
                      <Text style={styles.closeButtonText}>Proceed To Checkout ➤</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles remain unchanged except for the new payment section
  container: {
    margin: 5,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  image: {
    width: 110,
    height: 140,
    borderRadius: 5,
  },
  addButton: {
    width: 60,
    height: 30,
    padding: 5,
    borderRadius: 10,
    borderColor: 'navy',
    textAlign: 'center',
    backgroundColor: 'purple',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: 'white',
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    padding: 3,
    fontWeight: '700',
  },
  price: {
    fontSize: 13,
    color: 'green',
    fontWeight: '500',
  },
  modalContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalContent: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'whitesmoke',
  },
  cartItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
  modifyButton: {
    padding: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    width: 25,
    textAlign: 'center',
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: 'purple',
  },
  modalText: {
    marginVertical: 10,
    fontSize: 17,
    color: 'white',
    fontWeight: '700',
  },
  closeButton: {
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'purple',
  },
  cartFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  paymentText: {
    color: 'whitesmoke',
    fontSize: 16,
    marginVertical: 10,
  },
  paymentOption: {
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  paymentOptionText: {
    color: 'purple',
    textAlign: 'center',
  },
  backButton: {
    display:'flex',
    alignItems:'center',
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    textAlign:'center'
  },
});

export default Item;
