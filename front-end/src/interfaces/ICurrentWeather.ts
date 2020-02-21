
export interface ICurrentWeather {
    coord: {
      lon: number;
      lat: number;
    };
    main: {
      temp: number;
  };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
  }