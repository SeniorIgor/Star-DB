import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SwapiService from './../../services/swapi-service';
import Spinner from './../spinner';
import ErrorIndicator from './../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

  static defaultProps = {
    updateInterval: 5000,
  };

  static propTypes = {
    updateInterval: PropTypes.number
  };

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false,
  };

  // componentDidMount() {
  //   const { updateInterval } = this.props;
  //   this.updatePlanet();
  //   this.interval = setInterval(this.updatePlanet, updateInterval);
  // }

  componentDidMount() {
    this.setTimer();
  }

  setTimer = () => {
    this.updatePlanet();
    this.timerId = setTimeout(this.setTimer, this.props.updateInterval);
  };

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false,
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 15) + 2;
    this.swapiService
      .getPlanet(id)
      .then( this.onPlanetLoaded )
      .catch( this.onError );
  };

  render() {

    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessge = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={ planet } /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        { errorMessge }
        { spinner }
        { content }
      </div>

    );
  }
}


const PlanetView = ({ planet }) => {

  const { id, name, population,
    rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
             alt={`${id}`}/>
      <div>
        <h4 className="header">{ name }</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{ population }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{ rotationPeriod }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{ diameter }</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};