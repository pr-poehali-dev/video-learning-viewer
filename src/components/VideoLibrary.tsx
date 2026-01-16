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

interface VideoLibraryProps {
  videos: Video[];
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  onVideoSelect: (video: Video) => void;
}

function VideoLibrary({ videos, selectedCategory, categories, onCategoryChange, onVideoSelect }: VideoLibraryProps) {
  const filteredVideos = selectedCategory === 'Все' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

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
                onClick={() => onCategoryChange(category)}
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
              onClick={() => onVideoSelect(video)}
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

export default VideoLibrary;
