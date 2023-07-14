import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

const MenuBar = () => {
  const renderMenu = (title, icon) => {
    return (
      <TouchableOpacity style={styles.menuItem}>
        <Image source={icon} style={styles.menuIcon} />
        <Text style={styles.menuTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.menuBar}>
      {renderMenu('Home', require('./home.png'))}
      {renderMenu('Boxes', require('./boxes.png'))}
      {renderMenu('Books', require('./books.png'))}
      {renderMenu('More', require('./more.png'))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  menuTitle: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default MenuBar;
