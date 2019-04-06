const hoge = exp => {
  console.log("---exp---")
  console.log(exp)
  let buff = ""

  for(let i = 0; i < exp.length; i++) {
    if(isNaN(exp.charAt(i))) {
      if(exp.charAt(i) === '*') return generateMultiplyNode(Number(buff), exp.slice(i+1))
      if(exp.charAt(i) === '+') return generateNode(Number(buff), exp.slice(i+1));
      break ;
    } else {
      buff += exp.charAt(i)
    }
  }
}

const generateNode = (left, right) => {
  return ({
    type: "OPERATOR-ADD",
    left: {
      type: isNaN(left) ? 'string' : 'number',
      value: left
    },
    right: {
      type: isNaN(Number(right)) ? 'string' : 'number',
      value: isNaN(Number(right)) ? hoge(right) : Number(right)
    }
  })
}

const generateMultiplyNode = (left, right) => {
  return ({
    type: "OPERATOR-MULTIPLY",
    left: {
      type: isNaN(left) ? 'string' : 'number',
      value: left
    },
    right: {
      type: isNaN(Number(right)) ? 'string' : 'number',
      value: isNaN(Number(right)) ? hoge(right) : Number(right)
    }
  })
}

const calc = node => {
  console.log("---node---")
  console.log(node)
  if(node.left.type === 'number' && node.right.type === 'number') {
    if(node.type === 'OPERATOR-ADD') return node.left.value + node.right.value;
    if(node.type === 'OPERATOR-MULTIPLY') return node.left.value * node.right.value;
  } else {
    if(node.type === 'OPERATOR-ADD') return node.left.value + calc(node.right.value);
    if(node.type === 'OPERATOR-MULTIPLY') return node.left.value * calc(node.right.value);
  }
}

console.log("======")
console.log(hoge("1+2+4"))
console.log(calc(hoge("2*3+5")))