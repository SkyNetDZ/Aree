export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'aree-meter',
        data: {
          menu: {
            title: 'Meters',
            icon: 'ion-gear-a',
            selected: true,
            expanded: true,
            order: 250,
          }
        },
        children: [
          {
            path: 'aree-meters',
            data: {
              menu: {
                title: 'Meters',
                selected: true,
              }
            }
          },
          {
            path: 'app-location',
            data: {
              menu: {
                title: 'Locations',
                selected: false,
                expanded: false,
                order: 250,
              }
            }
          },
          {
            path: 'app-group',
            data: {
              menu: {
                title: 'Groups',
                selected: false,
                expanded: false,
                order: 250,
              }
            }
          }
        ]
      }
    ]
  }
];
