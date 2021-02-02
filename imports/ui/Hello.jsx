import React, { useState } from 'react';

export const Hello = () => {

    const[counter, setCounter] = useState(Math.floor(Date.now() / 1000 ));

    setInterval(() => {
      setCounter(Math.floor(Date.now() / 1000 ));
      console.log(counter);
    }, 1000);

    return (
        <div>
          <p>Current Unix Time: {counter} </p>
        </div>
    );
};
