import { View, Text } from 'react-native'
import React from 'react'
import RightPage from './RightPage.jsx'

const MainPage = ({ selectedSubcategory }) => {
  return (
    <View style={{
        width:'70%'
    }}>
      <RightPage selectedSubcategory={selectedSubcategory}/>
    </View>
  )
}

export default MainPage