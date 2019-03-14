import React     from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

import Loading from './Loading';

function SelectLanguage ({ selectedLanguage, onSelect }) {
  const languages = ['All', 'JavaScript', /*'TypeScript',*/ 'Java', 'Python', 'C', 'Go', /*'HTML',*/ 'CSS'];
  return (
    <ul className='languages'>
      {languages.map((language) => {
        return (
          <li 
          style={language === selectedLanguage ? {color: '#3366cc'} : null}
          onClick={() => onSelect(language)}
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

function RepoGrid ({ repos }) {
  return (
    <ul className='popular-list'>
      {repos.map(({ name, owner, html_url, stargazers_count }, index) => (
        <li key={name} className='popular-item'>
          <div className='popular-rank'>#{index+1}</div>
          <ul className='space-list-items'>
            <li>
              <img
                className='avatar'
                src={owner.avatar_url}
                alt={'Avatar for ' + owner.login} 
                />
            </li>
            <li><a href={html_url}>{name}</a></li>
            <li className='repo-owner'>@{owner.login}</li>
            <li>{stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  )
}
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
  state = {
    selectedLanguage: 'All', // defaults to All on component mount
    repos: null
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  
  updateLanguage = async (language) => {
    this.setState(() =>  ({
        selectedLanguage: language,
        repos: null
    }));

    const repos = await fetchPopularRepos(language);
    this.setState(() => ({ repos }));
  } 
  
  render() {
    const { selectedLanguage, repos } = this.state;
    return (
      <div>
        <SelectLanguage
          selectedLanguage = {selectedLanguage}
          onSelect = {this.updateLanguage} 
        />
        {!repos 
          ? <Loading />
          : <RepoGrid repos={repos} />
        }
      </div>
    )
  }// end render

}// end class Popular

export default Popular;
