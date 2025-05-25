import { evaluate } from 'mathjs'

export class Calculator {
  private displayValue: string
  private expression: string
  private lastExpression: string
  private result: string
  private openingParentheses: number
  private isValidExpression: boolean

  private updateDisplayHTML: (val1: string, val2: string) => void

  constructor(updateDisplay: (val1: string, val2: string) => void) {
    this.displayValue = ''
    this.expression = ''
    this.lastExpression = ''
    this.result = ''
    this.openingParentheses = 0
    this.isValidExpression = false
    this.updateDisplayHTML = updateDisplay
  }

  public appendTerm(term: string) {
    this.lastExpression = ''
    this.expression += term

    this.displayValue = this.expression
    this.compute()
    this.updateDisplay()
  }

  public compute() {
    try {
      this.result = evaluate(this.expression).toString()
      this.isValidExpression = true
    } catch (error) {
      console.log(error)
      this.isValidExpression = false
      this.result = ''
    }
  }

  public appendParenthesis() {
    const lastTerm = this.expression[this.expression.length - 1]
    const lastTermIsOP = lastTerm === '('

    if (this.openingParentheses > 0 && !lastTermIsOP) {
      this.expression += ')'
      this.openingParentheses -= 1

      this.displayValue = this.expression
      this.compute()
      this.updateDisplay()
      return
    }

    this.expression += '('
    this.openingParentheses += 1

    this.displayValue = this.expression
    this.compute()
    this.updateDisplay()
  }

  public appendDecimal() {
    this.expression += '.'

    this.displayValue = this.expression
    this.compute()
    this.updateDisplay()
  }

  public clear() {
    this.displayValue = ''
    this.expression = ''
    this.lastExpression = ''
    this.result = ''
    this.openingParentheses = 0
    this.isValidExpression = false

    this.updateDisplay()
  }

  public delete() {
    if (!this.expression) return

    this.expression = (
      this.lastExpression ? this.lastExpression : this.expression
    ).slice(0, -1)

    this.lastExpression = ''

    this.openingParentheses = Array.from(this.expression.matchAll(/\(/g)).length

    this.displayValue = this.expression

    if (this.expression) {
      this.compute()
      this.updateDisplay()
      return
    }

    this.result = ''
    this.updateDisplay()
  }

  public equals() {
    if (!this.isValidExpression) {
      this.result = 'Format error'

      this.updateDisplay()
      return
    }

    this.lastExpression = this.expression
    this.expression = this.result
    this.displayValue = this.result
    this.openingParentheses = 0

    this.updateDisplay()
  }

  private updateDisplay() {
    this.updateDisplayHTML(this.displayValue, this.result)
  }
}
