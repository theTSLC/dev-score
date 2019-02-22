var React = require('react');

class Popular extends React.Component {
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
