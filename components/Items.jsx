import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import Item from './Item';

const Items = ({ selectedSubcategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API based on selected subcategory
  const fetchProducts = async () => {
    if (!selectedSubcategory) return;

    try {
      setLoading(true);
      const response = await fetch(
        `https://8s8yxba6g8.execute-api.ap-south-1.amazonaws.com/api/data-by-category?subId=${selectedSubcategory.id}`
      );
      const data = await response.json();

      if (data && data.products) {
        setProducts(data.products);
      } else {
        setProducts([]); // Handle no products case
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedSubcategory]); // Re-fetch whenever selectedSubcategory changes

  const renderItem = ({ item }) => {
    const productName = item?.product?.name || 'Unnamed Product';
    const productPrice = item?.productVariant?.mrp ? item.productVariant.mrp / 100 : 0;
    const productImage = item?.productVariant?.images?.[0]?.path
      ? `https://cdn.zeptonow.com/production/${item?.productVariant?.images[0]?.path}`
      : null;

    return (
      <Item
        itemId={item._id}
        itemName={productName}
        itemPrice={productPrice}
        itemImage={productImage}
      />
    );
  };

  return (
    <View style={{ marginBottom: 20,
      paddingRight:10
     }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      ) : (
        <Text>No products available.</Text>
      )}
    </View>
  );
};

export default Items;
