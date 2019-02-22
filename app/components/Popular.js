var React   = require('react');

class Popular extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All' // defaults to All on component mount
    };
  }
  
  updateLanguage (language) {
    this.setState(function () {
      return {
        selectedLanguage: language
      }
    });
  }
  
  render() {
    var languages = ['All', 'JavaScript', 'Python', 'Go', 'R', 'HTML', 'CSS'];
    return (
      <ul className='languages'>
        {languages.map(function (language) {
          return (
            <li key={language}>
              {language}
            </li>
          )
        })}
      </ul>
    )
  }
}

module.exports = Popular;
