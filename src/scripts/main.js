import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter,
    Match,
    Miss,
    Link,
    Redirect,
} from 'react-router';

require('../styles/style.css');

class Home extends React.Component {
    render() {
        console.log(this.context);
        console.log(this.props);

        return (
            <div>Home</div>
        );
    }
}

Home.contextTypes = {
    router: PropTypes.object
};

const Protected = () => <div>Protected</div>;

const MatchWhenAuthenticated = ({
    component: Component,
    isAuthenticated,
    pattern
}) => (
    <Match pattern={pattern} render={props => (
        isAuthenticated ?
            <Component {...props} />
            : <Redirect to="/topics" />
    )}/>
);

const About = () => <div>About</div>;
const Topic = ({ params: { topicId } }) => <div>{topicId}</div>;
const Contacts = () => <div>Contacts</div>;

const Topics = ({ pathname, pattern }) => (
    <div>
        <h2>Topics</h2>

        <ul>
            <li>
                <Link to={`${pathname}/rendering`}>Rendering</Link>
            </li>
            <li>
                <Link to={`${pathname}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${pathname}/props-vs-state`}>Props vs State</Link>
            </li>
        </ul>
        <Match pattern={`${pathname}/:topicId`} component={Topic} />
        <Match pattern={pathname} exactly render={() => (
            <h2>Select topic please</h2>
        )}/>
    </div>
);
const NoMatch = () => <div>No match</div>;

const App = () => (
    <BrowserRouter>
        <div>
            <ul>
                <li>
                    <Link
                        to="/"
                        activeStyle={{ color: 'green' }}
                        activeOnlyWhenExact={true}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/about"
                        activeStyle={{ color: 'green' }}
                    >
                        About
                    </Link>
                </li>
                <li>
                    <Link
                        to="/topics"
                        activeStyle={{ color: 'green' }}
                    >
                        Topics
                    </Link>
                </li>
                <li>
                    <Link
                        to="/private"
                        activeStyle={{ color: 'green' }}
                    >
                        Private
                    </Link>
                </li>
                <li>
                    <Link
                        to="/contacts"
                        activeStyle={{ color: 'green' }}
                    >
                        Contacts
                    </Link>
                </li>
            </ul>

            <hr />

            <Match exactly pattern="/" component={Home} />
            <Match pattern="/about" component={About} />
            <Match pattern="/topics" component={Topics} />
            <Match pattern="/contacts" component={Contacts} />
            <MatchWhenAuthenticated
                pattern="/private"
                isAuthenticated={true}
                component={Protected}
            />
            <Miss component={NoMatch}/>
        </div>
    </BrowserRouter>
);

render(
    <App />,
    document.getElementById('app')
);
