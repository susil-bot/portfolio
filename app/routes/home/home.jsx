import { Footer } from '~/components/footer';
import { projectSummaries } from '~/data/projects';
import { baseMeta } from '~/utils/meta';
import { About } from './about';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useCallback, useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoder wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Full Stack Developer — MERN · AI/LLM · AWS',
    description: `Portfolio of ${config.name}, a Full Stack Developer specialising in MERN stack, Next.js, AI/LLM integration with LangChain and OpenAI, N8n workflow automation, and AWS cloud deployment.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const about = useRef();
  const details = useRef();
  const projectElements = useRef(new Map());

  const registerProject = useCallback(
    id => element => {
      if (element) {
        projectElements.current.set(id, element);
      } else {
        projectElements.current.delete(id);
      }
    },
    []
  );

  useEffect(() => {
    const sections = [
      intro.current,
      about.current,
      ...projectSummaries.map(project => projectElements.current.get(project.id)),
      details.current,
    ].filter(Boolean);

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            setVisibleSections(prevSections => {
              if (prevSections.includes(section.id)) return prevSections;
              return [...prevSections, section.id];
            });
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => sectionObserver.observe(section));

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />

      <About
        id="about"
        sectionRef={about}
        visible={visibleSections.includes('about')}
      />

      {projectSummaries.map((project, index) => (
        <ProjectSummary
          key={project.id}
          sectionRef={registerProject(project.id)}
          visible={visibleSections.includes(project.id)}
          index={index + 1}
          {...project}
        />
      ))}

      <Profile
        sectionRef={details}
        visible={visibleSections.includes('details')}
        id="details"
      />
      <Footer />
    </div>
  );
};
