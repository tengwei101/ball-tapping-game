import { View, Text, FlatList } from 'react-native'
import React from 'react'
import {products} from "../products"

import ProductCard from './ProductCard'

const ProductList = () => {
  return (
    <FlatList 
        data={products} 
        keyExtractor={(product) => product.id}
        renderItem={({item})=> <ProductCard {...item}/>}
        
    />
  )
}

export default ProductList