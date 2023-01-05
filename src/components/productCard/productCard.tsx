import React, { Component } from "react";
import "./productCard.scss";

type productCardProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export default class productCard extends Component<productCardProps> {
  render() {
    return <div>productCard</div>;
  }
}
