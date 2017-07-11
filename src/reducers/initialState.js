import faker from 'faker';
import roomlogo from '../person.png';
const initialState = {
  availableRooms: [],
  currentUser: faker.internet.userName(),
  isAuthenticated: false,
  user: {}
    
};

export default initialState;