import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Linking, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { ActivityIndicator, Searchbar, Text, Card, Button, Avatar, Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { searchEngine } from '@/lib/SearchEngine';
import Bannerlogo from '@/constants/SiteLogos';
import useSearchStore from '@/lib/MainStore'

// Themes
const OrangeTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'orange',
    background: '#FFF8E1',
    surface: '#FFE0B2',
  },
};

const BlackTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#1f2937',
    background: '#121212',
    surface: '#333333',
    text: 'fffff',
  },
};


export default function Index() {
  const [productlist, setProductlist] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [theme, setTheme] = useState(OrangeTheme);

  const [filteredKeys, setFilteredKeys] = useState([]);


  const { searchHistory, addSearch, clearHistory } = useSearchStore();
 

  const toggleTheme = () => {
    setTheme(theme === OrangeTheme ? BlackTheme : OrangeTheme);
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const products = await searchEngine(searchQuery);
      setProductlist(products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSearched(true);
      addSearch(searchQuery);
    }
  };


  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query) {
      const filtered = searchHistory.filter(element =>
        element.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredKeys(filtered);
    } else {
      setFilteredKeys([]);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setSearchQuery(suggestion);
    setFilteredKeys([]);
  };



  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
          onSubmitEditing={fetchProduct}
          style={{ width: "90%", alignSelf: 'center', marginVertical: 16 }}
        />
        {filteredKeys.length > 0 && !Loading && (
          
       
          <View className="bg-gray-200 w-[90%] self-center rounded-xl absolute top-28 z-20 " >

        <FlatList
          data={filteredKeys}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
              <Text style={{ padding: 8, fontSize: 16 }}>{item}</Text>
            </TouchableOpacity>
          )}
          style={{ width: '90%', marginTop: 10 }}
          />
          </View>
   
      )}

        {/* Main Content */}
        {Loading ? (
          <ActivityIndicator size={"large"} animating={true} color={theme.colors.primary} />
        ) : (
          !searched ? (
            <Text
              variant="displayLarge"
              style={{ fontWeight: 'bold', color: theme.colors.primary, textAlign: 'center', marginTop: 100 }}
            >
              Search Something
            </Text>
          ) : (
            <FlatList
              contentContainerStyle={styles.cardContainer}
              numColumns={2}
              data={productlist}
              keyExtractor={(item) => item.productName}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  {/* Logo Banner */}
                  <Avatar.Image
                    size={32}
                    source={{ uri: Bannerlogo[item.origin] || "none" }}
                    style={styles.logo}
                  />

                  {/* Product Image */}
                  <Card.Cover
                    source={{ uri: item.imgUrl || "none" }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />

                  {/* Product Details */}
                  <Card.Content>
                    <Text variant="titleMedium" style={styles.productName}>
                      {item.productName ? `${item.productName.slice(0, 30)}...` : 'No product name'}
                    </Text>

                    {/* Price Section */}
                    <Text variant="bodyMedium" style={styles.price}>
                      {item.price}
                    </Text>
                    {item.discount !== "none" && (
                      <Text variant="bodySmall" style={styles.discount}>
                        -{item.discount}
                      </Text>
                    )}
                  </Card.Content>

                  {/* Buy Button */}
                  <Card.Actions>
                    <Button mode="contained" style={{ borderRadius: 8, backgroundColor: theme.colors.primary }} textColor="white" >
                      Buy Now
                    </Button>
                  </Card.Actions>
                </Card>
              )}
            />
          )
        )}

        {/* Floating Theme Button */}
        <TouchableOpacity style={{ ...styles.floatingButton, backgroundColor: theme.colors.primary }} onPress={toggleTheme}>
          <Text style={styles.floatingButtonText}>
            {theme === OrangeTheme ? "Black" : "Orange"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setSearched(false)} className="h-20 w-20 absolute bottom-1" >
          <Text>home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    width: 192,
  },
  logo: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  productImage: {
    height: 192,
    width: '100%',
  },
  productName: {
    color: '#1f2937', // gray-800
    marginTop: 8,
    fontWeight: '500',
  },
  price: {
    color: '#111827', // gray-900
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  discount: {
    color: '#ef4444', // red-500
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  cardContainer: {
    justifyContent: 'space-between',
    padding: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'orange',
    borderRadius: 50,
    padding: 16,
    elevation: 4,
  },
  floatingButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
