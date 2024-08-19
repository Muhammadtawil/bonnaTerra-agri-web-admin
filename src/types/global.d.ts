interface Window {
  jQuery: any;
  Zepto: any;
  device: {
    desktop: () => boolean;
    tablet: () => boolean;
    mobile: () => boolean;
    // Add more methods as needed
  };
}

declare module 'device.js' {
  const device: {
    desktop: () => boolean;
    tablet: () => boolean;
    mobile: () => boolean;
    // Add more methods as needed
  };

  export = device;
}
