import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import Items from './Items.jsx';

const RightPage = ({ selectedSubcategory }) => {
  return (
    <View style={{
      padding: 5,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 10,
      }}>
        {/* {['Filter', 'Sort', 'Cart'].map((label) => (
          <TouchableOpacity key={label} style={{
            backgroundColor: 'whitesmoke',
            padding: 5,
            borderRadius: 25,
            borderColor: 'navy',
            borderWidth: 1,
            width: 80,
          }}>
            <Text style={{
              color: 'navy',
              fontSize: 15,
              fontWeight: '500',
              textAlign: 'center'
            }}>{label}</Text>
          </TouchableOpacity>
        ))} */}
        <TouchableOpacity style={{
            backgroundColor: 'whitesmoke',
            padding: 5,
            borderRadius: 25,
            borderColor: 'navy',
            borderWidth: 1,
            width: 80,
          }}>
            <Text style={{
              color: 'navy',
              fontSize: 15,
              fontWeight: '500',
              textAlign: 'center'
            }}> ⏳ Filter</Text>
          </TouchableOpacity>
        <TouchableOpacity style={{
            backgroundColor: 'whitesmoke',
            padding: 5,
            borderRadius: 25,
            borderColor: 'navy',
            borderWidth: 1,
            width: 80,
          }}>
            <Text style={{
              color: 'navy',
              fontSize: 15,
              fontWeight: '500',
              textAlign: 'center'
            }}>📶 Sort</Text>
          </TouchableOpacity>
        <TouchableOpacity style={{
            backgroundColor: 'whitesmoke',
            padding: 5,
            borderRadius: 25,
            borderColor: 'navy',
            borderWidth: 1,
            width: 80,
          }}>
            <Text style={{
              color: 'navy',
              fontSize: 15,
              fontWeight: '500',
              textAlign: 'center'
            }}>🛒 Cart</Text>
          </TouchableOpacity>
      </View>

      <View style={{
        marginTop: 20,
        marginBottom: 50
      }}>
        {selectedSubcategory ? (
          <Items selectedSubcategory={selectedSubcategory} />
        ) : (
          <Text style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 18,
            color: 'gray',
          }}>
            Please select a subcategory to view items.
          </Text>
        )}
      </View>
    </View>
  );
}

export default RightPage;
