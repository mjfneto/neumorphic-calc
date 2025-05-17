export class Calculator {
  private expression: string
  private result: string

  private updateDisplayHTML: (val1: string, val2: string) => void

  constructor(updateDisplay: (val1: string, val2: string) => void) {
    this.expression = ''
    this.result = ''
    this.updateDisplayHTML = updateDisplay
  }

  public appendTerm(term: string) {
    switch (term) {
      case '()':
        break
      case '%':
        break
      case '÷':
        this.expression += '/'
        break
      case '×':
        this.expression += '*'
        break
      case '−':
        this.expression += '-'
        break
      case '+':
        this.expression += '+'
        break
      default:
        this.expression += term
    }

    this.updateDisplay()
  }

  public clear() {
    this.expression = ''
    this.result = ''

    this.updateDisplay()
  }

  public delete() {
    this.expression = this.expression.slice(0, -1)

    this.updateDisplay()
  }

  updateDisplay() {
    this.updateDisplayHTML(this.expression, this.result)
  }
}
