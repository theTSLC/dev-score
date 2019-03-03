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
    return (
      <div>
        Battle!
      </div>
    )
  }
}

module.exports = Battle;
