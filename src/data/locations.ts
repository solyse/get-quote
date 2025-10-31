export interface Location {
  id: string;
  name: string;
  address: string;
  type: 'club' | 'resort' | 'airport' | 'city';
}

export const golfClubsAndDestinations: Location[] = [
  // Golf Clubs - USA
  {
    id: 'augusta-national',
    name: 'Augusta National Golf Club',
    address: 'Augusta, GA 30904',
    type: 'club',
  },
  {
    id: 'pebble-beach',
    name: 'Pebble Beach Golf Links',
    address: 'Pebble Beach, CA 93953',
    type: 'club',
  },
  {
    id: 'pinehurst',
    name: 'Pinehurst Resort',
    address: 'Pinehurst, NC 28374',
    type: 'resort',
  },
  {
    id: 'kiawah-island',
    name: 'Kiawah Island Golf Resort',
    address: 'Kiawah Island, SC 29455',
    type: 'resort',
  },
  {
    id: 'torrey-pines',
    name: 'Torrey Pines Golf Course',
    address: 'La Jolla, CA 92037',
    type: 'club',
  },
  {
    id: 'bethpage-black',
    name: 'Bethpage Black Course',
    address: 'Farmingdale, NY 11735',
    type: 'club',
  },
  {
    id: 'whistling-straits',
    name: 'Whistling Straits',
    address: 'Sheboygan, WI 53081',
    type: 'club',
  },
  {
    id: 'bandon-dunes',
    name: 'Bandon Dunes Golf Resort',
    address: 'Bandon, OR 97411',
    type: 'resort',
  },
  {
    id: 'oakmont',
    name: 'Oakmont Country Club',
    address: 'Oakmont, PA 15139',
    type: 'club',
  },
  {
    id: 'shinnecock-hills',
    name: 'Shinnecock Hills Golf Club',
    address: 'Southampton, NY 11968',
    type: 'club',
  },

  // Golf Resorts - International
  {
    id: 'st-andrews',
    name: 'St Andrews Links',
    address: 'St Andrews, Scotland KY16 9SF',
    type: 'club',
  },
  {
    id: 'royal-county-down',
    name: 'Royal County Down',
    address: 'Newcastle, Northern Ireland BT33 0AN',
    type: 'club',
  },
  {
    id: 'turnberry',
    name: 'Trump Turnberry',
    address: 'Turnberry, Scotland KA26 9LT',
    type: 'resort',
  },
  {
    id: 'valderrama',
    name: 'Valderrama Golf Club',
    address: 'Sotogrande, Spain 11310',
    type: 'club',
  },
  {
    id: 'casa-de-campo',
    name: 'Casa de Campo Resort',
    address: 'La Romana, Dominican Republic',
    type: 'resort',
  },
  {
    id: 'cabo-del-sol',
    name: 'Cabo del Sol Golf Club',
    address: 'Cabo San Lucas, Mexico 23410',
    type: 'club',
  },

  // Major Airports
  {
    id: 'jfk-airport',
    name: 'JFK International Airport',
    address: 'Queens, NY 11430',
    type: 'airport',
  },
  {
    id: 'lax-airport',
    name: 'Los Angeles International Airport',
    address: 'Los Angeles, CA 90045',
    type: 'airport',
  },
  {
    id: 'miami-airport',
    name: 'Miami International Airport',
    address: 'Miami, FL 33142',
    type: 'airport',
  },
  {
    id: 'orlando-airport',
    name: 'Orlando International Airport',
    address: 'Orlando, FL 32827',
    type: 'airport',
  },
  {
    id: 'phoenix-airport',
    name: 'Phoenix Sky Harbor Airport',
    address: 'Phoenix, AZ 85034',
    type: 'airport',
  },
  {
    id: 'scottsdale-airport',
    name: 'Scottsdale Airport',
    address: 'Scottsdale, AZ 85258',
    type: 'airport',
  },

  // Popular Golf Cities
  {
    id: 'scottsdale-az',
    name: 'Scottsdale',
    address: 'Scottsdale, Arizona',
    type: 'city',
  },
  {
    id: 'palm-springs',
    name: 'Palm Springs',
    address: 'Palm Springs, California',
    type: 'city',
  },
  {
    id: 'myrtle-beach',
    name: 'Myrtle Beach',
    address: 'Myrtle Beach, South Carolina',
    type: 'city',
  },
  {
    id: 'naples-fl',
    name: 'Naples',
    address: 'Naples, Florida',
    type: 'city',
  },
  {
    id: 'hilton-head',
    name: 'Hilton Head Island',
    address: 'Hilton Head, South Carolina',
    type: 'city',
  },
];
