var React     = require('react');
var PropTypes = require('prop-types');

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
          disabled={!this.state.username}
        >
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
      payer2Image : null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.pgn?size=200';
      return newState;
    });
  }

  render() {
    var player1Name = this.state.player1Name;
    var player2Name = this.state.player2Name;

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

          {!player2Name &&
            <PlayerInput 
              id='player2'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />
          }
        </div>
      </div>
    )
  }
}

module.exports = Battle;
