var React = require('react');

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player1Name : '',
      player1Image: null,
      player2Name : '',
      payer2Image : null,
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
