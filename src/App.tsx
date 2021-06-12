import React from 'react';
import triangle from './triangle.svg';
import './App.css';

const vardef = [
    {key: 'a', color: 'black'},
    {key: 'b', color: 'magenta'},
    {key: 'c', color: 'green'},
    {key: 'alpha', color: 'blue', label: <label htmlFor="alpha">&alpha;: </label>, editable: false},
];

interface TriangleData {
    vals: {[k: string]: number}; // current values
    userValsGen: string[]; // keys of values entered by user
}
function change(ctx: TriangleData, key: string, value: string) {
    // only take last two values and reset all others
    let userValsGen = ctx.userValsGen.filter(v => v !== key);
    userValsGen.push(key)
    userValsGen = userValsGen.slice(-2)
    let vals = {}
    for (let k of userValsGen) {
        vals[k] = ctx.vals[k];
    }
    vals[key] = value;
    vals = calcTriangle(vals);
    return {userValsGen, vals}
}

function calcTriangle(vals: any) {
    let {a,b,c,alpha} = vals;
    if (a && c) {
        b = Math.sqrt(c*c - a*a)
    }
    if (b && c) {
        a = Math.sqrt(c*c - b*b)
    }
    if (a && b) {
        c = Math.sqrt(a*a + b*b)
    }

    alpha = Math.asin(b/c) * 180 / Math.PI;
    return {a, b, c, alpha};
}


function getFormValue(ctx: TriangleData, key: string) {
  const {vals, userValsGen} = ctx;
  const editingNow = userValsGen[userValsGen.length - 1] === key;
  if (editingNow) {
      // return value as is to avoid focus issues
      return vals[key] || '';
  } else {
      return parseFloat(vals[key] as any).toFixed(2) as any || ''
  }
}

function App() {
  const [ctx, setCtx] = React.useState({vals: {}, userValsGen: []} as TriangleData);
  const {vals} = ctx;

  return (
    <div className="App">
        <img src={triangle} alt="triangle"/>

      <form>
      {vardef.map((v)=> (
          <div key={v.key} className="form-value" style={{color: v.color}}>
              {v.label || <label htmlFor="alpha">{v.key}: </label> }
              <input type="number"
                  value={getFormValue(ctx, v.key)}
                  placeholder="?"
                  readOnly={v.editable === false}
                  style={{color: v.color}}
                  onChange={(t)=> setCtx(change(ctx, v.key, t.target.value))}
              />
          </div>
      ))
      }
      </form>
    </div>
  );
}

export default App;
