var React     = require('react');
var PropTypes = require('prop-types');
var api       = require('../utils/api');

function SelectLanguage (props) {
  var languages = ['All', 'JavaScript', 'TypeScript', 'Java', 'Python', 'HTML', 'CSS', /*'Go', 'R'*/];
  return (
    <ul className='languages'>
      {languages.map(function (language) {
        return (
          <li 
          style={language === props.selectedLanguage ? {color: 'plum'} : null}
          onClick={props.onSelect.bind(null, language)}
          key={language}>
            {language}
          </li>
        )
      })}
    </ul>
  )
}
SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index+1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login} 
                  />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li className='repo-owner'>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All', // defaults to All on component mount
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this); // makes it so `this` keyword in updateLanguage is always the component instance itself, which will have a setState property
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  
  updateLanguage (language) {
    this.setState(function () {
      return {
        selectedLanguage: language,
        repos: null
      }
    });
    api.fetchPopularRepos(language)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        })
      }.bind(this));
  } // end updateLanguage
  
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage = {this.state.selectedLanguage}
          onSelect = {this.updateLanguage} 
        />
        {!this.state.repos 
          ? <p className='loading-text'>talking to github...</p>
          : <RepoGrid repos={this.state.repos} />
        }
      </div>
    )
  }// end render

}// end class Popular

module.exports = Popular;
