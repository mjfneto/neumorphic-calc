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
      <button id="parentheses-btn" type="button" class="btn" data-type="parentheses" data-term="()">()</button>
      <button id="percentage-btn" type="button" class="btn" data-type="operator" data-term="%">%</button>
      <button id="division-btn" type="button" class="btn" data-type="operator" data-term="/">/</button>
      
      <button id="seven-btn" type="button" class="btn" data-type="number" data-term="7">7</button>
      <button id="eight-btn" type="button" class="btn" data-type="number" data-term="8">8</button>
      <button id="nine-btn" type="button" class="btn" data-type="number" data-term="9">9</button>
      <button id="multiplication-btn" type="button" class="btn" data-type="operator" data-term="*">*</button>
      
      <button id="four-btn" type="button" class="btn" data-type="number" data-term="4">4</button>
      <button id="five-btn" type="button" class="btn" data-type="number" data-term="5">5</button>
      <button id="six-btn" type="button" class="btn" data-type="number" data-term="6">6</button>
      <button id="minus-btn" type="button" class="btn" data-type="operator" data-term="-">-</button>
      
      <button id="one-btn" type="button" class="btn" data-type="number" data-term="1">1</button>
      <button id="two-btn" type="button" class="btn" data-type="number" data-term="2">2</button>
      <button id="three-btn" type="button" class="btn" data-type="number" data-term="3">3</button>
      <button id="addition-btn" type="button" class="btn" data-type="operator" data-term="+">+</button>
      
      <button id="zero-btn" type="button" class="btn" data-type="number" data-term="0">0</button>
      <button id="dot-btn" type="button" class="btn" data-type="decimal" data-term=".">.</button>
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

  const type = eventTarget.dataset.type
  const term = eventTarget.dataset.term

  if (term) {
    if (type === 'number' || type === 'operator' || type === 'decimal') {
      calculator.appendTerm(term)
    }
  }

  if (type === 'parentheses') {
    calculator.appendParenthesis()
  }

  if (type === 'allClear') {
    calculator.clear()
  }

  if (type === 'backspace') {
    calculator.delete()
  }

  if (type === 'equals') {
    calculator.equals()
  }
})

function updateDisplay(val1: string, val2: string) {
  expression.textContent = val1
  result.textContent = val2
}
