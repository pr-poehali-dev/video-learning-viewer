import { useState } from 'react';
import VideoLibrary from '@/components/VideoLibrary';
import VideoPlayer from '@/components/VideoPlayer';
import QuizView from '@/components/QuizView';
import QuizResults from '@/components/QuizResults';

interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  progress: number;
  thumbnail: string;
}

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

const videos: Video[] = [
  {
    id: 1,
    title: 'Введение в веб-разработку',
    description: 'Основы HTML, CSS и JavaScript для начинающих',
    duration: '45 мин',
    category: 'Веб-разработка',
    progress: 0,
    thumbnail: '🌐'
  },
  {
    id: 2,
    title: 'React для начинающих',
    description: 'Изучите основы React и создайте своё первое приложение',
    duration: '1 ч 20 мин',
    category: 'Веб-разработка',
    progress: 0,
    thumbnail: '⚛️'
  },
  {
    id: 3,
    title: 'Python: основы программирования',
    description: 'Начните путь в программировании с Python',
    duration: '1 ч',
    category: 'Программирование',
    progress: 0,
    thumbnail: '🐍'
  },
  {
    id: 4,
    title: 'Дизайн-мышление',
    description: 'Методология создания инновационных продуктов',
    duration: '50 мин',
    category: 'Дизайн',
    progress: 0,
    thumbnail: '🎨'
  },
  {
    id: 5,
    title: 'Основы TypeScript',
    description: 'Типизированный JavaScript для больших проектов',
    duration: '1 ч 10 мин',
    category: 'Программирование',
    progress: 0,
    thumbnail: '📘'
  },
  {
    id: 6,
    title: 'UX/UI дизайн',
    description: 'Создание удобных интерфейсов для пользователей',
    duration: '1 ч 30 мин',
    category: 'Дизайн',
    progress: 0,
    thumbnail: '✨'
  }
];

const quizzes: Record<number, Quiz[]> = {
  1: [
    {
      question: 'Что означает HTML?',
      options: [
        'HyperText Markup Language',
        'High Tech Modern Language',
        'Home Tool Markup Language',
        'Hyperlinks and Text Markup Language'
      ],
      correctAnswer: 0
    },
    {
      question: 'Какой тег используется для создания ссылки?',
      options: ['<link>', '<a>', '<href>', '<url>'],
      correctAnswer: 1
    },
    {
      question: 'Что такое CSS?',
      options: [
        'Computer Style Sheets',
        'Cascading Style Sheets',
        'Creative Style System',
        'Colorful Style Sheets'
      ],
      correctAnswer: 1
    }
  ],
  2: [
    {
      question: 'Что такое компонент в React?',
      options: [
        'Переменная',
        'Функция или класс, возвращающие UI',
        'HTML тег',
        'CSS стиль'
      ],
      correctAnswer: 1
    },
    {
      question: 'Для чего используется useState?',
      options: [
        'Для стилизации',
        'Для маршрутизации',
        'Для управления состоянием',
        'Для запросов к API'
      ],
      correctAnswer: 2
    },
    {
      question: 'Что такое props?',
      options: [
        'Свойства, передаваемые в компонент',
        'Стили компонента',
        'Методы компонента',
        'События компонента'
      ],
      correctAnswer: 0
    }
  ],
  3: [
    {
      question: 'Какой тип данных у числа в Python?',
      options: ['string', 'int или float', 'number', 'digit'],
      correctAnswer: 1
    },
    {
      question: 'Как создать список в Python?',
      options: ['{}', '()', '[]', '<>'],
      correctAnswer: 2
    },
    {
      question: 'Что делает функция print()?',
      options: [
        'Сохраняет файл',
        'Выводит данные на экран',
        'Создаёт переменную',
        'Удаляет данные'
      ],
      correctAnswer: 1
    }
  ]
};

function Index() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const categories = ['Все', 'Веб-разработка', 'Программирование', 'Дизайн'];

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setShowQuiz(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleWatchComplete = () => {
    if (selectedVideo && quizzes[selectedVideo.id]) {
      setShowQuiz(true);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedVideo && selectedAnswer !== null) {
      const currentQuiz = quizzes[selectedVideo.id][currentQuestion];
      if (selectedAnswer === currentQuiz.correctAnswer) {
        setScore(score + 1);
      }

      if (currentQuestion + 1 < quizzes[selectedVideo.id].length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  if (selectedVideo && !showQuiz) {
    return (
      <VideoPlayer
        video={selectedVideo}
        onBack={() => setSelectedVideo(null)}
        onWatchComplete={handleWatchComplete}
      />
    );
  }

  if (selectedVideo && showQuiz && quizzes[selectedVideo.id]) {
    const currentQuiz = quizzes[selectedVideo.id];

    if (quizCompleted) {
      return (
        <QuizResults
          score={score}
          totalQuestions={currentQuiz.length}
          onRestart={handleRestartQuiz}
          onBackToLibrary={() => setSelectedVideo(null)}
        />
      );
    }

    return (
      <QuizView
        quiz={currentQuiz}
        currentQuestion={currentQuestion}
        selectedAnswer={selectedAnswer}
        score={score}
        onAnswerSelect={handleAnswerSelect}
        onNextQuestion={handleNextQuestion}
      />
    );
  }

  return (
    <VideoLibrary
      videos={videos}
      selectedCategory={selectedCategory}
      categories={categories}
      onCategoryChange={setSelectedCategory}
      onVideoSelect={handleVideoSelect}
    />
  );
}

export default Index;
