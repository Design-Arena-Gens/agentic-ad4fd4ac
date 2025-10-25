"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";
import styles from "./page.module.css";

type Tool = {
  name: string;
  category: string;
  description: string;
  launchDate: string;
  url: string;
  tags: string[];
  trending?: boolean;
};

const aiTools: Tool[] = [
  {
    name: "Sora",
    category: "Video Generation",
    description:
      "Produce cinematic-quality video narratives and storyboards with natural language prompts and storyboard hints.",
    launchDate: "2024-02-15",
    url: "https://openai.com/research/video-generation",
    tags: ["text-to-video", "storyboarding", "production"],
    trending: true
  },
  {
    name: "Devin",
    category: "Autonomous Coding",
    description:
      "An AI software engineer that plans, codes, tests, and deploys full-stack apps with deep reasoning loops.",
    launchDate: "2024-03-12",
    url: "https://www.cognition-labs.com/",
    tags: ["agent", "devops", "automation"],
    trending: true
  },
  {
    name: "Midjourney v6",
    category: "Visual Creation",
    description:
      "Hyper-realistic generative visuals with dynamic lighting control and stylistic transfer profiles.",
    launchDate: "2023-12-20",
    url: "https://www.midjourney.com/",
    tags: ["imaging", "prompting", "style"],
    trending: true
  },
  {
    name: "GPT-4o",
    category: "General Intelligence",
    description:
      "Unified multimodal reasoning across text, vision, and audio with real-time responsiveness for production apps.",
    launchDate: "2024-05-13",
    url: "https://openai.com/index/gpt-4o/",
    tags: ["multimodal", "api", "agent"],
    trending: true
  },
  {
    name: "Runway Gen-2",
    category: "Video Studio",
    description:
      "Text, image, or video to video synthesis toolkit with stylized motion brush controls for directors.",
    launchDate: "2023-04-03",
    url: "https://runwayml.com/",
    tags: ["story", "cinema", "production"]
  },
  {
    name: "Claude 3 Opus",
    category: "Enterprise Assistant",
    description:
      "Enterprise-grade reasoning engine capable of complex workflows, knowledge synthesis, and real-time tools integration.",
    launchDate: "2024-03-04",
    url: "https://www.anthropic.com/news/claude-3-ai",
    tags: ["analysis", "enterprise", "reasoning"]
  },
  {
    name: "NotebookLM",
    category: "Knowledge Companion",
    description:
      "Transform docs, audio, and PDFs into interactive lecture notes, flashcards, and Q&A experiences instantly.",
    launchDate: "2023-12-19",
    url: "https://notebooklm.google/",
    tags: ["research", "summaries", "workspace"]
  },
  {
    name: "ElevenLabs",
    category: "Voice Studio",
    description:
      "Generate high-fidelity voiceovers, multilingual dubbing, and vocal clones with precise emotional control.",
    launchDate: "2022-09-01",
    url: "https://elevenlabs.io/",
    tags: ["audio", "dubbing", "TTS"]
  },
  {
    name: "RunPod",
    category: "Cloud Compute",
    description:
      "Deploy GPU-powered inference endpoints with autoscaling and observability in minutes.",
    launchDate: "2022-05-11",
    url: "https://runpod.io/",
    tags: ["infrastructure", "gpu", "deployment"]
  },
  {
    name: "ChatGPT",
    category: "Conversational AI",
    description:
      "Conversational interface for natural language reasoning, coding assistance, and knowledge exploration.",
    launchDate: "2022-11-30",
    url: "https://chat.openai.com/",
    tags: ["chatbot", "assistant", "research"]
  },
  {
    name: "Stable Diffusion",
    category: "Image Generation",
    description:
      "Open-source latent diffusion model for photoreal visuals with fine-grained prompt control.",
    launchDate: "2022-08-22",
    url: "https://stability.ai/blog/stable-diffusion-public-release",
    tags: ["open-source", "imaging", "latent"]
  },
  {
    name: "Notion AI",
    category: "Productivity",
    description:
      "Integrate AI into your workspace to document, ideate, and automate with contextual awareness.",
    launchDate: "2023-02-22",
    url: "https://www.notion.so/product/ai",
    tags: ["workspace", "docs", "automation"]
  }
];

const formatLaunchDate = (date: string) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric"
  }).format(new Date(date));
};

const yearsSince = (date: string) => {
  const now = new Date();
  const target = new Date(date);
  const diff = now.getTime() - target.getTime();
  const years = diff / (1000 * 60 * 60 * 24 * 365.25);
  if (years < 1) {
    const months = Math.max(1, Math.round(years * 12));
    return `${months} month${months > 1 ? "s" : ""} live`;
  }
  const rounded = Math.round(years * 10) / 10;
  return `${rounded.toFixed(1)} yrs live`;
};

const ToolCard = ({ tool, index }: { tool: Tool; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 220,
    damping: 24
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), {
    stiffness: 220,
    damping: 24
  });
  const translateZ = useSpring(useTransform(y, [-0.5, 0.5], [42, 18]), {
    stiffness: 190,
    damping: 28
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      className={`${styles.toolCard} glassy`}
      initial={{ opacity: 0, translateY: 48, rotateX: 0 }}
      animate={{ opacity: 1, translateY: 0, rotateX: 0 }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      whileHover={{ translateZ: 70 }}
      style={{
        rotateX,
        rotateY,
        translateZ,
        transformPerspective: 1200
      }}
    >
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.category}>{tool.category}</div>
          <h3 className={styles.toolName}>{tool.name}</h3>
        </div>
        <div className={styles.tag} aria-hidden>
          {formatLaunchDate(tool.launchDate)}
        </div>
      </div>
      <p className={styles.description}>{tool.description}</p>
      <div className={styles.metaRow}>
        <div className={styles.tagRow}>
          {tool.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noreferrer"
          className={styles.tag}
          aria-label={`Open ${tool.name} in a new tab`}
        >
          Explore →
        </a>
      </div>
    </motion.article>
  );
};

const TimelineCard = ({ tool, index }: { tool: Tool; index: number }) => {
  const isRecent = new Date(tool.launchDate) >= new Date("2023-01-01");

  return (
    <motion.div
      className={styles.timelineCard}
      initial={{ opacity: 0, translateY: 40 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.04, duration: 0.6, ease: [0.34, 1.2, 0.64, 1] }}
      style={{
        background: isRecent
          ? "linear-gradient(145deg, rgba(108, 92, 255, 0.32), rgba(12, 18, 48, 0.86))"
          : "rgba(7, 11, 28, 0.78)",
        borderColor: isRecent ? "rgba(108, 92, 255, 0.45)" : "rgba(108, 92, 255, 0.2)"
      }}
    >
      <div className={styles.timelineFog} />
      <div className={styles.timelineYear}>{formatLaunchDate(tool.launchDate)}</div>
      <h3 className={styles.timelineName}>{tool.name}</h3>
      <p className={styles.timelineDescription}>{tool.description}</p>
      <div className={styles.timelineTagRow}>
        {isRecent ? (
          <span className={styles.timelineTag}>Recent</span>
        ) : (
          <span className={styles.timelineTag}>Classic</span>
        )}
        <span className={styles.timelineTag}>{yearsSince(tool.launchDate)}</span>
        {tool.tags.map((tag) => (
          <span key={tag} className={styles.timelineTag}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default function HomePage() {
  const sortedTools = useMemo(
    () =>
      [...aiTools].sort(
        (a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()
      ),
    []
  );

  const highlights = sortedTools.slice(0, 4);
  const timeline = sortedTools.slice(4);

  return (
    <main className={`noise-overlay ${styles.page}`}>
      <div className="gridline-background" />
      <div className="veil" />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={`${styles.indicator} frosted-border`}>
            <span className={styles.indicatorDot} />
            Most searched AI arsenal
          </span>
          <h1 className={`${styles.title} neon-text`}>
            Navigate the AI frontier from fresh drops to iconic staples.
          </h1>
          <p className={styles.subtitle}>
            Immerse yourself in a spatial hub that curates daily trending intelligence, multi-agent
            stacks, and the classics that launched the wave. Everything is chronologically tuned so
            you can pick the right tool for your next breakthrough.
          </p>
          <div className={styles.ctaRow}>
            <Link href="#timeline" className={styles.ctaPrimary}>
              Discover the timeline
            </Link>
            <Link href="#latest" className={styles.ctaSecondary}>
              View trending arsenal
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className="orb" style={{ top: "-18%", right: "-10%" }} aria-hidden />
          <div className="floating-cluster" style={{ bottom: "14%", left: "-6%" }} aria-hidden />
          <motion.div
            className={styles.heroStage}
            initial={{ rotateX: 18, rotateY: -22, rotateZ: 6, translateZ: -40 }}
            animate={{ rotateX: 11, rotateY: -11, rotateZ: 0, translateZ: 0 }}
            transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className={styles.matrix} aria-hidden />
            <motion.div
              className={styles.highlightGrid}
              initial={{ translateZ: -40, opacity: 0 }}
              animate={{ translateZ: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
            >
              {highlights.map((tool, index) => (
                <ToolCard key={tool.name} tool={tool} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="latest" className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Freshly deployed breakthroughs</h2>
        <p className={styles.sectionSubtitle}>
          A clustered field of the newest AI utilities making waves this season. Surface multimodal
          companions, autonomous engineers, and creative studios that are rewriting workflows right
          now.
        </p>
      </section>

      <div className={styles.highlightGrid} style={{ perspective: "1600px" }}>
        {highlights.map((tool, index) => (
          <ToolCard key={`highlight-${tool.name}`} tool={tool} index={index} />
        ))}
      </div>

      <section id="timeline" className={styles.timelineHeader}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Chronological arsenal</h2>
          <p className={styles.sectionSubtitle}>
            Move through a layered collection that keeps recent heavy-hitters upfront while honoring
            the pillars every technologist still leans on daily.
          </p>
        </div>
        <div className={styles.timelineLegend}>
          <span className={styles.legendBadge}>
            <span className={styles.legendDotRecent} /> New wave
          </span>
          <span className={styles.legendBadge}>
            <span className={styles.legendDotClassic} /> Classic staple
          </span>
        </div>
      </section>

      <div className={styles.timeline}>
        {timeline.map((tool, index) => (
          <TimelineCard key={tool.name} tool={tool} index={index} />
        ))}
      </div>

      <footer className={styles.footer}>
        <span>Crafted for explorers of the AI frontier.</span>
        <span>Curated from 2022 → 2024</span>
      </footer>
    </main>
  );
}
