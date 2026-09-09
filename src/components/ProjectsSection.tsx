import { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';

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
const uploadedImage = '/projects/work-4-speedtest.png';

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
    category: 'Case Study',
    name: 'Work 4',
    images: [
      uploadedImage,
      uploadedImage,
      uploadedImage,
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
    <div className="sticky top-24 md:top-32 h-[85vh] flex items-center" style={{ top: `${index * 28}px` }}>
      <motion.div
        style={{ scale }}
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <span
            className="font-black leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 140px)', color: '#D7E2EA' }}
          >
            {project.number}
          </span>
          <div className="flex flex-col">
            <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-sm">
              {project.category}
            </span>
            <span className="text-[#D7E2EA] uppercase font-medium text-2xl md:text-4xl">
              {project.name}
            </span>
          </div>
          <LiveProjectButton />
        </div>

        <div className="flex-1 min-h-0">
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
              className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-contain bg-[#0C0C0C] aspect-video"
              muted
              loop
              autoPlay
              playsInline
            />
          ) : (
            <img
              src={project.images[2]}
              alt={`${project.name} - ${project.category} project showcase`}
              className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-contain bg-[#0C0C0C]"
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
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-28"
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </h2>

      <div className="flex flex-col gap-10">
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
