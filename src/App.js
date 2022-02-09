import { useMemo } from 'react';
import range from 'lodash/range';
import { lottery } from './utils';

import './App.css';

function Box({ hsl: { h, s, l }, className }) {

  return (
    <div className={`box ${className}`} style={ { background: `hsl(${h}, ${s}%, ${l}%)` } }></div>
  );
};

function scale(from, to, parts) {
  const diff = Math.floor((to - from) / parts);
  const container = [];
  for (let i = from; parts > 0; i = i + diff) {
    container.push(i);
    parts--;
  }
  return container;
}

function shuffle(values, partX, partY) {
  const indices = lottery(partX*partY, partX * partY).map(i => i -1);
  console.log('indices', indices)
  return values.map((value, index) =>
    values[indices[index]]);
}

function App() { //358 -> 217
const hueFrom = 358; // selymes szantal
const hueTo = 217;  // fap azure
const partX = 4;
const partY = 6;
const lightFrom = 50;
const lightTo = 90;
const sat = 50;


const hues = scale(hueFrom, hueTo, partX);
const lights = scale(lightFrom, lightTo, partY);

const boxes = lights.reduce((acc, light) => {
  hues.forEach(hue => acc.push([light, hue]));
  return acc;
}, []);

const shuffled = useMemo(() => shuffle(boxes, partX, partY), [])
console.log(shuffled)
  return (
    <div>
      {/* <div className="palette default">
        {
          hues.map((hue) => (
            <div className='boxLine'>
              { lights.map((light) => {
                return (
                  <Box hsl={{
                    h: hue,
                    s: sat,
                    l: light
                  }} />
                )
              }
              )}
            </div>
          ))
        }
      </div> */}
      <div className="palette shuffled">
        {
          range(0, partX).map((row) => (
            <div className='boxLine'>
              { range(0, partY).map((column) => {
                const [light, hue] = shuffled[row * partY + column];
                return (
                  <Box hsl={{
                    h: hue,
                    s: sat,
                    l: light
                  }} />

                )
              }
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
