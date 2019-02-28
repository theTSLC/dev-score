var React     = require('react');
var PropTypes = require('prop-types');
var api       = require('../utils/api');

function SelectLanguage (props) {
  var languages = ['All', 'JavaScript', 'Python', 'Go', 'R', 'HTML', 'CSS'];
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
        console.log(repos);
      });
  } // end updateLanguage
  
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage = {this.state.selectedLanguage}
          onSelect = {this.updateLanguage} 
        />
      </div>
    )
  }
}

module.exports = Popular;
