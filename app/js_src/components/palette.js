// vim: set ft=javascript.jsx:
import React from 'react'

class Palette extends React.Component {
  render() {
    return (<div className="palette">
      <table>
        <tbody>
          <tr>
            <td>Top</td><td><input type="range" /></td>
          </tr>
          <tr>
            <td>Left</td><td><input type="range" /></td>
          </tr>
          <tr>
            <td>Width</td><td><input type="range" /></td>
          </tr>
          <tr>
            <td>Height</td><td><input type="range" /></td>
          </tr>
          <tr>
            <td>Type</td>
            <td>
              <select>
                <option value="Text">Text</option>
                <option value="Overlay">Overlay</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
   );
  }
}

export default Palette
