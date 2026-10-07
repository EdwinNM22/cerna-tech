import type { LogoItem } from '@/components/LogoLoop'

/** Logos vía Simple Icons CDN (marcas registradas de sus respectivos titulares). */
const icon = (slug: string, color = '64748b') =>
  `https://cdn.simpleicons.org/${slug}/${color}`

export const devWebLogos: LogoItem[] = [
  { src: icon('react', '61DAFB'), alt: 'React', title: 'React' },
  { src: icon('typescript', '3178C6'), alt: 'TypeScript', title: 'TypeScript' },
  { src: icon('javascript', 'F7DF1E'), alt: 'JavaScript', title: 'JavaScript' },
  { src: icon('html5', 'E34F26'), alt: 'HTML5', title: 'HTML5' },
  { src: icon('css', '1572B6'), alt: 'CSS3', title: 'CSS3' },
  { src: icon('nodedotjs', '339933'), alt: 'Node.js', title: 'Node.js' },
  { src: icon('vite', '646CFF'), alt: 'Vite', title: 'Vite' },
  { src: icon('tailwindcss', '06B6D4'), alt: 'Tailwind CSS', title: 'Tailwind CSS' },
  { src: icon('nextdotjs', '000000'), alt: 'Next.js', title: 'Next.js' },
  { src: icon('postgresql', '4169E1'), alt: 'PostgreSQL', title: 'PostgreSQL' },
  { src: icon('mongodb', '47A248'), alt: 'MongoDB', title: 'MongoDB' },
  { src: icon('docker', '2496ED'), alt: 'Docker', title: 'Docker' },
  { src: icon('git', 'F05032'), alt: 'Git', title: 'Git' },
  { src: icon('github', '181717'), alt: 'GitHub', title: 'GitHub' },
  { src: icon('graphql', 'E10098'), alt: 'GraphQL', title: 'GraphQL' },
  { src: icon('firebase', 'DD2C00'), alt: 'Firebase', title: 'Firebase' },
  { src: icon('figma', 'F24E1E'), alt: 'Figma', title: 'Figma' },
  { src: icon('sass', 'CC6699'), alt: 'Sass', title: 'Sass' },
  { src: icon('npm', 'CB3837'), alt: 'npm', title: 'npm' },
]
