const natural = require('natural')
const fs = require('fs')
const classifier = new natural.LogisticRegressionClassifier()

fs.readFile('training_data.json', 'utf-8', function (err, data) {
  if (err) throw new Error(err)
  else {
    const trainingData = JSON.parse(data)
    train(trainingData)
  }
})

function train (trainingData) {
  console.log('Training')
  trainingData.forEach(function (item) {
    classifier.addDocument(item.text, item.label)
  })
  const startTime = new Date()
  classifier.train()
  const endTime = new Date()
  const trainingTime = (endTime - startTime) / 1000.0
  console.log('Training time:', trainingTime, 'seconds')
  loadTestData()
}

function loadTestData () {
  console.log('Loading test data')
  fs.readFile('test_data.json', 'utf-8', function (err, data) {
    if (err) throw new Error(err)
    else {
      const testData = JSON.parse(data)
      testClassifier(testData)
    }
  })
}

function testClassifier (testData) {
  console.log('Testing classifier')
  let numCorrect = 0
  testData.forEach(function (item) {
    const labelGuess = classifier.classify(item.text)
    if (labelGuess === item.label) numCorrect++
  })
  console.log('Correct %:', numCorrect / testData.length)
}
