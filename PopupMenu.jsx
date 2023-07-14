import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const PopupMenu = ({ isPopupOpen }) => {
  if (isPopupOpen) {
    return (
      <View style={styles.popupMenu}>
        <TouchableOpacity style={styles.submenuItem}>
          <Image source={require('./addparty.png')} style={styles.submenuIcon} />
          <Text style={styles.submenuItemText}>Add Party</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submenuItem}>
          <Image source={require('./transaction.png')} style={styles.submenuIcon} />
          <Text style={styles.submenuItemText}>Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submenuItem}>
          <Image source={require('./metal.png')} style={styles.submenuIcon} />
          <Text style={styles.submenuItemText}>Metal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submenuItem}>
          <Image source={require('./cash.png')} style={styles.submenuIcon} />
          <Text style={styles.submenuItemText}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submenuItem}>
          <Image source={require('./bhavcut.png')} style={styles.submenuIcon} />
          <Text style={styles.submenuItemText}>Bhavcut</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  popupMenu: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 140,
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 70,
    paddingHorizontal: 45,
    elevation: 4,
  },
  submenuItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  submenuIcon: {
    width: 30,
    height: 34,
    marginBottom: 8,
  },
  submenuItemText: {
    fontSize: 12,
    color: '#555555',
    textAlign: 'center',
  },
});

export default PopupMenu;
