import React     from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';

import PlayerPreview from './PlayerPreview';

class PlayerInput extends React.Component { //non reusable child component so no new file
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState(() => ({username : value}));
  }

  handleSubmit(event) {
    event.preventDefault(); //prevent submit to server or anything

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render() {
    const { username } = this.state;
    const { label } = this.props;
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={username}
          onChange={this.handleChange}
        />
        <button 
          className='button'
          type='submit'
          disabled={!username}>
          Submit
        </button>
      </form>
    )
  }
}
PlayerInput.propTypes = {
  id : PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}
PlayerInput.defaultProps = {
  label: 'Username'
}

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1Name : '',
      player1Image: null,
      player2Name : '',
      player2Image : null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset  = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(() => ({
      [id + 'Name']: username,
      [id + 'Image']: `https://github.com/${username}.png?size=200`
    })); 
  }

  handleReset(id) {
    this.setState(() => ({
      [id + 'Name']: '',
      [id + 'Image']: null
    }));
  }

  render() {
    const { match } = this.props;
    const { player1Name, player2Name, player1Image, player2Image } = this.state;

    return (
      <div>
        <div className='row'>
          {!player1Name &&
            <PlayerInput 
              id='player1'
              label='Player One'
              onSubmit={this.handleSubmit}
            />
          }
          {player1Image !== null &&
            <PlayerPreview 
              avatar={player1Image}
              username={player1Name}>
                <button
                  className='reset'
                  onClick={() => this.handleReset('player1')}>
                    Reset
                </button>
            </PlayerPreview>
          }

          {!player2Name &&
            <PlayerInput 
              id='player2'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />
          }
          {player2Image !== null &&
            <PlayerPreview
              avatar={player2Image}
              username={player2Name}>
                <button
                  className='reset'
                  onClick={() => this.handleReset('player2')}>
                    Reset
                </button>
            </PlayerPreview>
          }
        </div>

        {player1Image && player2Image &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: `?player1Name=${player1Name}&player2Name=${player2Name}`
            }}>
            Battle
          </Link>
        }
      </div>
    )
  }
}

export default Battle;
