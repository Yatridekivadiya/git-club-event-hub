import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const Icon = ({ children, size = 18 }) => (
  <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:size, height:size, fontSize:size*0.85, lineHeight:1, flexShrink:0 }}>{children}</span>
);
const Search = ({size=18}) => <Icon size={size}>⌕</Icon>;
const CalendarDays = ({size=18}) => <Icon size={size}>▣</Icon>;
const Clock3 = ({size=18}) => <Icon size={size}>◷</Icon>;
const MapPin = ({size=18}) => <Icon size={size}>●</Icon>;
const ArrowRight = ({size=18}) => <Icon size={size}>→</Icon>;
const X = ({size=18}) => <Icon size={size}>×</Icon>;
const CheckCircle2 = ({size=18}) => <Icon size={size}>✓</Icon>;
const Menu = ({size=18}) => <Icon size={size}>☰</Icon>;
const GitBranch = ({size=18}) => <Icon size={size}>⌘</Icon>;
const Instagram = ({size=18}) => <Icon size={size}>◎</Icon>;
const Linkedin = ({size=18}) => <Icon size={size}>in</Icon>;
const events = [
  {
    id: 1,
    title: 'React Revolution Workshop',
    category: 'Workshop',
    date: 'Oct 12, 2026',
    time: '2:00 PM – 4:30 PM',
    venue: 'CSE Lab 2, CHARUSAT',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1000&q=80',
    description: 'Build a modern React interface from scratch and learn component-based thinking through a practical mini project.',
    organizer: 'Git Club CHARUSAT',
    seats: 80
  },
  {
    id: 2,
    title: 'GitSprint 2026',
    category: 'Competition',
    date: 'Oct 18, 2026',
    time: '10:00 AM – 1:00 PM',
    venue: 'Innovation Hall, CHARUSAT',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    description: 'A fast-paced coding competition focused on problem solving, algorithms, and creative implementation.',
    organizer: 'Git Club Competitive Programming Team',
    seats: 120
  },
  {
    id: 3,
    title: 'Build for Impact Hackathon',
    category: 'Hackathon',
    date: 'Nov 02, 2026',
    time: '9:00 AM – 8:00 PM',
    venue: 'Central Seminar Hall',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
    description: 'Turn a real-world problem into a working prototype with a team, mentors, and a full day of building.',
    organizer: 'Git Club Hackathon Cell',
    seats: 150
  },
  {
    id: 4,
    title: 'Open Source Starter Day',
    category: 'Community',
    date: 'Nov 10, 2026',
    time: '3:00 PM – 5:00 PM',
    venue: 'Seminar Room 4',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1000&q=80',
    description: 'Learn how to find beginner-friendly repositories, make your first contribution, and collaborate using Git.',
    organizer: 'Git Club Open Source Community',
    seats: 70
  },
  {
    id: 5,
    title: 'UI/UX Design Jam',
    category: 'Workshop',
    date: 'Nov 19, 2026',
    time: '1:30 PM – 4:00 PM',
    venue: 'Design Studio, CHARUSAT',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80',
    description: 'Explore user flows, wireframes, visual hierarchy, and rapid prototyping through a collaborative design jam.',
    organizer: 'Git Club Design Team',
    seats: 60
  },
  {
    id: 6,
    title: 'AI Builders Meetup',
    category: 'Community',
    date: 'Nov 28, 2026',
    time: '11:00 AM – 1:00 PM',
    venue: 'Auditorium B',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
    description: 'Meet student builders working on AI projects, exchange ideas, and learn practical lessons from their builds.',
    organizer: 'Git Club AI Community',
    seats: 90
  }
];

const pastEvents = [
  { title: 'Web Development Bootcamp', date: 'Sep 2026', category: 'Workshop', attendees: '140+' },
  { title: 'HackVerse 2026', date: 'Aug 2026', category: 'Hackathon', attendees: '210+' },
  { title: 'Git & GitHub 101', date: 'Jul 2026', category: 'Workshop', attendees: '180+' }
];

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchesCategory = category === 'All' || e.category === category;
      const q = query.toLowerCase().trim();
      const matchesQuery = !q || `${e.title} ${e.category} ${e.venue} ${e.description}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const openEvent = (event) => {
    setSelected(event);
    setRegistered(false);
    document.body.style.overflow = 'hidden';
  };

  const closeEvent = () => {
    setSelected(null);
    document.body.style.overflow = '';
  };

  useEffect(() => () => { document.body.style.overflow = ''; }, []);

  return (
    <div className="app">
      <nav className="navbar">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">&lt;/&gt;</span>
          <span><strong>GIT CLUB</strong><small>CHARUSAT</small></span>
        </a>

        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <Menu size={22} />
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#events" onClick={() => setMenuOpen(false)}>Events</a>
          <a href="#past" onClick={() => setMenuOpen(false)}>Past Events</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a className="nav-cta" href="#events" onClick={() => setMenuOpen(false)}>Explore Events <ArrowRight size={16}/></a>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="hero-glow glow-one"></div>
          <div className="hero-glow glow-two"></div>
          <div className="hero-content">
            <div className="eyebrow"><span></span> GIT CLUB • EVENT HUB</div>
            <h1>Build. Learn.<br/><em>Connect.</em> Repeat.</h1>
            <p>Discover workshops, competitions, hackathons and community activities happening at Git Club CHARUSAT — all in one place.</p>
            <div className="hero-actions">
              <a href="#events" className="primary-btn">Explore Events <ArrowRight size={18}/></a>
              <a href="#about" className="text-btn">What is Git Club? <ArrowRight size={16}/></a>
            </div>
            <div className="hero-stats">
              <div><strong>06</strong><span>Upcoming events</span></div>
              <div><strong>4</strong><span>Event categories</span></div>
              <div><strong>700+</strong><span>Students reached</span></div>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-image">
              <img src={events[2].image} alt="Hackathon" />
              <span className="floating-label">FEATURED</span>
            </div>
            <div className="hero-card-body">
              <div className="card-kicker">NEXT BIG BUILD</div>
              <h3>{events[2].title}</h3>
              <div className="mini-info"><CalendarDays size={15}/> {events[2].date}</div>
              <div className="mini-info"><MapPin size={15}/> {events[2].venue}</div>
              <button onClick={() => openEvent(events[2])}>View event <ArrowRight size={16}/></button>
            </div>
          </div>
        </section>

        <section className="events-section section" id="events">
          <div className="section-heading">
            <div>
              <div className="eyebrow dark"><span></span> WHAT'S COMING UP</div>
              <h2>Find your next <em>thing to build.</em></h2>
            </div>
            <p>One hub for everything happening across the Git Club community.</p>
          </div>

          <div className="toolbar">
            <div className="search-box">
              <Search size={19}/>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search events, workshops, hackathons..." />
              {query && <button className="clear-search" onClick={() => setQuery('')}><X size={15}/></button>}
            </div>
            <div className="filters">
              {['All', 'Workshop', 'Competition', 'Hackathon', 'Community'].map(c => (
                <button key={c} className={category === c ? 'filter active' : 'filter'} onClick={() => setCategory(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="results-line">
            <span>{filteredEvents.length} events found</span>
            {(query || category !== 'All') && <button onClick={() => {setQuery('');setCategory('All')}}>Clear filters</button>}
          </div>

          <div className="event-grid">
            {filteredEvents.map(event => (
              <article className="event-card" key={event.id}>
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <span className="category-tag">{event.category}</span>
                </div>
                <div className="event-body">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span><CalendarDays size={15}/>{event.date}</span>
                    <span><Clock3 size={15}/>{event.time}</span>
                    <span><MapPin size={15}/>{event.venue}</span>
                  </div>
                  <button className="details-btn" onClick={() => openEvent(event)}>View Details <ArrowRight size={16}/></button>
                </div>
              </article>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="empty-state">
              <Search size={34}/>
              <h3>No events found</h3>
              <p>Try another search term or category.</p>
              <button onClick={() => {setQuery('');setCategory('All')}}>Show all events</button>
            </div>
          )}
        </section>

        <section className="past-section section" id="past">
          <div className="section-heading">
            <div>
              <div className="eyebrow dark"><span></span> FROM THE COMMUNITY</div>
              <h2>What we've <em>already built.</em></h2>
            </div>
            <p>A quick look at recent activities that brought students together.</p>
          </div>
          <div className="past-grid">
            {pastEvents.map((event, i) => (
              <div className="past-card" key={i}>
                <div className="past-number">0{i+1}</div>
                <div>
                  <span>{event.category}</span>
                  <h3>{event.title}</h3>
                  <p>{event.date} · {event.attendees} participants</p>
                </div>
                <CheckCircle2 size={21}/>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-inner">
            <div>
              <div className="eyebrow"><span></span> ABOUT THE HUB</div>
              <h2>More than events.<br/><em>A student community.</em></h2>
            </div>
            <p>Git Club CHARUSAT is a space for students who want to learn by building. The Event Hub makes it easier to discover the next workshop, meet fellow builders, and turn curiosity into action.</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <div className="brand footer-brand">
            <span className="brand-mark">&lt;/&gt;</span>
            <span><strong>GIT CLUB</strong><small>CHARUSAT</small></span>
          </div>
          <div className="socials">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch size={18}/></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18}/></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Git Club • CHARUSAT</span><span>Build. Collaborate. Ship.</span></div>
      </footer>

      {selected && (
        <div className="modal-backdrop" onMouseDown={e => {if(e.target === e.currentTarget) closeEvent()}}>
          <div className="modal">
            <button className="modal-close" onClick={closeEvent}><X size={21}/></button>
            <img src={selected.image} alt={selected.title} />
            <div className="modal-content">
              <span className="category-tag">{selected.category}</span>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
              <div className="modal-details">
                <div><CalendarDays size={18}/><div><small>Date</small><strong>{selected.date}</strong></div></div>
                <div><Clock3 size={18}/><div><small>Time</small><strong>{selected.time}</strong></div></div>
                <div><MapPin size={18}/><div><small>Venue</small><strong>{selected.venue}</strong></div></div>
              </div>
              <div className="organizer">Organized by <strong>{selected.organizer}</strong> · {selected.seats} seats</div>
              {!registered ? (
                <button className="register-btn" onClick={() => setRegistered(true)}>Register for this event <ArrowRight size={18}/></button>
              ) : (
                <div className="success-box"><CheckCircle2 size={22}/><div><strong>Registration successful!</strong><span>You are on the list for {selected.title}.</span></div></div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
