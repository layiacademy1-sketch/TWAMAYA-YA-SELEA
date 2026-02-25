/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flower2, 
  Info, 
  User, 
  Calendar, 
  Search, 
  UserPlus, 
  ChevronLeft, 
  Instagram, 
  MessageCircle, 
  MapPin,
  CalendarDays,
  X
} from 'lucide-react';

// --- Types ---
interface Profile {
  id: string;
  nom: string;
  prenom: string;
  surnom: string;
  genre: 'fille' | 'garçon';
  snapchat: string;
  instagram: string;
  pays: string;
  ville: string;
  dateNaissance: string;
  photoUrl?: string;
}

type View = 'home' | 'events' | 'directory' | 'register';

// --- Mock Data ---
const MOCK_PROFILES: Profile[] = [
  {
    id: '1',
    nom: 'Moussa',
    prenom: 'Dalilou',
    surnom: 'Dalilou',
    genre: 'garçon',
    snapchat: 'dalilou974',
    instagram: 'moussadalilou',
    pays: 'France',
    ville: 'Paris',
    dateNaissance: '1995-06-22',
    photoUrl: 'https://image.noelshack.com/fichiers/2026/09/3/1772036348-design-sans-titre-26.png'
  },
  {
    id: '2',
    nom: 'Soilihi',
    prenom: 'Djoumoi',
    surnom: 'Layringo',
    genre: 'garçon',
    snapchat: 'layi-life',
    instagram: 'layiringo',
    pays: 'France',
    ville: 'Le Havre',
    dateNaissance: '1998-12-06',
    photoUrl: 'https://image.noelshack.com/fichiers/2026/09/3/1772036426-photo-2026-02-25-17-20-20.jpg'
  }
];

const DALAO_PHOTOS = [
  'https://image.noelshack.com/fichiers/2026/09/3/1772034606-482324720-508631785620306-3333519305595448713-n-1.jpg',
  'https://image.noelshack.com/fichiers/2026/09/3/1772034606-481985666-508628972287254-3205638110383014494-n.jpg',
  'https://image.noelshack.com/fichiers/2026/09/3/1772034606-482031543-508631368953681-3416759439929571061-n.jpg',
  'https://image.noelshack.com/fichiers/2026/09/3/1772034606-482073077-508629535620531-3641369613183150691-n.jpg',
];

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Flowers */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * 100 - 50 + '%', 
              y: Math.random() * 100 - 50 + '%',
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              x: [null, (Math.random() * 120 - 60) + '%'],
              y: [null, (Math.random() * 120 - 60) + '%'],
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0.5],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            style={{ 
              left: '50%', 
              top: '50%',
            }}
          >
            <Flower2 className="text-yellow-400/40 w-8 h-8 md:w-12 md:h-12" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "backOut" }}
        className="relative mb-12"
      >
        <div className="w-48 h-48 rounded-full border-4 border-yellow-400 overflow-hidden shadow-[0_0_50px_rgba(250,204,21,0.4)] p-2 bg-black">
          <img 
            src="https://image.noelshack.com/fichiers/2026/09/3/1772033991-design-sans-titre-27.png" 
            alt="Twamaya Ya Séléa Logo" 
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <motion.div 
          className="absolute -inset-4 rounded-full border-2 border-yellow-400/20"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Loading Bar */}
      <div className="w-64 h-1.5 bg-zinc-900 rounded-full overflow-hidden relative">
        <motion.div 
          className="absolute inset-y-0 left-0 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
        />
      </div>
      <motion.p 
        className="mt-4 text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Chargement de l'application...
      </motion.p>
    </motion.div>
  );
};

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-zinc-900 border border-yellow-400/30 rounded-2xl w-full max-w-lg overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-yellow-400 text-xl font-bold">{title}</h3>
              <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="text-white leading-relaxed max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('home');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPresidentModalOpen, setIsPresidentModalOpen] = useState(false);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black">
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <HomeView 
            onNavigate={setCurrentView} 
            onOpenAbout={() => setIsAboutModalOpen(true)}
            onOpenPresident={() => setIsPresidentModalOpen(true)}
          />
        )}
        {currentView === 'events' && <EventsView onBack={() => setCurrentView('home')} />}
        {currentView === 'directory' && <DirectoryView onBack={() => setCurrentView('home')} />}
        {currentView === 'register' && <RegisterView onBack={() => setCurrentView('home')} />}
      </AnimatePresence>

      <Modal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
        title="En savoir plus"
      >
        <p className="mb-4">Notre association a pour vocation de rassembler tous les jeunes originaires de Séléa Bambao vivant en Île-de-France, dans un esprit d’unité, de solidarité et de partage.</p>
        <p className="mb-4">Nous œuvrons au renforcement des liens fraternels entre nos membres, tout en encourageant l’épanouissement personnel, intellectuel et culturel de chacun.</p>
        <p className="font-bold text-yellow-400 mb-2">Nos objectifs sont clairs :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Maintenir un lien fort entre les jeunes séléanais de la région parisienne</li>
          <li>Favoriser la solidarité, l’entraide et la cohésion sociale</li>
          <li>Encourager le développement intellectuel et éducatif de nos membres</li>
          <li>Créer des ponts avec d’autres groupes séléanais en France partageant les mêmes valeurs</li>
          <li>Promouvoir et valoriser la culture et l’éducation comoriennes dans un esprit d’intégration harmonieuse à la société française</li>
        </ul>
        <p className="mt-4 italic">Ensemble, nous construisons un avenir solidaire, fier de ses racines et tourné vers l’ouverture.</p>
      </Modal>

      <Modal 
        isOpen={isPresidentModalOpen} 
        onClose={() => setIsPresidentModalOpen(false)} 
        title="Le mot du Président"
      >
        <p className="mb-4">Chers membres, chers amis,</p>
        <p className="mb-4">C’est avec fierté que je vous souhaite la bienvenue au sein de l’Association des Jeunes de Séléa Bambao en Île-de-France.</p>
        <p className="mb-4">Notre objectif est clair : rassembler, soutenir et valoriser la jeunesse de Séléa, tout en préservant nos valeurs de solidarité, d’entraide et de respect de notre culture.</p>
        <p className="mb-4">Ensemble, nous construisons un lien fort entre les générations, les régions et les esprits.</p>
        <p className="mb-4">Merci à tous pour votre engagement. Continuons à avancer unis, fiers de nos racines et tournés vers l’avenir.</p>
        <div className="mt-6">
          <p className="font-bold">Le Président</p>
          <p className="text-yellow-400">Dalilou MOUSSA</p>
        </div>
      </Modal>
    </div>
  );
}

// --- Views ---

const HomeView = ({ onNavigate, onOpenAbout, onOpenPresident }: { 
  onNavigate: (v: View) => void, 
  onOpenAbout: () => void,
  onOpenPresident: () => void
}) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="max-w-2xl mx-auto px-6 py-12 flex flex-col items-center"
  >
    {/* Hero Section */}
    <header className="text-center mb-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-6 relative inline-block group"
      >
        <div className="w-32 h-32 rounded-full border-4 border-yellow-400 overflow-hidden shadow-[0_0_30px_rgba(250,204,21,0.2)] p-1 bg-black group-hover:shadow-[0_0_45px_rgba(250,204,21,0.4)] transition-all duration-500">
          <img 
            src="https://image.noelshack.com/fichiers/2026/09/3/1772033991-design-sans-titre-27.png" 
            alt="Logo" 
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <motion.div 
          className="absolute -inset-2 rounded-full border border-yellow-400/30"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
      
      <p className="text-zinc-400 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed px-4">
        Association des jeunes originaires de Séléa Bambao vivant en Île-de-France.
      </p>
      <button 
        onClick={onOpenAbout}
        className="group flex items-center gap-2 mx-auto px-6 py-3 bg-zinc-900/50 premium-blur border border-zinc-800 rounded-full hover:border-yellow-400 transition-all duration-300"
      >
        <Info size={18} className="text-yellow-400" />
        <span className="font-medium">En savoir plus</span>
      </button>
    </header>

    {/* President Section */}
    <div className="w-full animated-border-container mb-12">
      <div className="animated-border-bg" />
      <section className="animated-border-content p-8 text-center">
        <div className="relative inline-block mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-yellow-400 overflow-hidden mx-auto shadow-xl shadow-yellow-400/20">
            <img 
              src="https://image.noelshack.com/fichiers/2026/09/3/1772033848-design-sans-titre-26.png" 
              alt="Dalilou Moussa" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-2xl font-black">DALILOU MOUSSA</h2>
        <p className="text-zinc-400 mb-6 font-medium">Président de l'association</p>
        <button 
          onClick={onOpenPresident}
          className="px-8 py-3 bg-yellow-400 text-black font-black rounded-xl hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20 whitespace-nowrap"
        >
          Voir le mot du Président
        </button>
      </section>
    </div>

    {/* Main Actions */}
    <div className="w-full space-y-4 mb-20">
      <ActionButton 
        icon={<Calendar className="text-yellow-400" />} 
        label="ÉVÉNEMENTS" 
        onClick={() => onNavigate('events')} 
        animated
      />
      <ActionButton 
        icon={<Search className="text-yellow-400" />} 
        label="ANNUAIRE DE SÉLÉA" 
        onClick={() => onNavigate('directory')} 
        animated
      />
      <ActionButton 
        icon={<UserPlus className="text-yellow-400" />} 
        label="M’enregistrer en tant que personne de Séléa" 
        onClick={() => onNavigate('register')} 
        highlight
      />
    </div>
  </motion.div>
);

const ActionButton = ({ icon, label, onClick, highlight, animated }: { 
  icon: React.ReactNode, 
  label: string, 
  onClick: () => void,
  highlight?: boolean,
  animated?: boolean
}) => {
  const content = (
    <div 
      className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 group relative overflow-hidden
        ${highlight 
          ? 'bg-yellow-400 border-yellow-400 text-black hover:bg-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_35px_rgba(250,204,21,0.5)]' 
          : 'bg-zinc-900/80 backdrop-blur-md border-zinc-800 text-white hover:border-yellow-400/50 hover:shadow-[0_0_25px_rgba(250,204,21,0.15)]'}`}
    >
      <div className={`p-3 rounded-xl transition-transform duration-500 group-hover:scale-110 ${highlight ? 'bg-black/10' : 'bg-black'}`}>
        {React.cloneElement(icon as React.ReactElement, { 
          className: highlight ? 'text-black' : 'text-yellow-400' 
        })}
      </div>
      <span className="text-lg font-bold text-left flex-1 tracking-tight">{label}</span>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute right-6">
        <ChevronLeft className="rotate-180 text-yellow-400" size={20} />
      </div>
    </div>
  );

  if (animated) {
    return (
      <button onClick={onClick} className="w-full animated-border-container group">
        <div className="animated-border-bg" />
        <div className="animated-border-content">
          {content}
        </div>
      </button>
    );
  }

  return (
    <button onClick={onClick} className="w-full">
      {content}
    </button>
  );
};

const EventsView = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'past' | 'upcoming'>('past');
  const [showDalaoPhotos, setShowDalaoPhotos] = useState(false);

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-black z-40 overflow-y-auto"
    >
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-yellow-400 mb-8 transition-colors">
          <ChevronLeft size={24} />
          <span>Retour</span>
        </button>

        <h2 className="text-3xl font-black mb-8">ÉVÉNEMENTS</h2>

        <div className="flex bg-zinc-900 p-1 rounded-xl mb-8">
          <button 
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 rounded-lg font-bold transition-all ${activeTab === 'past' ? 'bg-yellow-400 text-black' : 'text-zinc-400'}`}
          >
            Nos derniers événements
          </button>
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 rounded-lg font-bold transition-all ${activeTab === 'upcoming' ? 'bg-yellow-400 text-black' : 'text-zinc-400'}`}
          >
            Prochains événements
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'past' ? (
            <div className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Dalao</h3>
                    <p className="text-yellow-400 text-xs font-bold">Date : 8 février 2025</p>
                  </div>
                  <a 
                    href="https://www.facebook.com/twamayayaselea"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-yellow-400 font-bold transition-colors"
                  >
                    En savoir plus
                  </a>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Journée culturelle</h3>
                    <p className="text-yellow-400 text-xs font-bold">Date : 4 novembre 2023</p>
                  </div>
                  <a 
                    href="https://www.youtube.com/watch?v=WdaWxqbfM-o&list=RDWdaWxqbfM-o&start_radio=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-yellow-400 font-bold transition-colors"
                  >
                    En savoir plus
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500">
              <CalendarDays size={48} className="mx-auto mb-4 opacity-20" />
              <p>Aucun événement prévu pour le moment.</p>
              <p className="text-sm">Restez connectés !</p>
            </div>
          )}
        </div>
      </div>

      <Modal 
        isOpen={showDalaoPhotos} 
        onClose={() => setShowDalaoPhotos(false)} 
        title="Photos de l'événement Dalao"
      >
        <div className="grid grid-cols-2 gap-4">
          {DALAO_PHOTOS.map((url, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden border border-zinc-800">
              <img src={url} alt={`Dalao ${i}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a 
            href="https://www.facebook.com/twamayayaselea" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
          >
            <MessageCircle size={20} />
            Voir plus
          </a>
        </div>
      </Modal>
    </motion.div>
  );
};

const DirectoryView = ({ onBack }: { onBack: () => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'city' | 'country'>('name');

  const filteredProfiles = useMemo(() => {
    return MOCK_PROFILES.filter(p => {
      const query = searchQuery.toLowerCase();
      if (searchType === 'name') {
        return p.nom.toLowerCase().includes(query) || p.prenom.toLowerCase().includes(query) || p.surnom.toLowerCase().includes(query);
      }
      if (searchType === 'city') {
        return p.ville.toLowerCase().includes(query);
      }
      return p.pays.toLowerCase().includes(query);
    });
  }, [searchQuery, searchType]);

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-black z-40 overflow-y-auto"
    >
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-yellow-400 mb-8 transition-colors">
          <ChevronLeft size={24} />
          <span>Retour</span>
        </button>

        <h2 className="text-3xl font-black mb-8">ANNUAIRE DE SÉLÉA</h2>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setSearchType('name')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${searchType === 'name' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-400'}`}
            >
              Par nom
            </button>
            <button 
              onClick={() => setSearchType('city')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${searchType === 'city' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-400'}`}
            >
              Par ville
            </button>
            <button 
              onClick={() => setSearchType('country')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${searchType === 'country' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-400'}`}
            >
              Par pays
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
              type="text"
              placeholder={
                searchType === 'name' ? "Rechercher par nom..." : 
                searchType === 'city' ? "Rechercher par ville..." : 
                "Rechercher par pays..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:border-yellow-400 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))
          ) : (
            <div className="text-center py-12 text-zinc-500">
              <p>Aucun profil trouvé.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProfileCard: React.FC<{ profile: Profile }> = ({ profile }) => {
  const birthday = new Date(profile.dateNaissance);
  const formattedBirthday = birthday.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

  return (
    <div className="w-full animated-border-container">
      <div className="animated-border-bg" />
      <div className="animated-border-content p-6">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-yellow-400 overflow-hidden mb-4 bg-zinc-800 flex items-center justify-center">
            {profile.photoUrl ? (
              <img src={profile.photoUrl} alt={profile.prenom} className="w-full h-full object-cover" />
            ) : (
              <User size={40} className="text-zinc-600" />
            )}
          </div>
          <h3 className="text-2xl font-black text-white leading-tight">{profile.prenom} {profile.nom}</h3>
          <div className="mt-1">
            <p className="text-yellow-400 font-bold text-sm">Surnom : {profile.surnom}</p>
            <p className="text-cyan-400 font-bold text-xs uppercase tracking-wider mt-0.5">{profile.genre}</p>
          </div>
          
          <div className="flex flex-col items-center gap-1 mt-4">
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <CalendarDays size={14} className="text-zinc-500" />
              <span>Né(e) le {formattedBirthday}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <MapPin size={14} className="text-zinc-500" />
              <span>{profile.pays} – {profile.ville}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {profile.snapchat && (
            <a 
              href={`https://www.snapchat.com/add/${profile.snapchat.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-yellow-400 text-black py-3 rounded-xl font-black text-sm hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/10"
            >
              <MessageCircle size={18} />
              SNAPCHAT
            </a>
          )}
          {profile.instagram && (
            <a 
              href={`https://www.instagram.com/${profile.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-zinc-800 text-white py-3 rounded-xl font-black text-sm hover:bg-zinc-700 transition-all border border-zinc-700"
            >
              <Instagram size={18} className="text-pink-500" />
              INSTAGRAM
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const RegisterView = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    surnom: '',
    genre: 'garçon' as 'fille' | 'garçon',
    dateNaissance: '',
    pays: '',
    ville: '',
    snapchat: '',
    instagram: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*Nouvelle Inscription Twamaya Ya Séléa*%0A%0A` +
      `*Nom:* ${formData.nom}%0A` +
      `*Prénom:* ${formData.prenom}%0A` +
      `*Surnom:* ${formData.surnom}%0A` +
      `*Genre:* ${formData.genre}%0A` +
      `*Date de naissance:* ${formData.dateNaissance}%0A` +
      `*Pays:* ${formData.pays}%0A` +
      `*Ville:* ${formData.ville}%0A` +
      `*Snapchat:* ${formData.snapchat}%0A` +
      `*Instagram:* ${formData.instagram}`;

    window.open(`https://wa.me/33761771520?text=${message}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-black z-40 overflow-y-auto"
    >
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-yellow-400 mb-8 transition-colors">
          <ChevronLeft size={24} />
          <span>Retour</span>
        </button>

        <h2 className="text-3xl font-black mb-8 uppercase">M'enregistrer</h2>

        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Nom" value={formData.nom} onChange={v => setFormData({...formData, nom: v})} required />
            <InputField label="Prénom" value={formData.prenom} onChange={v => setFormData({...formData, prenom: v})} required />
            <InputField label="Surnom" value={formData.surnom} onChange={v => setFormData({...formData, surnom: v})} />
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Genre *</label>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, genre: 'garçon'})}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all border ${formData.genre === 'garçon' ? 'bg-cyan-400 border-cyan-400 text-black' : 'bg-black border-zinc-800 text-zinc-500'}`}
                >
                  Garçon
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, genre: 'fille'})}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all border ${formData.genre === 'fille' ? 'bg-pink-500 border-pink-500 text-black' : 'bg-black border-zinc-800 text-zinc-500'}`}
                >
                  Fille
                </button>
              </div>
            </div>

            <InputField label="Jour et mois de naissance" value={formData.dateNaissance} onChange={v => setFormData({...formData, dateNaissance: v})} placeholder="Ex: 22 juin" required />
            <InputField label="Pays actuel" value={formData.pays} onChange={v => setFormData({...formData, pays: v})} required />
            <InputField label="Ville actuelle" value={formData.ville} onChange={v => setFormData({...formData, ville: v})} required />
            <InputField label="Snapchat" value={formData.snapchat} onChange={v => setFormData({...formData, snapchat: v})} placeholder="@..." />
            <InputField label="Instagram" value={formData.instagram} onChange={v => setFormData({...formData, instagram: v})} />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-yellow-400 text-black font-black text-lg rounded-2xl hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/20 mt-4"
          >
            M'ENREGISTRER
          </button>
          
          <p className="text-center text-zinc-500 text-xs mt-4">
            En cliquant sur s'enregistrer, vous serez redirigé vers WhatsApp pour envoyer vos informations.
          </p>
        </form>
      </div>
    </motion.div>
  );
};

const InputField = ({ label, value, onChange, type = 'text', required, placeholder }: { 
  label: string, 
  value: string, 
  onChange: (v: string) => void,
  type?: string,
  required?: boolean,
  placeholder?: string
}) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{label} {required && '*'}</label>
    <input 
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
      className="w-full bg-black border border-zinc-800 rounded-xl py-3 px-4 focus:border-yellow-400 outline-none transition-all text-white"
    />
  </div>
);
