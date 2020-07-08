import React from 'react'
import ReactDOM from 'react-dom'

const ROFL = '🤣'
const LIMIT = 280

const bs = (factor = 1) => `${factor}rem`

// http://girfahelp.blogspot.com/2019/06/copy-current-url-to-clipboard-using.html
function copyValueToClipboard(value) {
  if (typeof value !== 'string') {
    return
  }

  const dummy = document.createElement('input')
  document.body.appendChild(dummy)
  dummy.value = value
  dummy.select()
  document.execCommand('copy')
  document.body.removeChild(dummy)
}

function App() {
  const [text, setState] = React.useState('')
  const [maxLol, setMaxLol] = React.useState(false)
  const [toasts, setToasts] = React.useState([])

  const addToast = () => {
    setToasts(s => [...s, Date.now()])
    setTimeout(() => {
      setToasts(([_, ...rest]) => [...rest])
    }, 2000)
  }

  let result = text

  if (maxLol) {
    result = result.replace(/\s/g, ROFL)
  }

  const remaining = LIMIT - result.length
  result = result.padEnd(result.length % 2 ? LIMIT - 1 : LIMIT, ROFL)

  const handleChange = e => {
    setState(e.target.value)
  }

  const handleCopy = () => {
    addToast()
    copyValueToClipboard(result)
  }

  const toggleMaxLol = () => {
    setMaxLol(s => !s)
  }

  return (
    <div
      style={{
        display: 'grid',
        gridGap: bs(2),
        padding: bs(2),
        maxWidth: '45rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <header style={{ textAlign: 'center' }}>
        <h1>Maximum LOLs</h1>
        <p>Make sure that everyone knows you're joking!*</p>
      </header>
      <div>
        <label
          htmlFor="joke"
          style={{ display: 'block', marginBottom: bs(0.5) }}
        >
          Your joke:
        </label>
        <textarea
          id="joke"
          onChange={handleChange}
          rows={6}
          style={{
            display: 'block',
            fontFamily: 'sans-serif',
            fontSize: '1rem',
            marginBottom: bs(0.5),
            padding: bs(0.5),
            width: '100%',
          }}
          value={text}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <div>Remaining: {remaining}</div>
          <div>
            <label htmlFor="maxLol">Maximize {ROFL}?</label>
            <input
              id="maxLol"
              checked={maxLol}
              onChange={toggleMaxLol}
              type="checkbox"
              value={maxLol}
            />
          </div>
        </div>
      </div>
      <div>
        <div style={{ marginBottom: bs(0.5) }}>Result</div>
        <div
          style={{
            backgroundColor: '#f1f1f1',
            borderRadius: 4,
            padding: bs(0.5),
            marginBottom: bs(0.5),
            wordBreak: 'break-word',
          }}
        >
          {result}
        </div>
        <button
          onClick={handleCopy}
          style={{ padding: `${bs(0.5)} ${bs()}` }}
          type="button"
        >
          Copy Result
        </button>
      </div>
      <footer style={{ textAlign: 'center' }}>
        <p style={{ fontSize: bs(0.75) }}>
          *Does not ensure your joke is <em>actually</em> funny.
        </p>
        <p>
          Made with {ROFL} by{' '}
          <a href="https://twitter.com/kyleshevlin">Kyle Shevlin</a>
        </p>
      </footer>
      <div
        style={{ position: 'absolute', bottom: bs(), right: bs(), zIndex: 1 }}
      >
        {toasts.map(toast => (
          <div
            key={toast}
            style={{
              backgroundColor: '#10D14D',
              borderRadius: 4,
              color: '#fff',
              padding: bs(),
              marginTop: bs(0.25),
            }}
          >
            Copied!
          </div>
        ))}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
