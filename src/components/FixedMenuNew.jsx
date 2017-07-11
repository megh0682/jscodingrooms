class FixedMenu extends React.Component {  
  render() {
    if (this.props.logged_in) {
      return (
        <nav>
          <IndexLink to="/" 
            activeClassName="active">Home</IndexLink>
          {" | "}
          <Link to="/cats" activeClassName="active">Cats</Link>
          {" | "}
          <Link to="/about" 
            activeClassName="active">About</Link>
          {" | "}
          <a href="/logout">log out</a>
        </nav>
      );
    } else {
      return (
        <nav>
          <IndexLink to="/" 
            activeClassName="active">Home</IndexLink>
          {" | "}
          <Link to="/cats" activeClassName="active">Cats</Link>
          {" | "}
          <Link to="/about" 
            activeClassName="active">About</Link>
          {" | "}
          <Link to="/login" activeClassName="active">
            log in</Link>
        </nav>
      );
    }
  }
}

Header.propTypes = {  
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {  
  return {logged_in: state.session};
}

export default connect(mapStateToProps)(Header);