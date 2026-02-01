import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

export default function Index() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchForm, setSearchForm] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
  });
  const [bookedTickets, setBookedTickets] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const sampleFlights = [
    {
      id: 1,
      airline: 'Aeroflot',
      from: 'Москва (SVO)',
      to: 'Санкт-Петербург (LED)',
      departure: '10:30',
      arrival: '12:00',
      duration: '1ч 30м',
      price: 4500,
      type: 'Прямой',
    },
    {
      id: 2,
      airline: 'S7 Airlines',
      from: 'Москва (DME)',
      to: 'Санкт-Петербург (LED)',
      departure: '14:15',
      arrival: '15:50',
      duration: '1ч 35м',
      price: 5200,
      type: 'Прямой',
    },
    {
      id: 3,
      airline: 'Победа',
      from: 'Москва (VKO)',
      to: 'Санкт-Петербург (LED)',
      departure: '18:00',
      arrival: '19:30',
      duration: '1ч 30м',
      price: 3800,
      type: 'Прямой',
    },
  ];

  const favoriteRoutes = [
    { from: 'Москва', to: 'Санкт-Петербург', searches: 5 },
    { from: 'Москва', to: 'Сочи', searches: 3 },
    { from: 'Москва', to: 'Казань', searches: 2 },
  ];

  const searchHistory = [
    { from: 'Москва', to: 'Санкт-Петербург', date: '2024-03-15', passengers: 1 },
    { from: 'Москва', to: 'Сочи', date: '2024-04-20', passengers: 2 },
    { from: 'Екатеринбург', to: 'Москва', date: '2024-05-10', passengers: 1 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Plane" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SkyBook
              </h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <Button variant="ghost" onClick={() => setActiveTab('search')}>
                Поиск
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('tickets')}>
                Мои билеты
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('profile')}>
                Профиль
              </Button>
            </nav>
            <Button 
              className="bg-gradient-to-r from-primary to-secondary"
              onClick={() => setActiveTab('profile')}
            >
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="hidden">
            <TabsTrigger value="search">Поиск</TabsTrigger>
            <TabsTrigger value="tickets">Билеты</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-1">
              <div className="bg-white rounded-[22px] p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">Найти авиабилеты</h2>
                  <p className="text-muted-foreground">
                    Сравните цены и выберите лучший вариант перелёта
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Icon name="MapPin" size={16} className="text-primary" />
                      Откуда
                    </label>
                    <Input
                      placeholder="Москва"
                      value={searchForm.from}
                      onChange={(e) => setSearchForm({ ...searchForm, from: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Icon name="MapPin" size={16} className="text-secondary" />
                      Куда
                    </label>
                    <Input
                      placeholder="Санкт-Петербург"
                      value={searchForm.to}
                      onChange={(e) => setSearchForm({ ...searchForm, to: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Icon name="Calendar" size={16} className="text-accent" />
                      Дата вылета
                    </label>
                    <Input
                      type="date"
                      value={searchForm.date}
                      onChange={(e) => setSearchForm({ ...searchForm, date: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Icon name="Users" size={16} className="text-primary" />
                      Пассажиры
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="9"
                      value={searchForm.passengers}
                      onChange={(e) =>
                        setSearchForm({ ...searchForm, passengers: parseInt(e.target.value) })
                      }
                      className="h-12"
                    />
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full h-14 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  onClick={() => {
                    if (!searchForm.from || !searchForm.to || !searchForm.date) {
                      toast({
                        title: 'Заполните все поля',
                        description: 'Укажите город вылета, прилёта и дату',
                        variant: 'destructive',
                      });
                      return;
                    }
                    toast({
                      title: 'Поиск выполнен',
                      description: `Найдено ${sampleFlights.length} рейсов`,
                    });
                  }}
                >
                  <Icon name="Search" size={20} />
                  Найти билеты
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Доступные рейсы</h3>
              <div className="space-y-4">
                {sampleFlights.map((flight) => (
                  <Card
                    key={flight.id}
                    className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                              <Icon name="Plane" className="text-primary" size={24} />
                            </div>
                            <div>
                              <p className="font-semibold text-lg">{flight.airline}</p>
                              <Badge variant="secondary">{flight.type}</Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div>
                              <p className="text-2xl font-bold">{flight.departure}</p>
                              <p className="text-sm text-muted-foreground">{flight.from}</p>
                            </div>
                            <div className="text-center">
                              <Icon
                                name="ArrowRight"
                                className="mx-auto text-muted-foreground"
                                size={24}
                              />
                              <p className="text-xs text-muted-foreground mt-1">{flight.duration}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">{flight.arrival}</p>
                              <p className="text-sm text-muted-foreground">{flight.to}</p>
                            </div>
                          </div>
                        </div>

                        <div className="md:text-right space-y-3">
                          <div>
                            <p className="text-3xl font-bold text-primary">
                              {flight.price.toLocaleString()} ₽
                            </p>
                            <p className="text-sm text-muted-foreground">за пассажира</p>
                          </div>
                          <Button 
                            className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary"
                            onClick={() => {
                              setBookedTickets([...bookedTickets, flight]);
                              toast({
                                title: 'Рейс забронирован!',
                                description: `${flight.airline} ${flight.from} → ${flight.to}`,
                              });
                              setActiveTab('tickets');
                            }}
                          >
                            Выбрать рейс
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Ticket" className="text-primary" />
                  Мои билеты
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookedTickets.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                      <Icon name="Ticket" size={40} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Билетов пока нет</h3>
                    <p className="text-muted-foreground mb-6">
                      Забронируйте первый рейс и он появится здесь
                    </p>
                    <Button
                      onClick={() => setActiveTab('search')}
                      className="bg-gradient-to-r from-primary to-secondary"
                    >
                      <Icon name="Search" size={20} />
                      Найти билеты
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookedTickets.map((ticket, index) => (
                      <Card key={index} className="border-2 border-primary/20">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Badge className="bg-gradient-to-r from-primary to-secondary text-white">Активный</Badge>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => {
                                setBookedTickets(bookedTickets.filter((_, i) => i !== index));
                                toast({
                                  title: 'Билет отменён',
                                  description: 'Бронирование успешно отменено',
                                });
                              }}
                            >
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                              <Icon name="Plane" className="text-primary" size={24} />
                            </div>
                            <div>
                              <p className="font-semibold text-lg">{ticket.airline}</p>
                              <p className="text-sm text-muted-foreground">{ticket.type}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div>
                              <p className="text-2xl font-bold">{ticket.departure}</p>
                              <p className="text-sm text-muted-foreground">{ticket.from}</p>
                            </div>
                            <div className="text-center">
                              <Icon name="ArrowRight" className="mx-auto text-muted-foreground" size={24} />
                              <p className="text-xs text-muted-foreground mt-1">{ticket.duration}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">{ticket.arrival}</p>
                              <p className="text-sm text-muted-foreground">{ticket.to}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-secondary text-white">
                        ИП
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">Иван Петров</h3>
                      <p className="text-muted-foreground">ivan@example.com</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: 'Настройки профиля',
                          description: 'Функция в разработке',
                        });
                      }}
                    >
                      <Icon name="Settings" size={16} />
                      Настройки
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Star" className="text-accent" />
                    Избранные маршруты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {favoriteRoutes.map((route, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon name="Plane" className="text-primary" size={20} />
                          <div>
                            <p className="font-semibold">
                              {route.from} → {route.to}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Поисков: {route.searches}
                            </p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => {
                            setSearchForm({
                              from: route.from,
                              to: route.to,
                              date: '',
                              passengers: 1,
                            });
                            setActiveTab('search');
                            toast({
                              title: 'Маршрут загружен',
                              description: `${route.from} → ${route.to}`,
                            });
                          }}
                        >
                          <Icon name="Search" size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="History" className="text-secondary" />
                    История поисков
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {searchHistory.map((search, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-2 md:mb-0">
                          <Icon name="MapPin" className="text-muted-foreground" size={20} />
                          <div>
                            <p className="font-semibold">
                              {search.from} → {search.to}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {search.date} · {search.passengers}{' '}
                              {search.passengers === 1 ? 'пассажир' : 'пассажира'}
                            </p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSearchForm({
                              from: search.from,
                              to: search.to,
                              date: search.date,
                              passengers: search.passengers,
                            });
                            setActiveTab('search');
                            toast({
                              title: 'Поиск повторён',
                              description: `${search.from} → ${search.to}`,
                            });
                          }}
                        >
                          <Icon name="RotateCcw" size={16} />
                          Повторить поиск
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t bg-white/80 backdrop-blur-md mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Plane" className="text-white" size={18} />
                </div>
                <h3 className="font-bold text-lg">SkyBook</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Современная платформа для поиска и бронирования авиабилетов
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Поиск билетов
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Мои бронирования
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Профиль
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Центр помощи
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Связаться с нами
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">О платформе</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Правила
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Конфиденциальность
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 SkyBook. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}