import { CSSProperties, useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';

interface Project {
  number: string;
  category: string;
  name: string;
  images: [string, string, string]; // [col1 top, col1 bottom, col2]
}

const workVideos = [
  '/videos/work1.mp4',
  '/videos/global_gateway_communication.mp4',
  '/videos/nietzsche_sustainibilty.mp4',
];

const fallbackVideo = '/videos/global_gateway_communication.mp4';
const uploadedVideo = '/videos/work-3-uploaded.mp4';

const projects: Project[] = [
  {
    number: '01',
    category: 'Client',
    name: 'Work 1',
    images: [
      workVideos[0],
      workVideos[0],
      workVideos[1],
    ],
  },
  {
    number: '02',
    category: 'Personal',
    name: 'Work 2',
    images: [
      workVideos[1],
      workVideos[0],
      workVideos[1],
    ],
  },
  {
    number: '03',
    category: 'Client',
    name: 'Work 3',
    images: [
      uploadedVideo,
      uploadedVideo,
      uploadedVideo,
    ],
  },
  {
    number: '04',
    category: 'Personal',
    name: 'Work 4',
    images: [
      workVideos[1],
      workVideos[0],
      workVideos[1],
    ],
  },
];

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="project-stack-item" style={{ '--project-index': index } as CSSProperties}>
      <motion.div
        style={{ scale }}
        className="project-card"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <span
            className="font-black leading-none"
            style={{ fontSize: 'var(--text-number)', color: 'var(--color-text)' }}
          >
            {project.number}
          </span>
        </div>

        <div className="project-media">
          {project.images[2].endsWith('.mp4') ? (
            <video
              src={project.images[2]}
              onError={(event) => {
                const video = event.currentTarget;
                // Prevent infinite error loops by checking if we already retried
                if (!video.dataset.errorRetried && video.src !== window.location.origin + fallbackVideo) {
                  video.dataset.errorRetried = 'true';
                  video.src = fallbackVideo;
                }
              }}
              className="project-video"
              muted
              loop
              autoPlay
              playsInline
            />
          ) : (
            <img
              src={project.images[2]}
              alt={`${project.name} - ${project.category} project showcase`}
              className="project-video"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-[var(--color-bg)] section-shell section-spacing relative"
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center section-heading"
        style={{ fontSize: 'var(--text-section)' }}
      >
        Project
      </h2>

      <div className="content-container project-stack flex flex-col">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
