const React       = require('react');
const PropTypes   = require('prop-types');
const queryString = require('query-string');
const Link        = require('react-router-dom').Link;
const api         = require('../utils/api');

const PlayerPreview = require('./PlayerPreview');
const Loading       = require('./Loading');

function Profile ({ info }) { //non reused stateless functional component so no new file needed
  const { avatar_url, login, name, location, company, followers, following, public_repos, blog } = info;
  return (
    <PlayerPreview avatar={avatar_url} username={login}>
      <ul className='space-list-items'>
        {name     && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company  && <li>{company}</li>}
        <li>Followers:    {followers}</li>
        <li>Following:    {following}</li>
        <li>Public Repos: {public_repos}</li>
        {blog && <li><a href={blog}>{blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}
Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player ({ label, score, profile }) { //non reused stateless functional component so no new file needed
  return (
    <div>
      <h1 className='header'>{label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {score}</h3>
      <Profile info={profile}/>
    </div>
  )
}
Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

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
    const { player1Name, player2Name } = queryString.parse(this.props.location.search);

    api.battle([
      player1Name,
      player2Name
    ]).then((results) => {
      if (results === null) {
        return this.setState(() => ({
          error : 'Looks like something went wrong. Check that both users exist on Github',
          loading: false
        }));
      }

      this.setState(() => ({
        error: null,
        winner: results[0],
        loser: results[1],
        loading: false
      }));
    });
  }
  
  render() {
    const { error, winner, loser, loading } = this.state;

    if (loading === true) {
      return <Loading />
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
      <div className="row">
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

module.exports = Results;
