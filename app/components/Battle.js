var React     = require('react');
var PropTypes = require('prop-types');
var Link      = require('react-router-dom').Link;

function PlayerPreview (props) { //non reusable stateless functional component so no new file
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>
      </div>
      <button
        className='reset'
        onClick={props.onReset.bind(null, props.id)}>
        Reset
      </button>
    </div>
  )
}
PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

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
    var value = event.target.value;

    this.setState(function () {
      return {
        username : value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault(); //prevent submit to server or anything

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button 
          className='button'
          type='submit'
          disabled={!this.state.username}>
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
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
      return newState;
    });
  }

  handleReset(id) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
    });
  }

  render() {
    var match = this.props.match;
    var player1Name = this.state.player1Name;
    var player2Name = this.state.player2Name;
    var player1Image= this.state.player1Image;
    var player2Image= this.state.player2Image;

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
              id='player1'
              avatar={player1Image}
              username={player1Name}
              onReset={this.handleReset}
            />
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
              id='player2'
              avatar={player2Image}
              username={player2Name}
              onReset={this.handleReset}
            />
          }
        </div>

        {player1Image && player2Image &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: '?player1Name=' + player1Name + '&player2Name=' + player2Name
            }}>
            Battle
          </Link>
        }
      </div>
    )
  }
}

module.exports = Battle;
