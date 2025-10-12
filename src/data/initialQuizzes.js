export const initialQuizzes = [
  {
    id: '1',
    title: 'General Knowledge',
    category: 'General',
    difficulty: 'Easy',
    questions: [
      { id: 'q1', question: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], correctAnswer: 2, explanation: 'Paris has been the capital of France since 987 AD.' },
      { id: 'q2', question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1, explanation: 'Mars appears red due to iron oxide on its surface.' },
      { id: 'q3', question: 'Who painted the Mona Lisa?', options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'], correctAnswer: 2, explanation: 'Leonardo da Vinci painted the Mona Lisa between 1503-1519.' },
      { id: 'q4', question: 'What is the largest ocean on Earth?', options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], correctAnswer: 3, explanation: 'The Pacific Ocean covers about 46% of the water surface.' },
      { id: 'q5', question: 'How many continents are there?', options: ['5', '6', '7', '8'], correctAnswer: 2, explanation: 'There are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.' },
      { id: 'q6', question: 'What is the tallest mountain in the world?', options: ['K2', 'Mount Everest', 'Kilimanjaro', 'Denali'], correctAnswer: 1, explanation: 'Mount Everest stands at 8,849 meters above sea level.' },
      { id: 'q7', question: 'Which country is known as the Land of the Rising Sun?', options: ['China', 'South Korea', 'Japan', 'Thailand'], correctAnswer: 2, explanation: 'Japan is called the Land of the Rising Sun because of its location east of Asia.' },
      { id: 'q8', question: 'What is the smallest country in the world?', options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'], correctAnswer: 1, explanation: 'Vatican City has an area of only 0.44 square kilometers.' }
    ],
    timePerQuestion: 30,
    negativeMarking: false
  },
  {
    id: '2',
    title: 'Science Quiz',
    category: 'Science',
    difficulty: 'Medium',
    questions: [
      { id: 'q1', question: 'What is the chemical symbol for gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correctAnswer: 2, explanation: 'Au comes from the Latin word aurum meaning gold.' },
      { id: 'q2', question: 'How many bones are in the human body?', options: ['186', '206', '226', '246'], correctAnswer: 1, explanation: 'Adults have 206 bones, babies have around 270 which fuse over time.' },
      { id: 'q3', question: 'What is the speed of light?', options: ['299,792 km/s', '199,792 km/s', '399,792 km/s', '99,792 km/s'], correctAnswer: 0, explanation: 'Light travels at approximately 299,792 kilometers per second in vacuum.' },
      { id: 'q4', question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'], correctAnswer: 1, explanation: 'Mitochondria produce ATP, the energy currency of cells.' },
      { id: 'q5', question: 'What is the hardest natural substance?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], correctAnswer: 2, explanation: 'Diamond is the hardest known natural material.' },
      { id: 'q6', question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctAnswer: 2, explanation: 'Plants absorb CO2 during photosynthesis.' },
      { id: 'q7', question: 'How many planets are in our solar system?', options: ['7', '8', '9', '10'], correctAnswer: 1, explanation: 'There are 8 planets after Pluto was reclassified as a dwarf planet in 2006.' },
      { id: 'q8', question: 'What is the most abundant gas in Earth atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], correctAnswer: 2, explanation: 'Nitrogen makes up about 78% of the atmosphere.' }
    ],
    timePerQuestion: 25,
    negativeMarking: false
  },
  {
    id: '3',
    title: 'Data Structures & Algorithms',
    category: 'Programming',
    difficulty: 'Hard',
    questions: [
      { id: 'q1', question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n squared)', 'O(1)'], correctAnswer: 1, explanation: 'Binary search divides the search space in half each time.' },
      { id: 'q2', question: 'Which data structure uses LIFO principle?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correctAnswer: 1, explanation: 'Stack follows Last In First Out principle.' },
      { id: 'q3', question: 'What is the worst-case of Quick Sort?', options: ['O(n log n)', 'O(n)', 'O(n squared)', 'O(log n)'], correctAnswer: 2, explanation: 'Quick Sort worst case when pivot is always smallest or largest.' },
      { id: 'q4', question: 'Which traversal visits root node first?', options: ['Inorder', 'Preorder', 'Postorder', 'Level order'], correctAnswer: 1, explanation: 'Preorder traversal visits root, then left, then right subtree.' },
      { id: 'q5', question: 'What is the space complexity of merge sort?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctAnswer: 2, explanation: 'Merge sort requires O(n) extra space for merging.' },
      { id: 'q6', question: 'Which data structure is best for BFS?', options: ['Stack', 'Queue', 'Array', 'Tree'], correctAnswer: 1, explanation: 'Queue is used for breadth-first search traversal.' },
      { id: 'q7', question: 'What is average time for hash table lookup?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n squared)'], correctAnswer: 0, explanation: 'Hash tables provide O(1) average case lookup time.' },
      { id: 'q8', question: 'Which sorting is most efficient for small arrays?', options: ['Quick Sort', 'Merge Sort', 'Insertion Sort', 'Heap Sort'], correctAnswer: 2, explanation: 'Insertion sort has low overhead and works well for small datasets.' },
      { id: 'q9', question: 'What is time complexity of building a heap?', options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n squared)'], correctAnswer: 0, explanation: 'Building a heap from an array takes O(n) time.' },
      { id: 'q10', question: 'Which algorithm uses divide and conquer?', options: ['Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort'], correctAnswer: 2, explanation: 'Merge sort divides array into halves recursively.' }
    ],
    timePerQuestion: 45,
    negativeMarking: true
  },
  {
    id: '4',
    title: 'World History',
    category: 'History',
    difficulty: 'Medium',
    questions: [
      { id: 'q1', question: 'In which year did World War II end?', options: ['1943', '1944', '1945', '1946'], correctAnswer: 2, explanation: 'World War II ended in 1945 with the surrender of Japan.' },
      { id: 'q2', question: 'Who was the first President of the United States?', options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'], correctAnswer: 1, explanation: 'George Washington served as the first US President from 1789-1797.' },
      { id: 'q3', question: 'Which empire built the Colosseum?', options: ['Greek Empire', 'Roman Empire', 'Ottoman Empire', 'Byzantine Empire'], correctAnswer: 1, explanation: 'The Roman Empire built the Colosseum around 70-80 AD.' },
      { id: 'q4', question: 'Who discovered America in 1492?', options: ['Ferdinand Magellan', 'Vasco da Gama', 'Christopher Columbus', 'Marco Polo'], correctAnswer: 2, explanation: 'Christopher Columbus reached the Americas in 1492.' },
      { id: 'q5', question: 'Which civilization built Machu Picchu?', options: ['Aztec', 'Maya', 'Inca', 'Olmec'], correctAnswer: 2, explanation: 'The Inca civilization built Machu Picchu in the 15th century.' },
      { id: 'q6', question: 'When did the Berlin Wall fall?', options: ['1987', '1988', '1989', '1990'], correctAnswer: 2, explanation: 'The Berlin Wall fell on November 9, 1989.' }
    ],
    timePerQuestion: 35,
    negativeMarking: false
  },
  {
    id: '5',
    title: 'Mathematics Challenge',
    category: 'Math',
    difficulty: 'Hard',
    questions: [
      { id: 'q1', question: 'What is the value of Pi (rounded to 2 decimals)?', options: ['3.12', '3.14', '3.16', '3.18'], correctAnswer: 1, explanation: 'Pi is approximately 3.14159, rounded to 3.14.' },
      { id: 'q2', question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correctAnswer: 2, explanation: '12 × 12 = 144, so square root of 144 is 12.' },
      { id: 'q3', question: 'What is 15% of 200?', options: ['25', '30', '35', '40'], correctAnswer: 1, explanation: '15% of 200 = (15/100) × 200 = 30.' },
      { id: 'q4', question: 'What is the next prime number after 7?', options: ['8', '9', '10', '11'], correctAnswer: 3, explanation: '11 is prime (only divisible by 1 and itself).' },
      { id: 'q5', question: 'What is 2 to the power of 5?', options: ['16', '25', '32', '64'], correctAnswer: 2, explanation: '2^5 = 2 × 2 × 2 × 2 × 2 = 32.' },
      { id: 'q6', question: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], correctAnswer: 1, explanation: 'A hexagon is a polygon with 6 sides.' },
      { id: 'q7', question: 'What is the sum of angles in a triangle?', options: ['90 degrees', '180 degrees', '270 degrees', '360 degrees'], correctAnswer: 1, explanation: 'The sum of all angles in any triangle is always 180 degrees.' }
    ],
    timePerQuestion: 40,
    negativeMarking: true
  }
];