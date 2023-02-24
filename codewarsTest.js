let numbers = [65, 55, 55, 5, 66, 45] 
let target = 100
function twoSum(numbers, target) {
  let newArray = []
  for (i in numbers) {
    if (newArray.length == 2) break
    for (j in numbers) {
      if (numbers[i] + numbers[j] == target) {
        newArray.push(Number(i))
        newArray.push(Number(j))
        break
      }
    }
  }
  return newArray
}

console.log(twoSum(numbers, target))