import { Input, Button } from 'antd';

const { Search } = Input;

const airportMenuStyle = {
  position: 'absolute',
  top: 40,
  right: 40,
  width: '250px',
  zIndex: 999,
};

const AirportMenu = ({ handleAirportSearch }) => {
  return (
    <div>
      <Search
        placeholder="Airport Name/IATA"
        enterButton="Search"
        size="large"
        style={airportMenuStyle}
        onSearch={handleAirportSearch}
      />
    </div>
  );
};

export default AirportMenu;
