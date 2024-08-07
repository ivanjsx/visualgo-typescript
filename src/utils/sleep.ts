const sleep = (milliseconds: number) => new Promise<void>(
  (resolve) => {
    setTimeout(
      () => {
        resolve();
      }, 
      milliseconds
    );
  }
);  

export default sleep;
