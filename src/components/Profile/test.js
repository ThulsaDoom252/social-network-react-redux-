const arr = [{value: "val", icon: "icon"}, {value: "val2", icon: "icon2"}, {value: "val3", icon: "icon3"}]

const arr2 = arr.map(val => [val.value, val.icon])

console.log(arr2);