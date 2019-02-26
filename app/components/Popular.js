var React   = require('react');

class Popular extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All' // defaults to All on component mount
    };
    this.updateLanguage = this.updateLanguage.bind(this); // makes it so `this` keyword in updateLanguage is always the component instance itself, which will have a setState property
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
            <li 
              onClick={this.updateLanguage.bind(null, language)}
              key={language}>
              {language}
            </li>
          )
        }, this)}
      </ul>
    )
  }
}

module.exports = Popular;
