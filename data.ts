import { Chapter } from './types';

export const textbookData: Chapter[] = [
  {
    id: 'chuong-1',
    title: 'Chương 1: Số hữu tỉ',
    description: 'Tìm hiểu về tập hợp các số hữu tỉ, các phép tính cộng, trừ, nhân, chia, luỹ thừa và quy tắc dấu ngoặc.',
    lessons: [
      {
        id: 'bai-1',
        title: 'Bài 1: Tập hợp các số hữu tỉ',
        theory: [
          {
            title: '1. Định nghĩa Số hữu tỉ',
            type: 'definition',
            content: [
              'Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\neq 0$.',
              'Tập hợp các số hữu tỉ được kí hiệu là $\\mathbb{Q}$.'
            ]
          },
          {
            title: 'Ví dụ minh họa',
            type: 'example',
            content: [
              'Số $-7$ là số hữu tỉ vì $-7 = \\frac{-7}{1}$.',
              'Số $0,5$ là số hữu tỉ vì $0,5 = \\frac{1}{2}$.',
              'Hỗn số $1\\frac{2}{3}$ là số hữu tỉ vì $1\\frac{2}{3} = \\frac{5}{3}$.',
              'Số $0$ là số hữu tỉ vì $0 = \\frac{0}{1} = \\frac{0}{2} = ...$'
            ]
          },
          {
            title: '2. Thứ tự trong tập hợp số hữu tỉ',
            type: 'theorem',
            content: [
              'Với hai số hữu tỉ bất kì $x, y$ ta luôn có: hoặc $x = y$, hoặc $x < y$, hoặc $x > y$.',
              'Nếu $x < y$ và $y < z$ thì $x < z$ (tính chất bắc cầu).'
            ]
          },
          {
            title: 'Phân loại số hữu tỉ',
            type: 'note',
            content: [
              'Số hữu tỉ lớn hơn $0$ gọi là **số hữu tỉ dương**.',
              'Số hữu tỉ nhỏ hơn $0$ gọi là **số hữu tỉ âm**.',
              'Số $0$ không là số hữu tỉ dương cũng không là số hữu tỉ âm.'
            ]
          }
        ],
        exercises: [
          {
            id: 'ex-1-nb',
            level: 'Nhận biết',
            question: 'Thay $?$ bằng kí hiệu $\\in$ hoặc $\\notin$ thích hợp: $-7 \\, ? \\, \\mathbb{N}$; $-17 \\, ? \\, \\mathbb{Z}$; $-38 \\, ? \\, \\mathbb{Q}$',
            solution: '$-7 \\notin \\mathbb{N}$; $-17 \\in \\mathbb{Z}$; $-38 \\in \\mathbb{Q}$.'
          },
          {
            id: 'ex-1-vd',
            level: 'Vận dụng',
            question: 'Sắp xếp các số hữu tỉ sau theo thứ tự tăng dần: $\\frac{-5}{9}; \\frac{4}{3}; -0,7; 0$.',
            solution: '$-0,7 < \\frac{-5}{9} < 0 < \\frac{4}{3}$.'
          }
        ],
        quizzes: [
          {
            id: 'quiz-1-1',
            question: 'Số nào sau đây **không** phải là số hữu tỉ?',
            options: [
              { id: 'a', text: '$\\frac{-3}{5}$', isCorrect: false },
              { id: 'b', text: '$0,25$', isCorrect: false },
              { id: 'c', text: '$\\frac{3}{0}$', isCorrect: true },
              { id: 'd', text: '$2\\frac{1}{3}$', isCorrect: false }
            ],
            explanation: 'Phân số $\\frac{a}{b}$ phải có mẫu $b \\neq 0$. Do đó $\\frac{3}{0}$ không xác định và không phải số hữu tỉ.'
          },
          {
            id: 'quiz-1-2',
            question: 'Số đối của $\\frac{-2}{3}$ là số nào?',
            options: [
              { id: 'a', text: '$\\frac{2}{3}$', isCorrect: true },
              { id: 'b', text: '$\\frac{-3}{2}$', isCorrect: false },
              { id: 'c', text: '$\\frac{2}{-3}$', isCorrect: false },
              { id: 'd', text: '$0$', isCorrect: false }
            ],
            explanation: 'Số đối của số âm là số dương tương ứng. $-(\\frac{-2}{3}) = \\frac{2}{3}$.'
          },
          {
            id: 'quiz-1-3',
            question: 'Khẳng định nào sau đây là **sai**?',
            options: [
              { id: 'a', text: '$\\mathbb{N} \\subset \\mathbb{Z}$', isCorrect: false },
              { id: 'b', text: '$\\mathbb{Z} \\subset \\mathbb{Q}$', isCorrect: false },
              { id: 'c', text: '$\\mathbb{Q} \\subset \\mathbb{Z}$', isCorrect: true },
              { id: 'd', text: '$\\mathbb{N} \\subset \\mathbb{Q}$', isCorrect: false }
            ],
            explanation: 'Tập số nguyên $\\mathbb{Z}$ là tập con của số hữu tỉ $\\mathbb{Q}$, nên khẳng định $\\mathbb{Q} \\subset \\mathbb{Z}$ là sai.'
          }
        ]
      },
      {
        id: 'bai-2',
        title: 'Bài 2: Các phép tính với số hữu tỉ',
        theory: [
          {
            title: '1. Cộng, trừ hai số hữu tỉ',
            type: 'theorem',
            content: [
              'Để cộng, trừ hai số hữu tỉ, ta viết chúng dưới dạng phân số cùng mẫu dương rồi thực hiện phép tính.',
              '$x = \\frac{a}{m}, y = \\frac{b}{m} \\Rightarrow x + y = \\frac{a+b}{m}$.'
            ]
          },
          {
            title: '2. Nhân, chia hai số hữu tỉ',
            type: 'theorem',
            content: [
              '$x \\cdot y = \\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$.',
              '$x : y = \\frac{a}{b} \\cdot \\frac{d}{c} = \\frac{a \\cdot d}{b \\cdot c}$ ($y \\neq 0$).'
            ]
          }
        ],
        exercises: [
          {
            id: 'ex-b2-nb',
            level: 'Nhận biết',
            question: 'Tính: $\\frac{2}{3} + \\frac{1}{3}$',
            solution: '$1$.'
          }
        ],
        quizzes: [
           {
            id: 'quiz-2-1',
            question: 'Kết quả của phép tính $\\frac{-1}{2} + \\frac{1}{3}$ là:',
            options: [
              { id: 'a', text: '$\\frac{1}{6}$', isCorrect: false },
              { id: 'b', text: '$\\frac{-1}{6}$', isCorrect: true },
              { id: 'c', text: '$\\frac{-2}{5}$', isCorrect: false },
              { id: 'd', text: '$\\frac{5}{6}$', isCorrect: false }
            ],
            explanation: '$\\frac{-1}{2} + \\frac{1}{3} = \\frac{-3}{6} + \\frac{2}{6} = \\frac{-1}{6}$.'
          },
          {
             id: 'quiz-2-2',
             question: 'Tìm $x$ biết $x : \\frac{2}{3} = \\frac{-3}{4}$',
             options: [
               { id: 'a', text: '$\\frac{-1}{2}$', isCorrect: true },
               { id: 'b', text: '$\\frac{-9}{8}$', isCorrect: false },
               { id: 'c', text: '$\\frac{-8}{9}$', isCorrect: false },
               { id: 'd', text: '$\\frac{1}{2}$', isCorrect: false }
             ],
             explanation: '$x = \\frac{-3}{4} \\cdot \\frac{2}{3} = \\frac{-6}{12} = \\frac{-1}{2}$.'
          }
        ]
      },
      {
        id: 'bai-3',
        title: 'Bài 3: Luỹ thừa của một số hữu tỉ',
        theory: [
           {
             title: 'Định nghĩa',
             type: 'definition',
             content: ['Luỹ thừa bậc $n$ của số hữu tỉ $x$: $x^n = x \\cdot x \\cdot ... \\cdot x$ ($n$ thừa số).']
           }
        ],
        exercises: [],
        quizzes: [
          {
            id: 'quiz-3-1',
            question: 'Giá trị của $(\\frac{-1}{2})^3$ là:',
            options: [
              { id: 'a', text: '$\\frac{1}{8}$', isCorrect: false },
              { id: 'b', text: '$\\frac{-1}{8}$', isCorrect: true },
              { id: 'c', text: '$\\frac{-3}{2}$', isCorrect: false },
              { id: 'd', text: '$\\frac{-1}{6}$', isCorrect: false }
            ],
            explanation: 'Mũ lẻ của số âm sẽ ra số âm: $\\frac{(-1)^3}{2^3} = \\frac{-1}{8}$.'
          },
          {
            id: 'quiz-3-2',
            question: 'Kết quả của $2^3 \\cdot 2^2$ là:',
            options: [
              { id: 'a', text: '$2^6$', isCorrect: false },
              { id: 'b', text: '$2^5$', isCorrect: true },
              { id: 'c', text: '$4^5$', isCorrect: false },
              { id: 'd', text: '$4^6$', isCorrect: false }
            ],
            explanation: 'Nhân hai luỹ thừa cùng cơ số: giữ nguyên cơ số, cộng số mũ.'
          }
        ]
      },
      {
        id: 'bai-4',
        title: 'Bài 4: Quy tắc dấu ngoặc và chuyển vế',
        theory: [],
        exercises: [],
        quizzes: [
          {
            id: 'quiz-4-1',
            question: 'Khi chuyển vế một số hạng từ vế này sang vế kia của đẳng thức, ta phải:',
            options: [
               { id: 'a', text: 'Giữ nguyên dấu', isCorrect: false },
               { id: 'b', text: 'Nhân với -1', isCorrect: false },
               { id: 'c', text: 'Đổi dấu số hạng đó', isCorrect: true },
               { id: 'd', text: 'Nghịch đảo số hạng đó', isCorrect: false }
            ]
          },
           {
            id: 'quiz-4-2',
            question: 'Kết quả của phép tính $5 - (2 - 3)$ là:',
            options: [
               { id: 'a', text: '$0$', isCorrect: false },
               { id: 'b', text: '$6$', isCorrect: true },
               { id: 'c', text: '$4$', isCorrect: false },
               { id: 'd', text: '$-6$', isCorrect: false }
            ],
            explanation: '$5 - (2 - 3) = 5 - (-1) = 5 + 1 = 6$.'
          }
        ]
      }
    ]
  },
  {
    id: 'chuong-2',
    title: 'Chương 2: Số thực',
    description: 'Số vô tỉ, căn bậc hai số học và số thực.',
    lessons: [
       {
         id: 'bai-1-c2',
         title: 'Bài 1: Số vô tỉ. Căn bậc hai số học',
         theory: [],
         exercises: [],
         quizzes: [
           {
             id: 'quiz-c2-1-1',
             question: 'Số nào là số vô tỉ?',
             options: [
               { id: 'a', text: '$\\sqrt{4}$', isCorrect: false },
               { id: 'b', text: '$\\sqrt{2}$', isCorrect: true },
               { id: 'c', text: '$0,(3)$', isCorrect: false },
               { id: 'd', text: '$\\frac{22}{7}$', isCorrect: false }
             ]
           },
           {
             id: 'quiz-c2-1-2',
             question: 'Căn bậc hai số học của 81 là:',
             options: [
               { id: 'a', text: '$9$', isCorrect: true },
               { id: 'b', text: '$-9$', isCorrect: false },
               { id: 'c', text: '$\\pm 9$', isCorrect: false },
               { id: 'd', text: '$81^2$', isCorrect: false }
             ]
           }
         ]
       }
    ]
  }
];