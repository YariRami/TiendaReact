import React from 'react'
import CardList from "../../components/CardList/CardList"

const HomePage = () => {
  return (
    <div>
      <CardList categoria="serums" />
      <CardList categoria="higiene"/>
      <CardList categoria="mascaras" />
    </div>
  )
}

export default HomePage;
