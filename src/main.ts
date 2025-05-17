import { Calculator } from './Calculator'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="calculator">
    <div id="display">
      <div id="expression"></div>
      <div id="result"></div>
    </div>
    <div id="keyboard">
      <button id="ac-btn" type="button" class="btn" data-type="allClear">AC</button>
      <button id="parentheses-btn" type="button" class="btn" data-type="parentheses">()</button>
      <button id="percentage-btn" type="button" class="btn" data-type="operator">%</button>
      <button id="division-btn" type="button" class="btn" data-type="operator">÷</button>
      
      <button id="seven-btn" type="button" class="btn" data-type="number">7</button>
      <button id="eight-btn" type="button" class="btn" data-type="number">8</button>
      <button id="nine-btn" type="button" class="btn" data-type="number">9</button>
      <button id="multiplication-btn" type="button" class="btn" data-type="operator">×</button>
      
      <button id="four-btn" type="button" class="btn" data-type="number">4</button>
      <button id="five-btn" type="button" class="btn" data-type="number">5</button>
      <button id="six-btn" type="button" class="btn" data-type="number">6</button>
      <button id="minus-btn" type="button" class="btn" data-type="operator">−</button>
      
      <button id="one-btn" type="button" class="btn" data-type="number">1</button>
      <button id="two-btn" type="button" class="btn" data-type="number">2</button>
      <button id="three-btn" type="button" class="btn" data-type="number">3</button>
      <button id="addition-btn" type="button" class="btn" data-type="operator">+</button>
      
      <button id="zero-btn" type="button" class="btn" data-type="number">0</button>
      <button id="dot-btn" type="button" class="btn" data-type="decimal">.</button>
      <button id="backspace-btn" type="button" class="btn" data-type="backspace"><</button>
      <button id="eq-btn" type="button" class="btn" data-type="equals">=</button>
    </div>
  </div>
`

const display = document.querySelector('#display')!
let expression = display.querySelector('#expression')!
let result = display.querySelector('#result')!
let keyboard = document.querySelector('#keyboard')!

const calculator = new Calculator(updateDisplay)

keyboard.addEventListener('click', function (event: Event) {
  const eventTarget = event.target as HTMLButtonElement

  if (eventTarget.tagName !== 'BUTTON') return

  const textContent = eventTarget.textContent
  const type = eventTarget.dataset.type

  if (textContent) {
    if (
      type === 'number' ||
      type === 'operator' ||
      type === 'parentheses' ||
      type === 'decimal'
    ) {
      calculator.appendTerm(textContent)
    }

    if (type === 'allClear') {
      calculator.clear()
    }

    if (type === 'backspace') {
      calculator.delete()
    }
  }
})

function updateDisplay(val1: string, val2: string) {
  expression.textContent = val1
  result.textContent = val2
}
