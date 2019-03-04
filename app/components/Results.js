var React       = require('react');
var queryString = require('query-string');
var Link        = require('react-router-dom').Link;

var api = require('../utils/api');

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner  : null,
      loser   : null,
      error   : null,
      loading : true
    }
  }

  componentDidMount() {
    var players = queryString.parse(this.props.location.search);

    api.battle([
      players.player1Name,
      players.player2Name
    ])
      .then(function (results) {

        if (results === null) {
          return this.setState(function() {
            return {
              error : 'Looks like something went wrong. Check that both users exist on Github',
              loading: false
            };
          });
        }

        this.setState(function () {
          return {
            error: null,
            winner: results[0],
            loser: results[1],
            loading: false
          }
        })
      }.bind(this));
  }
  
  render() {
    var error  = this.state.error;
    var winner = this.state.winner;
    var loser  = this.state.loser;
    var loading= this.state.loading;

    if (loading === true) {
      return <p>Loading</p>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div>{JSON.stringify(this.state, null, 2)}</div>
    )
  }
}

module.exports = Results;
