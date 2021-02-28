export const nameof = <T extends {}>(name: keyof T) => name;
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
