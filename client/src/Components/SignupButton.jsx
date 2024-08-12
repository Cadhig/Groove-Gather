import PropTypes from 'prop-types';

const CustomEvent = ({ event }) => {
  const handleSignUp = () => {
    alert(`Signed up for ${event.title}`);
  };

  return (
    <div>
      <strong>{event.title}</strong>
      <div>
        {event.duration && <p>{event.duration}</p>}
        {event.location && <p>{event.location}</p>}
      </div>
      <button 
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </div>
  );
};

CustomEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    duration: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};

export default CustomEvent;
