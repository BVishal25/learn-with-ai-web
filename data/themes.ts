export interface Theme {
  name: string;
  colors: {
    '--color-primary': string;
    '--color-secondary': string;
    '--color-accent': string;
    '--color-light': string;
    '--color-muted': string;
  };
}

export const THEMES: Theme[] = [
  {
    name: 'Matte Green',
    colors: {
      '--color-primary': '17, 34, 28',    // #11221C
      '--color-secondary': '26, 51, 42',   // #1A332A
      '--color-accent': '110, 231, 183', // #6EE7B7
      '--color-light': '209, 250, 229', // #D1FAE5
      '--color-muted': '163, 179, 173'  // #A3B3AD
    }
  },
  {
    name: 'Deep Space',
    colors: {
      '--color-primary': '17, 24, 39',      // gray-900
      '--color-secondary': '31, 41, 55',     // gray-800
      '--color-accent': '93, 188, 252',    // sky-400
      '--color-light': '229, 231, 235',   // gray-200
      '--color-muted': '107, 114, 128'    // gray-500
    }
  },
  {
    name: 'Dracula',
    colors: {
      '--color-primary': '40, 42, 54',    // bg
      '--color-secondary': '68, 71, 90',   // selection
      '--color-accent': '189, 147, 249', // purple
      '--color-light': '248, 248, 242', // fg
      '--color-muted': '157, 158, 166'  // comment
    }
  },
  {
    name: 'Rose Pine',
    colors: {
      '--color-primary': '25, 23, 36',     // base
      '--color-secondary': '31, 29, 46',    // surface
      '--color-accent': '235, 188, 188',   // rose
      '--color-light': '228, 225, 245',   // text
      '--color-muted': '112, 108, 142'     // muted
    }
  },
  {
    name: 'Daylight',
    colors: {
      '--color-primary': '249, 250, 251', // gray-50
      '--color-secondary': '255, 255, 255', // white
      '--color-accent': '37, 99, 235',    // blue-600
      '--color-light': '17, 24, 39',      // gray-900
      '--color-muted': '107, 114, 128'   // gray-500
    }
  },
  {
    name: 'System',
    colors: { // Placeholder for the UI preview swatch, App.tsx handles the logic
      '--color-primary': '17, 24, 39',
      '--color-secondary': '31, 41, 55',
      '--color-accent': '93, 188, 252',
      '--color-light': '229, 231, 235',
      '--color-muted': '107, 114, 128'
    }
  }
];