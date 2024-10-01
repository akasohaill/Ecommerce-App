import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import MainPage from './../components/MainPage.jsx';
import LeftBar from './../components/LeftBar.jsx'; // Import LeftBar

export default function Index() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory,setSelectedSubcategory]=useState(null)
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://8s8yxba6g8.execute-api.ap-south-1.amazonaws.com/api/categories');
            const data = await response.json();
            setCategories(data);
            if (data.length > 0) {
                setSelectedCategory(data[0]); // Set the first category as the default selected
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    
    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryChange = (itemValue) => {
        const selected = categories.find(cat => cat._id === itemValue);
        setSelectedCategory(selected);
    };
    const handleSubcategorySelect = (subcategory) => {
        setSelectedSubcategory(subcategory);
      };

    return (
        <View style={styles.container}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
                // marginTop: 0,
                paddingTop: 40,
                gap: 10,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                width: '100%',
                backgroundColor:'purple'
            }}>
                {selectedCategory && selectedCategory.imageWithNameV2 && (
                    <Image
                        source={{ uri: `https://cdn.zeptonow.com/production/${selectedCategory?.imageWithNameV2?.path}` }}
                        style={styles.image}
                    />
                )}
                <Picker
                    selectedValue={selectedCategory ? selectedCategory._id : ""}
                    onValueChange={handleCategoryChange}
                    style={styles.picker}
                >
                    {categories.map((category) => (
                        <Picker.Item 
                            key={category._id} 
                            label={category.name} 
                            value={category._id} 
                            style={{
                                fontSize:25,
                                fontWeight:900,
                                // color:'gray'
                            }}
                        />
                    ))}
                </Picker>
            </View>
            <Text>
            {categories.length === 0 ? (
                <Text style={styles.loadingText}>Loading categories...</Text>
            ): null} 
            </Text>

            {/* Render the LeftBar component and pass selected category ID */}
            <View style={styles.content}>
                <LeftBar
                 selectedCategoryId={selectedCategory ? selectedCategory._id : null}   onSubcategorySelect={handleSubcategorySelect}/>
                <MainPage selectedSubcategory={selectedSubcategory} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        height: 50,
        width: 200,
        fontSize: 20,
        fontWeight: '800',
        marginTop:10
    },
    image: {
        width: 50,
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        left: 20,
        marginRight: 30,
        marginBottom: 10
    },
    loadingText: {
        marginTop: 20, 
        fontSize: 18,
        fontWeight: '600',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        width:'100%'
    }
});
