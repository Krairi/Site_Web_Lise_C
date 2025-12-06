import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X,
  User, 
  Carrot, 
  Beef, 
  Snowflake, 
  SprayCan, 
  Sparkles, 
  Heart, 
  ArrowRight, 
  Plus, 
  Check, 
  TrendingDown, 
  Wallet, 
  PieChart,
  Clock,
  Flame,
  Tag,
  ChevronRight,
  Timer,
  FilterX
} from 'lucide-react';
import { Category, ListItem, StatCard } from './types';

// --- Mock Data ---

const CATEGORIES: Category[] = [
  { id: '1', name: 'Fruits & Légumes', icon: Carrot, color: 'bg-green-100 text-green-700', slug: 'fruits-legumes' },
  { id: '2', name: 'Viandes & Poissons', icon: Beef, color: 'bg-red-100 text-red-700', slug: 'viandes' },
  { id: '3', name: 'Surgelés', icon: Snowflake, color: 'bg-blue-100 text-blue-700', slug: 'surgeles' },
  { id: '4', name: 'Entretien', icon: SprayCan, color: 'bg-cyan-100 text-cyan-700', slug: 'entretien' },
  { id: '5', name: 'Hygiène', icon: Sparkles, color: 'bg-purple-100 text-purple-700', slug: 'hygiene' },
  { id: '6', name: 'Promotions', icon: TrendingDown, color: 'bg-orange-100 text-orange-700', slug: 'promos' },
];

// Enriching the list to match categories for the demo
const INITIAL_LIST: ListItem[] = [
  { id: '101', name: 'Pommes Golden Bio', category: 'Fruits & Légumes', price: 2.99, unit: 'kg', quantity: 1, checked: false, image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&q=80&w=100' },
  { id: '102', name: 'Steak Haché 5%', category: 'Viandes & Poissons', price: 4.50, unit: '2x125g', quantity: 2, checked: false, image: 'https://images.unsplash.com/photo-1532592309883-8f3b063b8309?auto=format&fit=crop&q=80&w=100' },
  { id: '103', name: 'Lessive Liquide', category: 'Entretien', price: 8.50, unit: '3L', isPromo: true, quantity: 1, checked: false, image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=100' },
  { id: '104', name: 'Dentifrice Blancheur', category: 'Hygiène', price: 3.20, unit: '75ml', quantity: 2, checked: true, image: 'https://images.unsplash.com/photo-1559656914-a30970c1affd?auto=format&fit=crop&q=80&w=100' },
  { id: '105', name: 'Pizza 4 Fromages', category: 'Surgelés', price: 4.50, unit: '400g', quantity: 2, checked: false, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=100' },
  { id: '106', name: 'Lait Demi-Écrémé', category: 'Frais', price: 1.15, unit: 'L', quantity: 6, checked: true, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=100' },
];

// --- Components ---

const Navbar = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Mes Listes', href: '#lists' },
    { name: 'Recettes', href: '#recipes' },
    { name: 'Promos', href: '#promos' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 150;
      for (const link of navLinks) {
        const sectionId = link.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(link.href);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href.substring(1));
    setActiveSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
            <ShoppingCart className="text-white w-6 h-6" />
          </div>
          <span className="font-heading font-bold text-2xl tracking-tight text-neutral-900">
            Grocy<span className="text-primary">Smart</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 font-medium text-neutral-800">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`transition-colors relative after:content-[''] after:absolute after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 after:transition-all duration-300 
                ${activeSection === link.href ? 'text-primary after:w-full font-semibold' : 'hover:text-primary after:w-0 hover:after:w-full'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors">
            <User className="w-5 h-5" />
            <span className="font-medium">Connexion</span>
          </button>
          <a 
            href="#lists"
            onClick={(e) => handleNavClick(e, '#lists')}
            className="bg-primary hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>Ma Liste</span>
            <div className="bg-white/20 px-2 py-0.5 rounded-full text-xs">3</div>
          </a>
          <button className="md:hidden text-neutral-800 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-neutral-100 flex flex-col p-4 animate-fade-in-down h-[calc(100vh-80px)]">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="py-4 border-b border-neutral-50 font-medium px-4 rounded-lg transition-colors text-neutral-800 hover:text-primary hover:bg-neutral-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => {
  return (
    <div id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2560" alt="Fresh Groceries" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-neutral-50"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl mt-16">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>Nouveau : Planification automatique des repas</span>
        </div>
        <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-neutral-900 leading-tight mb-6">
          Préparez votre liste complète en <span className="text-primary relative inline-block">2 minutes</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Optimisez votre budget courses, accédez aux meilleures promotions et gagnez du temps en magasin.
        </p>
        <div className="bg-white p-2 rounded-2xl shadow-card flex flex-col md:flex-row items-center gap-2 max-w-2xl mx-auto border border-neutral-100 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex-1 flex items-center px-4 h-14 w-full">
            <Search className="text-neutral-400 w-6 h-6 mr-3" />
            <input type="text" placeholder="Ajouter un produit (ex: Pâtes, Javel, Avocat...)" className="w-full h-full outline-none text-lg text-neutral-800 placeholder-neutral-400 bg-transparent" />
          </div>
          <button className="w-full md:w-auto bg-accent hover:bg-orange-600 text-white font-bold text-lg px-8 h-14 rounded-xl shadow-lg shadow-accent/30 transition-all flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Ajouter
          </button>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-medium text-neutral-500">
          <span>Suggestions :</span>
          {['Lait', 'Oeufs Bio', 'Lessive', 'Café', 'Couches'].map((tag) => (
            <button key={tag} className="hover:text-primary underline decoration-dotted underline-offset-4 transition-colors">{tag}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface QuickCategoriesProps {
  onCategoryClick: (categoryName: string) => void;
  activeCategory: string | null;
}

const QuickCategories = ({ onCategoryClick, activeCategory }: QuickCategoriesProps) => {
  return (
    <section id="categories" className="py-12 -mt-20 relative z-20 container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button 
              key={cat.id} 
              onClick={() => onCategoryClick(cat.name)}
              className={`group rounded-2xl p-6 shadow-soft hover:shadow-card border transition-all duration-300 cursor-pointer flex flex-col items-center text-center hover:-translate-y-1 w-full
                ${isActive ? 'bg-neutral-900 border-neutral-900 transform -translate-y-1 shadow-card' : 'bg-white border-transparent hover:border-neutral-100'}`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 
                ${isActive ? 'bg-white/20 text-white' : cat.color}`}>
                <cat.icon className="w-7 h-7" />
              </div>
              <h3 className={`font-heading font-semibold text-sm ${isActive ? 'text-white' : 'text-neutral-800'}`}>
                {cat.name}
              </h3>
            </button>
          );
        })}
      </div>
    </section>
  );
};

const BentoStats = () => {
  const stats: StatCard[] = [
    { label: "Budget Estimé", value: "84,50 €", subtext: "Pour 18 articles", icon: Wallet, color: 'secondary' },
    { label: "Économies", value: "-12,30 €", subtext: "Grâce aux promos détectées", icon: TrendingDown, color: 'primary' },
    { label: "Score Nutri", value: "A", subtext: "Panier équilibré", icon: PieChart, color: 'accent' },
  ];

  return (
    <section className="py-12 container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-heading font-bold text-3xl text-neutral-900 mb-2">Votre tableau de bord</h2>
          <p className="text-neutral-500">Aperçu en temps réel de votre liste en cours.</p>
        </div>
        <button className="text-secondary font-semibold hover:underline flex items-center gap-1">
          Voir l'analyse détaillée <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-3xl p-6 shadow-soft border border-neutral-100 flex items-start justify-between hover:shadow-card transition-shadow">
            <div>
              <p className="text-neutral-500 font-medium text-sm mb-1">{stat.label}</p>
              <h3 className="font-heading font-bold text-3xl mb-2 text-neutral-900">{stat.value}</h3>
              <p className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md inline-block">{stat.subtext}</p>
            </div>
            <div className={`p-3 rounded-2xl ${stat.color === 'primary' ? 'bg-green-100 text-green-600' : stat.color === 'secondary' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

interface ActiveListSectionProps {
  activeCategory: string | null;
  onClearCategory: () => void;
}

const ActiveListSection = ({ activeCategory, onClearCategory }: ActiveListSectionProps) => {
  const [items, setItems] = useState<ListItem[]>(INITIAL_LIST);

  const toggleCheck = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const filteredItems = useMemo(() => {
    if (!activeCategory) return items;
    if (activeCategory === 'Promotions') return items.filter(i => i.isPromo);
    return items.filter(i => i.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <section id="lists" className="py-12 bg-white mb-12 scroll-mt-24 transition-all duration-500">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3 pt-8">
          <div className="bg-blue-50 text-secondary font-bold px-4 py-2 rounded-lg inline-block text-sm mb-4">
            LISTE EN COURS
          </div>
          <h2 className="font-heading font-bold text-4xl text-neutral-900 mb-6 leading-tight">
            N'oubliez plus jamais le lait.
          </h2>
          <p className="text-neutral-600 text-lg mb-8">
            Gérez votre liste comme un pro. Notre algorithme trie automatiquement vos articles par rayon pour vous faire gagner 30% de temps en magasin.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-primary"><Check className="w-5 h-5" /></div>
              <span className="font-medium text-neutral-800">Tri automatique par rayon</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-primary"><Heart className="w-5 h-5" /></div>
              <span className="font-medium text-neutral-800">Sauvegarde des favoris</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-primary"><TrendingDown className="w-5 h-5" /></div>
              <span className="font-medium text-neutral-800">Comparateur de prix intégré</span>
            </div>
          </div>
          <button className="mt-10 bg-neutral-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-neutral-800 transition-colors shadow-lg">
            Créer ma première liste
          </button>
        </div>

        <div className="lg:w-2/3">
          <div className="bg-neutral-50 rounded-3xl p-6 md:p-8 shadow-inner border border-neutral-200 min-h-[500px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-xl text-neutral-800">Ma liste de la semaine</h3>
                {activeCategory && (
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    {activeCategory}
                    <button onClick={onClearCategory} className="hover:bg-primary/20 rounded-full p-0.5"><X className="w-3 h-3"/></button>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                {activeCategory && (
                   <button onClick={onClearCategory} className="text-sm font-semibold text-neutral-500 hover:text-neutral-800 flex items-center gap-1">
                     <FilterX className="w-4 h-4" /> Tout voir
                   </button>
                )}
                <button className="text-sm font-semibold text-accent hover:text-orange-600">Tout cocher</button>
              </div>
            </div>
            
            <div className="space-y-3">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`bg-white p-4 rounded-xl shadow-sm border border-transparent hover:border-neutral-200 transition-all duration-200 flex items-center gap-4 group cursor-pointer ${item.checked ? 'opacity-60 grayscale' : ''}`}
                    onClick={() => toggleCheck(item.id)}
                  >
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${item.checked ? 'bg-primary border-primary' : 'border-neutral-300'}`}>
                      {item.checked && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-neutral-100" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className={`font-semibold text-neutral-800 ${item.checked ? 'line-through' : ''}`}>{item.name}</h4>
                        <span className="font-bold text-secondary">{item.price.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between text-sm text-neutral-500 mt-1">
                        <span className="flex items-center gap-2">
                          {item.quantity} x {item.unit}
                          <span className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-500">{item.category}</span>
                        </span>
                        {item.isPromo && <span className="text-accent font-medium flex items-center gap-1"><Sparkles className="w-3 h-3"/> Promo</span>}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center flex flex-col items-center justify-center text-neutral-400">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="font-medium">Aucun produit dans cette catégorie pour le moment.</p>
                  <button onClick={onClearCategory} className="text-primary text-sm font-semibold mt-2 hover:underline">Voir tous les produits</button>
                </div>
              )}
              
              <button className="w-full py-4 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-500 font-medium hover:border-primary hover:text-primary hover:bg-green-50 transition-all flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Ajouter un article manuellement
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-200 flex justify-between items-center">
              <span className="text-neutral-500 font-medium">Total estimé</span>
              <span className="font-heading font-bold text-2xl text-neutral-900">
                {filteredItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RecipesSection = () => {
  const recipes = [
    { id: 1, title: "Lasagnes de Légumes", time: "45 min", cals: "420 kcal", img: "https://images.unsplash.com/photo-1574868235977-17eb954c25f7?auto=format&fit=crop&q=80&w=400" },
    { id: 2, title: "Poke Bowl Saumon", time: "20 min", cals: "550 kcal", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400" },
    { id: 3, title: "Curry de Pois Chiches", time: "30 min", cals: "380 kcal", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <section id="recipes" className="py-16 bg-neutral-50 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-heading font-bold text-3xl text-neutral-900 mb-2">Idées Recettes</h2>
            <p className="text-neutral-600">Transformez une recette en liste de courses en 1 clic.</p>
          </div>
          <button className="text-primary font-semibold hover:underline flex items-center gap-1">
            Voir tout <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all hover:-translate-y-1 group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img src={recipe.img} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-neutral-800 flex items-center gap-1">
                  <Timer className="w-3 h-3" /> {recipe.time}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-heading font-bold text-lg text-neutral-900">{recipe.title}</h3>
                  <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">{recipe.cals}</span>
                </div>
                <p className="text-sm text-neutral-500 mb-4">Ingrédients frais et de saison.</p>
                <button className="w-full bg-green-50 text-primary font-semibold py-2 rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Ajouter à ma liste
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PromosSection = () => {
  const promos = [
    { id: 1, name: "Lessive Xtra Total", price: 9.90, oldPrice: 14.50, img: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=200" },
    { id: 2, name: "Café en Grains 1kg", price: 12.99, oldPrice: 18.20, img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=200" },
    { id: 3, name: "Pack Couches T4", price: 24.50, oldPrice: 32.00, img: "https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?auto=format&fit=crop&q=80&w=200" },
    { id: 4, name: "Huile d'Olive Bio", price: 6.50, oldPrice: 8.90, img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=200" },
  ];

  return (
    <section id="promos" className="py-16 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-orange-100 rounded-full text-accent">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-3xl text-neutral-900">Promos Choc</h2>
            <p className="text-neutral-600">Jusqu'à -50% sur vos produits du quotidien.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {promos.map((promo) => (
            <div key={promo.id} className="border border-neutral-100 rounded-2xl p-4 hover:shadow-card transition-shadow relative">
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{Math.round(((promo.oldPrice - promo.price) / promo.oldPrice) * 100)}%
              </div>
              <div className="h-32 flex items-center justify-center mb-4 bg-neutral-50 rounded-xl">
                 <img src={promo.img} alt={promo.name} className="h-24 object-contain mix-blend-multiply" />
              </div>
              <h3 className="font-bold text-neutral-800 mb-1 truncate">{promo.name}</h3>
              <div className="flex items-end gap-2 mb-3">
                <span className="font-heading font-bold text-xl text-red-600">{promo.price.toFixed(2)}€</span>
                <span className="text-sm text-neutral-400 line-through mb-1">{promo.oldPrice.toFixed(2)}€</span>
              </div>
              <button className="w-full bg-neutral-900 text-white py-2 rounded-lg font-medium text-sm hover:bg-neutral-800 transition-colors">
                J'en profite
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-white w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-xl text-neutral-900">GrocySmart</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed">
              La solution intelligente pour vos courses. Économisez, planifiez et mangez mieux, sans stress.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold text-neutral-900 mb-4">Découvrir</h4>
            <ul className="space-y-3 text-neutral-600 text-sm">
              <li><a href="#home" className="hover:text-primary">Comment ça marche</a></li>
              <li><a href="#categories" className="hover:text-primary">Nos catégories</a></li>
              <li><a href="#recipes" className="hover:text-primary">Recettes de saison</a></li>
              <li><a href="#promos" className="hover:text-primary">Promos du moment</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-neutral-900 mb-4">Légal</h4>
            <ul className="space-y-3 text-neutral-600 text-sm">
              <li><a href="#" className="hover:text-primary">Mentions légales</a></li>
              <li><a href="#" className="hover:text-primary">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-primary">CGU</a></li>
              <li><a href="#" className="hover:text-primary">Gestion des cookies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-neutral-900 mb-4">Newsletter</h4>
            <p className="text-neutral-500 text-sm mb-4">Recevez nos meilleures astuces budget chaque semaine.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Votre email" className="bg-neutral-100 px-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 w-full" />
              <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">OK</button>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400">
          <p>© 2024 GrocySmart. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Fait avec ❤️ pour les familles organisées</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryName);
      scrollToSection('lists');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-neutral-800 antialiased">
      <Navbar onNavigate={scrollToSection} />
      <main className="flex-grow">
        <HeroSection />
        <QuickCategories activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
        <BentoStats />
        <ActiveListSection activeCategory={activeCategory} onClearCategory={() => setActiveCategory(null)} />
        <RecipesSection />
        <PromosSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;