import { Input } from 'antd';

const { Search } = Input;

const airportMenuStyle = {
  position: 'absolute',
  top: 6,
  left: 30,
  width: '200px',
  zIndex: 999,
};

const AirportMenu = ({ handleAirportSearch }) => {
  return (
    <div>
      <Search
        placeholder="Airport Name/IATA"
        enterButton="Search"
        size="middle"
        style={airportMenuStyle}
        onSearch={handleAirportSearch}
      />
    </div>
  );
};

export default AirportMenu;
