const compose = (...funcs) => (comp) => {
  return funcs.reduceRight(
    (prevResult, func) => func(prevResult), comp);
}

export default compose;