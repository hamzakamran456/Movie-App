import React from 'react'
import { useParams } from 'react-router-dom'

const ExplorePage = () => {
  const params = useParams()
  console.log(params)


  
  return (
    <div>ExplorePage</div>
  )
}

export default ExplorePage