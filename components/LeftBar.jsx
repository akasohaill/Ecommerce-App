import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';

const LeftBar = ({ selectedCategoryId, onSubcategorySelect }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedCategoryId) return; // If no category is selected, do nothing

    const fetchSubcategories = async () => {
      setLoading(true); // Start loading state
      try {
        const response = await fetch(
          `https://8s8yxba6g8.execute-api.ap-south-1.amazonaws.com/api/getSubCategories?parentId=${selectedCategoryId}`
        );
        const data = await response.json();
        
        // Assuming the API returns a JSON object where subcategories are within a 'subCategories' array
        setSubcategories(data.subCategories || []); // Use subCategories directly from response
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      } finally {
        setLoading(false); // Stop loading state regardless of success or error
      }
    };

    fetchSubcategories();
  }, [selectedCategoryId]); // Re-run whenever the selectedCategoryId changes

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ width: '30%' }}>
      <ScrollView
        style={{
          flexDirection: 'column',
          borderRightWidth: 0.5,
          borderColor: 'gray',
          marginRight: 5,
          padding: 10,
        }}
      >
        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <TouchableOpacity
              key={subcategory.id} // Use 'id' from subcategory
              onPress={() => onSubcategorySelect(subcategory)} // Pass subcategory to the handler
              style={{
                padding: 10,
                alignItems: 'center',
                marginBottom: 5, // Center align items
              }}
            >
              <Image
                source={{
                  uri: `https://cdn.zeptonow.com/production/${subcategory.image.path}`, // Access image path
                }}
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 2, // Space below the image
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  textAlign: 'center',
                }}
              >
                {subcategory.name}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No subcategories available</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default LeftBar;
