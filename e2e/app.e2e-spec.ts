import { LivescorePage } from './app.po';

describe('Livescore:', () => {
  let page: LivescorePage;

  // Change to today's events on main livescore page
  let todaysEvents = [
    {home: 'Liverpool', away: 'Stoke City'},
    {home: 'Crystal Palace', away: 'Leicester City'},
    {home: 'Aston Villa', away: 'Derby County'},
    {home: 'Barnsley', away: 'Brentford'},
    {home: 'Burton Albion', away: 'Bolton Wanderers'},
    {home: 'Hull City', away: 'Cardiff City'},
    {home: 'Norwich City', away: 'Leeds United'},
    {home: 'Nottingham Forest', away: 'Bristol City'},
    {home: 'Queens Park Rangers', away: 'Birmingham City'}
  ];

  beforeEach(() => {
    page = new LivescorePage();
  });

  it('Should find events', () => {
    page.navigateTo();
    page.findEvents(todaysEvents).then((events) => {
      page.foundEvents(events);
      expect(events[0]).toEqual(todaysEvents[0]);
    });
  });
});