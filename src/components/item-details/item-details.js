import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorButton from '../error-button';

import './item-details.css';

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null,
    loading: true,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if(this.props.itemId !== prevProps.itemId ||
        this.props.getData !== prevProps.getData ||
        this.props.getImageUrl !== prevProps.getImageUrl) {
      this.updateItem();
    }
  }


  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;

    if(!itemId) return;

    this.setState({
      loading: true,
    });

    getData(itemId)
      .then((item) => {
        this.setState({ 
          item,
          image: getImageUrl(item),
          loading: false,
        });
      });
  };

  render() {

    const { item, image, loading } = this.state;

    if(!item) {
      return <span>Select a item from a list</span>
    }

    if(loading) return <Spinner />;

    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image"
          src={ image }
          alt="item" />

        <div className="card-body item-details__card">
          <h4>{ name }</h4>
          <ul className="list-group list-group-flush">
            
            { 
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }

          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{ label }</span>
      <span>{ item[field] }</span>
    </li>
  );
}

export {
  Record,
}