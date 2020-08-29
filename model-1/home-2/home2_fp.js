const fp = require('lodash/fp')

const cars = [
    { name: 'Ferrari FF', horsepower: 660, dollar_value:700000, in_stock: true },
    { name: 'Spyker c12 Zagato', horsepower: 650, dollar_value:648000, in_stock: false },
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value:132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value:114200, in_stock: false },
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value:1850000, in_stock: true },
    { name: 'pagani Huayra', horsepower: 700, dollar_value:1300000, in_stock: false }
]
let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)

console.log('练习1', isLastInStock(cars))

let isFirstCarName = fp.flowRight(fp.prop('name'), fp.first)

console.log('练习2', isFirstCarName(cars))

let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}

let averageDollarValue = fp.flowRight( _average, fp.map((cars)=> cars.dollar_value))

console.log('练习3', averageDollarValue(cars))

let _underscore = fp.replace(/\W+/g, '_')

let sanitizeNames = fp.flowRight(_underscore, fp.lowerCase)

console.log('练习4', sanitizeNames('pagani Huayra'))

let underNameList = fp.map( fp.flowRight(_underscore , fp.lowerCase , v=> v.name) )
let index = 0
let underName = fp.map((v)=>{
    cars[index++]['name'] = v
})
console.log('练习4+', underName(underNameList(cars)))
console.log(cars)