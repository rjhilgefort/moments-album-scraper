const Count = (initial = 0) => {
  const _val = initial
  return {
    _val,
    get value () {
      return this._val
    },
    reset () {
      this._val = 0
    },
    inc () {
      this._val += 1
    },
    dec () {
      this._val -= 1
    }
  }
}

export default Count
