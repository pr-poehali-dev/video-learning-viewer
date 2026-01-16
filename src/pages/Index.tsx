import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

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

  const filteredVideos = selectedCategory === 'Все' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

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
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedVideo(null)}
              className="gap-2"
            >
              <Icon name="ArrowLeft" size={20} />
              Назад к курсам
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
            <div className="aspect-video bg-muted rounded-xl flex items-center justify-center text-8xl shadow-lg">
              {selectedVideo.thumbnail}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-3xl">{selectedVideo.title}</CardTitle>
                    <CardDescription className="text-lg">
                      {selectedVideo.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {selectedVideo.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={18} />
                    <span>{selectedVideo.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="PlayCircle" size={18} />
                    <span>Видео урок</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Прогресс обучения</span>
                    <span className="font-medium">{selectedVideo.progress}%</span>
                  </div>
                  <Progress value={selectedVideo.progress} className="h-2" />
                </div>

                <Button 
                  onClick={handleWatchComplete} 
                  className="w-full gap-2"
                  size="lg"
                >
                  <Icon name="CheckCircle" size={20} />
                  Завершить просмотр и пройти тест
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (selectedVideo && showQuiz && quizzes[selectedVideo.id]) {
    const currentQuiz = quizzes[selectedVideo.id];

    if (quizCompleted) {
      const percentage = Math.round((score / currentQuiz.length) * 100);
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full animate-scale-in">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto text-6xl">
                {percentage >= 70 ? '🎉' : '📚'}
              </div>
              <CardTitle className="text-3xl">
                {percentage >= 70 ? 'Отличная работа!' : 'Продолжайте учиться!'}
              </CardTitle>
              <CardDescription className="text-lg">
                Вы ответили правильно на {score} из {currentQuiz.length} вопросов
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Результат</span>
                  <span className="text-2xl font-bold text-primary">{percentage}%</span>
                </div>
                <Progress value={percentage} className="h-3" />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleRestartQuiz} 
                  variant="outline" 
                  className="flex-1 gap-2"
                >
                  <Icon name="RotateCcw" size={18} />
                  Пройти ещё раз
                </Button>
                <Button 
                  onClick={() => setSelectedVideo(null)} 
                  className="flex-1 gap-2"
                >
                  <Icon name="Library" size={18} />
                  К видеотеке
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-3xl w-full animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">
                Вопрос {currentQuestion + 1} из {currentQuiz.length}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Правильных ответов: {score}
              </span>
            </div>
            <Progress 
              value={((currentQuestion + 1) / currentQuiz.length) * 100} 
              className="h-2 mb-4"
            />
            <CardTitle className="text-2xl">
              {currentQuiz[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {currentQuiz[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto py-4 px-6"
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>

            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="w-full gap-2"
              size="lg"
            >
              {currentQuestion + 1 < currentQuiz.length ? (
                <>
                  Следующий вопрос
                  <Icon name="ArrowRight" size={18} />
                </>
              ) : (
                <>
                  Завершить тест
                  <Icon name="CheckCircle" size={18} />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📚</div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">EduVideo</h1>
                <p className="text-sm text-muted-foreground">Обучение через видео</p>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Icon name="User" size={18} />
              Профиль
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4 animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold mb-2">Видеотека курсов</h2>
            <p className="text-muted-foreground">
              Выберите курс и начните обучение прямо сейчас
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <Card 
              key={video.id} 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleVideoSelect(video)}
            >
              <div className="aspect-video bg-muted flex items-center justify-center text-6xl rounded-t-xl group-hover:scale-105 transition-transform duration-300">
                {video.thumbnail}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {video.title}
                  </CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    {video.category}
                  </Badge>
                </div>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={16} />
                      {video.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Brain" size={16} />
                      Тест
                    </div>
                  </div>
                  {video.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span className="font-medium">{video.progress}%</span>
                      </div>
                      <Progress value={video.progress} className="h-1.5" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Index;
