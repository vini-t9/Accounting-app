import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, StatusBar, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const [clickedContainer, setClickedContainer] = useState(null);
  const handleContainerClick = (label) => {
    if (clickedContainer === label) {
      setClickedContainer(null); // Reset to default if clicked again
    } else {
      setClickedContainer(label);
    }
  };
  const [fetchedData, setFetchedData] = useState({});
  const [showNewContainer, setShowNewContainer] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPlusIcon, setIsPlusIcon] = useState(true);
  const handlePlusButtonPress = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsPlusIcon(!isPlusIcon);
  };
  const [data, setData] = useState({
    silverQuantity: -14500.0,
    goldQuantity: 133.500,
    amountValue: 676000,
    user: {
      name: 'Mannalal Manaklal',
      image: require('./user.png'), // Replace with the actual path to user image
    },
  });

  const [selectedOption, setSelectedOption] = useState('Both');
  const [searchText, setSearchText] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    // Fetch dummy data or perform other necessary actions
  }, []);

  const renderUserInfo = () => {
    const { name, image } = data.user;

    return (
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfo}>
          <Image source={image} style={styles.userImage} />
          <Text style={styles.userName}>{name}</Text>
        </View>
      </View>
    );
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    // Perform search functionality using the searchText
    console.log('Searching for:', searchText);
  };

  const activateSearch = () => {
    setIsSearchActive(true);
  };

  const deactivateSearch = () => {
    setIsSearchActive(false);
    Keyboard.dismiss();
  };

  const renderSearchBar = () => {
    return (
      <TouchableWithoutFeedback onPress={deactivateSearch}>
        <View style={styles.searchBarContainer}>
          <TouchableOpacity onPress={activateSearch} activeOpacity={1}>
            <View style={styles.searchBar}>
              <Image source={require('./search.png')} style={styles.searchIcon} />
              <TextInput
                style={[styles.searchInput, isSearchActive && styles.activeSearchInput]}
                placeholder="Search Party"
                value={searchText}
                onChangeText={handleSearchTextChange}
                onSubmitEditing={handleSearch}
                onFocus={activateSearch}
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderOptions = () => {
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
    };

    return (
      <View style={styles.options}>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'Both' && styles.optionButtonSelected]}
          onPress={() => handleOptionSelect('Both')}
        >
          <Text style={[styles.optionButtonText, selectedOption === 'Both' && styles.optionButtonTextSelected]}>
            Both
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'Silver' && styles.optionButtonSelected]}
          onPress={() => handleOptionSelect('Silver')}
        >
          <Text style={[styles.optionButtonText, selectedOption === 'Silver' && styles.optionButtonTextSelected]}>
            Silver
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'Gold' && styles.optionButtonSelected]}
          onPress={() => handleOptionSelect('Gold')}
        >
          <Text style={[styles.optionButtonText, selectedOption === 'Gold' && styles.optionButtonTextSelected]}>
            Gold
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContainer = (label, data) => {
    let containerStyle = styles.dataContainer; // Default style for other containers

    // Apply specific styles for Total and Stock containers
    if (label === 'Total' || label === 'Stock') {
      containerStyle = label === 'Total' ? [styles.dataContainer, styles.totalContainer] : [styles.dataContainer, styles.stockContainer];
    }

    const { silverQuantity, goldQuantity, amountValue } = data;
    let displayedSilverQuantity = '';
    let displayedGoldQuantity = '';

    if (selectedOption === 'Both' || selectedOption === 'Silver') {
      displayedSilverQuantity = silverQuantity < 0 ? `${silverQuantity} Gms` : `+${silverQuantity} Gms`;
    }

    if (selectedOption === 'Both' || selectedOption === 'Gold') {
      displayedGoldQuantity = goldQuantity < 0 ? `${goldQuantity} Gms` : `+${goldQuantity} Gms`;
    }

    const displayedAmountValue = amountValue < 0 ? `${amountValue}` : `+${amountValue}`;

    // Check if the container is clicked and display the clicked container or the default container
    if (clickedContainer === label) {
      return (
        <React.Fragment>
          <TouchableOpacity onPress={() => handleContainerClick(label)} activeOpacity={0.8}>
            <View style={containerStyle}>
              <Text style={styles.label}>{label}</Text>
            </View>
          </TouchableOpacity>
          {/* Render the dummy data container */}
          {renderDummyDataContainer(data)}
        </React.Fragment>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => handleContainerClick(label)} activeOpacity={0.8}>
          <View style={containerStyle}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.dataRow}>
              {selectedOption !== 'Gold' && (
                <View style={styles.dataColumn}>
                  <Text style={[styles.dataText, silverQuantity < 0 ? styles.negativeValue : styles.positiveValue]}>
                    Silver
                  </Text>
                  <Text style={[styles.dataValue, silverQuantity < 0 ? styles.negativeValue : styles.positiveValue]}>
                    {displayedSilverQuantity}
                  </Text>
                </View>
              )}
              {selectedOption !== 'Silver' && (
                <View style={styles.dataColumn}>
                  <Text style={[styles.dataText, goldQuantity < 0 ? styles.negativeValue : styles.positiveValue]}>
                    Gold
                  </Text>
                  <Text style={[styles.dataValue, goldQuantity < 0 ? styles.negativeValue : styles.positiveValue]}>
                    {displayedGoldQuantity}
                  </Text>
                </View>
              )}
              <View style={styles.dataColumn}>
                <Text style={[styles.dataText, amountValue < 0 ? styles.negativeValue : styles.positiveValue]}>
                  Amount
                </Text>
                <Text style={[styles.dataValue, amountValue < 0 ? styles.negativeValue : styles.positiveValue]}>
                  {displayedAmountValue}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderDummyDataContainer = (data) => {
    return (
      <>
        <View style={styles.dataContainer}>
          <View style={styles.dataRow}>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Silver</Text>
              <Text style={styles.dataValue}>{data.silverQuantity} Gms</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Gold</Text>
              <Text style={styles.dataValue}>{data.goldQuantity} Gms</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Amount</Text>
              <Text style={styles.dataValue}>{data.amountValue}</Text>
            </View>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.dataRow}>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Silver</Text>
              <Text style={styles.dataValue}>{data.silverQuantity} Gms</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Gold</Text>
              <Text style={styles.dataValue}>{data.goldQuantity} Gms</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Amount</Text>
              <Text style={styles.dataValue}>{data.amountValue}</Text>
            </View>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.dataRow}>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Silver</Text>
              <Text style={styles.dataValue}>{data.silverQuantity} Gms</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Gold</Text>
              <Text style={styles.dataValue}>{data.goldQuantity} Gms</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Amount</Text>
              <Text style={styles.dataValue}>{data.amountValue}</Text>
            </View>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.dataRow}>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Silver</Text>
              <Text style={styles.dataValue}>{data.silverQuantity} Gms</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Gold</Text>
              <Text style={styles.dataValue}>{data.goldQuantity} Gms</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Amount</Text>
              <Text style={styles.dataValue}>{data.amountValue}</Text>
            </View>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.dataRow}>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Silver</Text>
              <Text style={styles.dataValue}>{data.silverQuantity} Gms</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Gold</Text>
              <Text style={styles.dataValue}>{data.goldQuantity} Gms</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Amount</Text>
              <Text style={styles.dataValue}>{data.amountValue}</Text>
            </View>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.dataRow}>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Silver</Text>
              <Text style={styles.dataValue}>{data.silverQuantity} Gms</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Gold</Text>
              <Text style={styles.dataValue}>{data.goldQuantity} Gms</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.dataText}>Amount</Text>
              <Text style={styles.dataValue}>{data.amountValue}</Text>
            </View>
          </View>
        </View>


      </>
    );
  };

  const renderPopupMenu = () => {
    if (isPopupOpen) {
      // Render the popup menu here
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



  return (
    <TouchableWithoutFeedback onPress={deactivateSearch}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        {renderUserInfo()}
        {renderSearchBar()}
        {renderOptions()}
        {isPopupOpen && renderPopupMenu()}
        {clickedContainer ? (
          renderContainer(clickedContainer, data)
        ) : (
          <React.Fragment>
            {renderContainer('Total', data)}
            {renderContainer('Stock', data)}
            {renderContainer('Karigar', data)}
            {renderContainer('Supplier', data)}
            {renderContainer('Bullion', data)}
            {renderContainer('Customer', data)}
          </React.Fragment>
        )}

        {renderPopupMenu()}
        <TouchableOpacity style={styles.plusButton} onPress={handlePlusButtonPress}>
          <Icon name={isPlusIcon ? 'add' : 'remove'} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  userInfoContainer: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#555555',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#555555',
  },
  activeSearchInput: {
    borderColor: '#555555',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginBottom: 12,
    paddingHorizontal: 18,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
    borderRadius: 26,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 4,
    maxWidth: '15%',
  },
  optionButtonSelected: {
    backgroundColor: '#555555',
  },
  optionButtonText: {
    fontSize: 16,
    color: '#555555',
  },
  optionButtonTextSelected: {
    color: '#FFFFFF',
  },
  dataContainer: {
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#F0F0F0',
    alignSelf: 'center',
    marginBottom: 4,
  },
  totalContainer: {
    width: '82%',
    borderRadius: 10,
    borderWidth: 6,
    borderColor: '#bfbfbf',
  },
  stockContainer: {
    width: '82%',
    borderRadius: 10,
    borderWidth: 6,
    borderColor: '#d9f2e6',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  plusButton: {
    position: 'absolute',
    bottom: 50,
    right: 35,
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: '#555555',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  popupMenu: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 120,
    right: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 40,
    paddingHorizontal: 15,
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
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
  },
  dataColumn: {
    alignItems: 'center',
  },
  dataText: {
    fontSize: 14,
    color: 'black',
  },
  dataValue: {
    fontSize: 14,
    marginTop: 2,
    color: 'black',
  },
  negativeValue: {
    color: 'red',
  },
  positiveValue: {
    color: 'green',
  },
});

export default HomeScreen;
